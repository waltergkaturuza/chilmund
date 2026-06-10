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
