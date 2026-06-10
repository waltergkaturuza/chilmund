import type { CollectionConfig } from 'payload'

import { SIDEBAR } from '@/admin/sidebarGroups'
import { ANALYTICS_EVENT_TYPES } from '@/constants/analytics'
import { authenticated } from '../access/authenticated'

export const AnalyticsEvents: CollectionConfig = {
  slug: 'analytics-events',
  labels: { singular: 'Analytics Event', plural: 'Analytics Events' },
  admin: {
    group: SIDEBAR.analytics,
    useAsTitle: 'eventType',
    defaultColumns: ['eventType', 'path', 'sessionId', 'createdAt'],
    description: 'First-party site analytics — page views and interaction events.',
  },
  access: {
    read: authenticated,
    create: () => true,
    update: () => false,
    delete: authenticated,
  },
  fields: [
    {
      name: 'eventType',
      type: 'select',
      required: true,
      options: ANALYTICS_EVENT_TYPES.map((value) => ({
        label: value.replace(/_/g, ' '),
        value,
      })),
      index: true,
    },
    {
      name: 'path',
      type: 'text',
      required: true,
      index: true,
      admin: { description: 'Page path, e.g. /contact or /products' },
    },
    {
      name: 'referrer',
      type: 'text',
    },
    {
      name: 'sessionId',
      type: 'text',
      index: true,
      admin: { description: 'Anonymous visitor session (hashed cookie).' },
    },
    {
      name: 'metadata',
      type: 'json',
      admin: { description: 'Optional extra context (form id, file name, etc.).' },
    },
  ],
  timestamps: true,
}
