import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

/** Public-safe pattern for Chilmund quote tracking IDs (e.g. CHM-260415-A1B2C3). */
const TRACKING_ID_RE = /^CHM-\d{6}-[A-Z0-9]{6}$/i

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const raw = searchParams.get('trackingId')?.trim() ?? ''
    const normalized = raw.toUpperCase().replace(/\s+/g, '')

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
      depth: 0,
    })

    const doc = result.docs[0]
    if (!doc) {
      return NextResponse.json({ found: false })
    }

    return NextResponse.json({
      found: true,
      trackingId: doc.trackingId,
      status: doc.status,
      submittedAt: doc.createdAt,
      company: doc.company,
      products: doc.products || '',
    })
  } catch (err) {
    console.error('[quote-track] Error:', err)
    return NextResponse.json({ error: 'Unable to look up tracking ID.' }, { status: 500 })
  }
}
