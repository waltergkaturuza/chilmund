import { ANALYTICS_EVENT_TYPES, type AnalyticsEventType } from '@/constants/analytics'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

const MAX_PATH_LENGTH = 500
const MAX_SESSION_LENGTH = 64

function isValidEventType(value: unknown): value is AnalyticsEventType {
  return typeof value === 'string' && (ANALYTICS_EVENT_TYPES as readonly string[]).includes(value)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { eventType, path, sessionId, referrer, metadata } = body

    if (!isValidEventType(eventType)) {
      return NextResponse.json({ error: 'Invalid event type.' }, { status: 400 })
    }

    if (typeof path !== 'string' || !path.trim() || path.length > MAX_PATH_LENGTH) {
      return NextResponse.json({ error: 'Invalid path.' }, { status: 400 })
    }

    const normalizedPath = path.trim().startsWith('/') ? path.trim() : `/${path.trim()}`

    if (normalizedPath.startsWith('/admin') || normalizedPath.startsWith('/api')) {
      return NextResponse.json({ success: true, skipped: true })
    }

    const sid =
      typeof sessionId === 'string' && sessionId.trim().length > 0
        ? sessionId.trim().slice(0, MAX_SESSION_LENGTH)
        : 'anonymous'

    const payload = await getPayload({ config: configPromise })

    await payload.create({
      collection: 'analytics-events',
      data: {
        eventType,
        path: normalizedPath,
        sessionId: sid,
        referrer: typeof referrer === 'string' ? referrer.slice(0, MAX_PATH_LENGTH) : '',
        metadata:
          metadata && typeof metadata === 'object' && !Array.isArray(metadata)
            ? metadata
            : undefined,
      },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[analytics] Error:', err)
    return NextResponse.json({ error: 'Failed to record event.' }, { status: 500 })
  }
}
