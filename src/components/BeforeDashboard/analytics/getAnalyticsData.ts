import {
  ANALYTICS_EVENT_LABELS,
  ANALYTICS_WINDOW_DAYS,
  type AnalyticsEventType,
} from '@/constants/analytics'
import type { AnalyticsEvent } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export type DailyCount = { date: string; label: string; count: number }

export type TopPage = { path: string; count: number }

export type RecentEvent = {
  id: number | string
  eventType: string
  eventLabel: string
  path: string
  createdAt: string
}

export type KeyInteraction = {
  label: string
  count: number
  periodCount: number
  icon: 'quote' | 'contact' | 'newsletter' | 'form' | 'whatsapp' | 'call'
}

export type AnalyticsSnapshot = {
  windowDays: number
  pageViewsByDay: DailyCount[]
  eventsByDay: DailyCount[]
  uniqueVisitors: number
  totalPageViews: number
  viewsToday: number
  topPages: TopPage[]
  eventsByType: { type: AnalyticsEventType; label: string; count: number }[]
  recentEvents: RecentEvent[]
  keyInteractions: KeyInteraction[]
}

function startOfDay(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

function formatDayLabel(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

function isoDateKey(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function buildDayBuckets(windowDays: number): DailyCount[] {
  const buckets: DailyCount[] = []
  const today = startOfDay(new Date())

  for (let i = windowDays - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    buckets.push({ date: isoDateKey(d), label: formatDayLabel(d), count: 0 })
  }

  return buckets
}

function bucketCounts(events: AnalyticsEvent[], windowDays: number, filterType?: AnalyticsEventType) {
  const buckets = buildDayBuckets(windowDays)
  const index = new Map(buckets.map((b, i) => [b.date, i]))
  const cutoff = startOfDay(new Date())
  cutoff.setDate(cutoff.getDate() - (windowDays - 1))

  for (const event of events) {
    if (filterType && event.eventType !== filterType) continue
    const created = new Date(event.createdAt)
    if (created < cutoff) continue
    const key = isoDateKey(startOfDay(created))
    const idx = index.get(key)
    if (idx !== undefined) buckets[idx]!.count += 1
  }

  return buckets
}

export async function getAnalyticsData(
  windowDays = ANALYTICS_WINDOW_DAYS,
): Promise<AnalyticsSnapshot> {
  const payload = await getPayload({ config: configPromise })
  const now = new Date()
  const windowStart = new Date(now.getTime() - windowDays * 24 * 60 * 60 * 1000).toISOString()
  const todayStart = startOfDay(now).toISOString()

  const [
    periodEventsResult,
    allPageViews,
    todayPageViews,
    quotesPeriod,
    contactsPeriod,
    newslettersPeriod,
    formsPeriod,
    quotesAll,
    contactsAll,
    newslettersAll,
    formsAll,
  ] = await Promise.all([
    payload.find({
      collection: 'analytics-events',
      where: { createdAt: { greater_than: windowStart } },
      limit: 10000,
      depth: 0,
      sort: '-createdAt',
      pagination: false,
    }),
    payload.count({
      collection: 'analytics-events',
      where: { eventType: { equals: 'page_view' } },
    }),
    payload.count({
      collection: 'analytics-events',
      where: {
        and: [
          { eventType: { equals: 'page_view' } },
          { createdAt: { greater_than: todayStart } },
        ],
      },
    }),
    payload.count({
      collection: 'quote-requests',
      where: { createdAt: { greater_than: windowStart } },
    }),
    payload.count({
      collection: 'contact-submissions',
      where: { createdAt: { greater_than: windowStart } },
    }),
    payload.count({
      collection: 'newsletter-subscribers',
      where: { createdAt: { greater_than: windowStart } },
    }),
    payload.count({
      collection: 'form-submissions',
      where: { createdAt: { greater_than: windowStart } },
    }),
    payload.count({ collection: 'quote-requests' }),
    payload.count({ collection: 'contact-submissions' }),
    payload.count({ collection: 'newsletter-subscribers' }),
    payload.count({ collection: 'form-submissions' }),
  ])

  const periodEvents = periodEventsResult.docs as AnalyticsEvent[]
  const pageViews = periodEvents.filter((e) => e.eventType === 'page_view')
  const uniqueVisitors = new Set(
    pageViews.map((e) => e.sessionId).filter((id) => id && id !== 'anonymous' && id !== 'server'),
  ).size

  const topPagesMap = new Map<string, number>()
  for (const event of pageViews) {
    topPagesMap.set(event.path, (topPagesMap.get(event.path) || 0) + 1)
  }
  const topPages = [...topPagesMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([path, count]) => ({ path, count }))

  const typeCounts = new Map<AnalyticsEventType, number>()
  for (const event of periodEvents) {
    const t = event.eventType as AnalyticsEventType
    typeCounts.set(t, (typeCounts.get(t) || 0) + 1)
  }

  const eventsByType = [...typeCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([type, count]) => ({
      type,
      label: ANALYTICS_EVENT_LABELS[type] || type,
      count,
    }))

  const recentEvents: RecentEvent[] = periodEvents.slice(0, 15).map((e) => ({
    id: e.id,
    eventType: e.eventType,
    eventLabel: ANALYTICS_EVENT_LABELS[e.eventType as AnalyticsEventType] || e.eventType,
    path: e.path,
    createdAt: e.createdAt,
  }))

  const countByType = (type: AnalyticsEventType) =>
    periodEvents.filter((e) => e.eventType === type).length

  const keyInteractions: KeyInteraction[] = [
    {
      label: 'Quote requests',
      count: quotesAll.totalDocs,
      periodCount: quotesPeriod.totalDocs,
      icon: 'quote',
    },
    {
      label: 'Contact',
      count: contactsAll.totalDocs,
      periodCount: contactsPeriod.totalDocs,
      icon: 'contact',
    },
    {
      label: 'Newsletters',
      count: newslettersAll.totalDocs,
      periodCount: newslettersPeriod.totalDocs,
      icon: 'newsletter',
    },
    {
      label: 'Form submits',
      count: formsAll.totalDocs,
      periodCount: formsPeriod.totalDocs,
      icon: 'form',
    },
    {
      label: 'WhatsApp',
      count: countByType('whatsapp_click'),
      periodCount: countByType('whatsapp_click'),
      icon: 'whatsapp',
    },
    {
      label: 'Calls',
      count: countByType('call_click'),
      periodCount: countByType('call_click'),
      icon: 'call',
    },
  ]

  return {
    windowDays,
    pageViewsByDay: bucketCounts(periodEvents, windowDays, 'page_view'),
    eventsByDay: bucketCounts(periodEvents, windowDays),
    uniqueVisitors,
    totalPageViews: allPageViews.totalDocs,
    viewsToday: todayPageViews.totalDocs,
    topPages,
    eventsByType,
    recentEvents,
    keyInteractions,
  }
}
