export const ANALYTICS_EVENT_TYPES = [
  'page_view',
  'quote_submit',
  'contact_submit',
  'newsletter_signup',
  'form_submit',
  'whatsapp_click',
  'call_click',
  'email_click',
  'quote_click',
  'download',
  'other',
] as const

export type AnalyticsEventType = (typeof ANALYTICS_EVENT_TYPES)[number]

export const ANALYTICS_WINDOW_DAYS = 14

export const ANALYTICS_WINDOW_COOKIE = 'chilmund_analytics_window'

export const ANALYTICS_WINDOW_OPTIONS = [
  { label: '14 days', days: 14 },
  { label: '1 month', days: 30 },
  { label: '3 months', days: 90 },
  { label: '6 months', days: 180 },
  { label: '1 year', days: 365 },
  { label: '2 years', days: 730 },
  { label: '5 years', days: 1825 },
] as const

export type AnalyticsBucketUnit = 'day' | 'week' | 'month'

export function parseAnalyticsWindowDays(value: string | undefined): number {
  const parsed = Number(value)
  if (ANALYTICS_WINDOW_OPTIONS.some((option) => option.days === parsed)) {
    return parsed
  }
  return ANALYTICS_WINDOW_DAYS
}

export function getAnalyticsWindowLabel(days: number): string {
  return ANALYTICS_WINDOW_OPTIONS.find((option) => option.days === days)?.label ?? `${days} days`
}

export function getAnalyticsBucketUnit(windowDays: number): AnalyticsBucketUnit {
  if (windowDays <= 90) return 'day'
  if (windowDays <= 365) return 'week'
  return 'month'
}

export const ANALYTICS_EVENT_LABELS: Record<AnalyticsEventType, string> = {
  page_view: 'Page view',
  quote_submit: 'Quote request',
  contact_submit: 'Contact',
  newsletter_signup: 'Newsletter',
  form_submit: 'Form submit',
  whatsapp_click: 'WhatsApp',
  call_click: 'Call',
  email_click: 'Email',
  quote_click: 'Quote click',
  download: 'Download',
  other: 'Other',
}

export const ANALYTICS_SESSION_COOKIE = 'chilmund_sid'
