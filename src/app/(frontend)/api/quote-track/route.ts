import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

/** Public-safe pattern for Chilmund quote tracking IDs (e.g. CHM-260415-A1B2C3). */
const TRACKING_ID_RE = /^CHM-\d{6}-[A-Z0-9]{6}$/i

/** Normalise pasted IDs: strip spaces + convert Unicode hyphen variants (en/em dash etc.) to ASCII `-`. */
function normalizeTrackingIdInput(raw: string): string {
  return raw
    .trim()
    .toUpperCase()
    .replace(/[\u2010\u2011\u2012\u2013\u2014\u2212\uFE58\uFE63\uFF0D]/g, '-')
    .replace(/\s+/g, '')
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const raw = searchParams.get('trackingId')?.trim() ?? ''
    const normalized = normalizeTrackingIdInput(raw)

    if (!normalized || !TRACKING_ID_RE.test(normalized)) {
      return NextResponse.json(
        { error: 'Enter a valid tracking ID (e.g. CHM-260415-A1B2C3).' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'quote-requests',
      where: { trackingId: { equals: normalized } },
      limit: 1,
      depth: 2,
      /** Public lookup route — must bypass collection `read: authenticated` for staff-only collection. */
      overrideAccess: true,
    })

    const doc = result.docs[0]
    if (!doc) {
      return NextResponse.json({ found: false })
    }

    const rawMsg =
      (doc &&
        typeof doc === 'object' &&
        'messageToClient' in doc &&
        (doc as { messageToClient?: unknown }).messageToClient) ??
      undefined
    const messageToClient = typeof rawMsg === 'string' ? rawMsg.trim() : ''

    const downloads: { label: string; url: string }[] = []
    const rows = 'clientDownloads' in doc ? doc.clientDownloads : undefined
    if (Array.isArray(rows)) {
      for (const row of rows) {
        if (!row || typeof row !== 'object') continue
        const label =
          'label' in row && typeof row.label === 'string' && row.label.trim()
            ? row.label.trim()
            : 'Document'
        const file = 'file' in row ? row.file : undefined
        if (!file || typeof file !== 'object') continue
        const path =
          'url' in file && typeof file.url === 'string' && file.url.length > 0 ? file.url : null
        if (!path) continue
        const url = path.startsWith('http') ? path : path.startsWith('/') ? path : `/${path}`
        downloads.push({ label, url })
      }
    }

    return NextResponse.json({
      found: true,
      trackingId: doc.trackingId,
      status: doc.status,
      submittedAt: doc.createdAt,
      company: doc.company,
      products: doc.products || '',
      messageToClient,
      downloads,
    })
  } catch (err) {
    console.error('[quote-track] Error:', err)
    return NextResponse.json({ error: 'Unable to look up tracking ID.' }, { status: 500 })
  }
}
