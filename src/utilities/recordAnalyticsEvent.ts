import type { AnalyticsEventType } from '@/constants/analytics'
import type { Payload } from 'payload'

type RecordAnalyticsEventArgs = {
  payload: Payload
  eventType: AnalyticsEventType
  path: string
  sessionId?: string
  referrer?: string
  metadata?: Record<string, unknown>
}

/** Server-side analytics log — used by API routes after successful actions. */
export async function recordAnalyticsEvent({
  payload,
  eventType,
  path,
  sessionId,
  referrer,
  metadata,
}: RecordAnalyticsEventArgs): Promise<void> {
  try {
    await payload.create({
      collection: 'analytics-events',
      data: {
        eventType,
        path,
        sessionId: sessionId?.trim() || 'server',
        referrer: referrer?.trim() || '',
        metadata: metadata ?? undefined,
      },
    })
  } catch (err) {
    console.error('[analytics] Failed to record event:', err)
  }
}
