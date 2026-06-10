'use client'

import { ANALYTICS_SESSION_COOKIE, type AnalyticsEventType } from '@/constants/analytics'

function getOrCreateSessionId(): string {
  if (typeof document === 'undefined') return 'anonymous'

  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${ANALYTICS_SESSION_COOKIE}=`))

  if (match) {
    return match.split('=')[1] || 'anonymous'
  }

  const id =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `s-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`

  const maxAge = 60 * 60 * 24 * 365
  document.cookie = `${ANALYTICS_SESSION_COOKIE}=${id}; path=/; max-age=${maxAge}; SameSite=Lax`

  return id
}

type TrackEventArgs = {
  eventType: AnalyticsEventType
  path?: string
  metadata?: Record<string, unknown>
}

/** Fire-and-forget first-party analytics beacon. */
export function trackEvent({ eventType, path, metadata }: TrackEventArgs): void {
  if (typeof window === 'undefined') return

  const pagePath = path || window.location.pathname

  if (pagePath.startsWith('/admin')) return

  const body = JSON.stringify({
    eventType,
    path: pagePath,
    sessionId: getOrCreateSessionId(),
    referrer: document.referrer || '',
    metadata,
  })

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' })
    navigator.sendBeacon('/api/analytics', blob)
    return
  }

  void fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  })
}
