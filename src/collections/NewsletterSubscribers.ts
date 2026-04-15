import type { CollectionConfig } from 'payload'

import { SIDEBAR } from '@/admin/sidebarGroups'
import { authenticated } from '../access/authenticated'

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  labels: { singular: 'Subscriber', plural: 'Newsletter Subscribers' },
  admin: {
    group: SIDEBAR.management,
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'status', 'createdAt'],
    description: 'Email subscribers from the website newsletter sign-up form.',
  },
  access: {
    read: authenticated,
    create: () => true,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'name',
      type: 'text',
      admin: { description: 'Optional — captured if provided.' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      required: true,
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
      ],
      admin: { description: 'Set to "Unsubscribed" if the user opts out.' },
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'website',
      admin: {
        position: 'sidebar',
        description: 'Where the subscription came from.',
      },
    },
  ],
  timestamps: true,
}
