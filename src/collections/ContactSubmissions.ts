import type { CollectionConfig } from 'payload'

import { SIDEBAR } from '@/admin/sidebarGroups'
import { authenticated } from '@/access/authenticated'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: { singular: 'Contact Message', plural: 'Contact Messages' },
  admin: {
    group: SIDEBAR.management,
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'fullName', 'email', 'status', 'createdAt'],
    description: 'Messages submitted via the Contact Us page.',
  },
  access: {
    read: authenticated,
    create: () => true,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'status',
          type: 'select',
          defaultValue: 'new',
          options: [
            { label: 'New', value: 'new' },
            { label: 'Read', value: 'read' },
            { label: 'Replied', value: 'replied' },
            { label: 'Archived', value: 'archived' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'subject',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'fullName', type: 'text', required: true, label: 'Full name', admin: { width: '33%' } },
        { name: 'email', type: 'email', required: true, admin: { width: '33%' } },
        { name: 'phone', type: 'text', admin: { width: '34%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'company', type: 'text', admin: { width: '50%' } },
        { name: 'country', type: 'text', admin: { width: '50%' } },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      label: 'Internal notes',
      admin: { description: 'Private notes — not visible to the sender.' },
    },
  ],
  timestamps: true,
}
