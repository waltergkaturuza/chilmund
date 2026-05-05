import type { CollectionConfig } from 'payload'

import { SIDEBAR } from '@/admin/sidebarGroups'
import { authenticated } from '@/access/authenticated'

export const QuoteRequests: CollectionConfig = {
  slug: 'quote-requests',
  labels: { singular: 'Quote Request', plural: 'Quote Requests' },
  admin: {
    group: SIDEBAR.management,
    useAsTitle: 'trackingId',
    defaultColumns: ['trackingId', 'fullName', 'company', 'products', 'status', 'createdAt'],
    description: 'Inbound quote/enquiry submissions from the website.',
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
          name: 'trackingId',
          type: 'text',
          required: true,
          unique: true,
          index: true,
          admin: { readOnly: true, width: '50%' },
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'pending',
          options: [
            { label: 'Pending', value: 'pending' },
            { label: 'Reviewed', value: 'reviewed' },
            { label: 'Quoted', value: 'quoted' },
            { label: 'Accepted', value: 'accepted' },
            { label: 'Declined', value: 'declined' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact',
          fields: [
            { type: 'row', fields: [
              { name: 'fullName', type: 'text', required: true, admin: { width: '50%' } },
              { name: 'email', type: 'email', required: true, admin: { width: '50%' } },
            ]},
            { type: 'row', fields: [
              { name: 'phone', type: 'text', required: true, admin: { width: '50%' } },
              { name: 'jobTitle', type: 'text', label: 'Job title', admin: { width: '50%' } },
            ]},
          ],
        },
        {
          label: 'Company',
          fields: [
            { name: 'company', type: 'text', required: true },
            { type: 'row', fields: [
              { name: 'country', type: 'text', admin: { width: '33%' } },
              { name: 'province', type: 'text', label: 'Province / state', admin: { width: '33%' } },
              { name: 'city', type: 'text', label: 'City / town', admin: { width: '34%' } },
            ]},
            { name: 'industry', type: 'text' },
          ],
        },
        {
          label: 'Product & delivery',
          fields: [
            { name: 'products', type: 'text' },
            { name: 'otherProduct', type: 'text', label: 'Other product' },
            { name: 'volume', type: 'text' },
            { name: 'delivery', type: 'text', label: 'Delivery preference' },
            { name: 'deliveryAddress', type: 'textarea', label: 'Delivery address' },
            { name: 'urgency', type: 'text' },
            { name: 'message', type: 'textarea', label: 'Additional notes' },
          ],
        },
        {
          label: 'Client portal (track quote)',
          fields: [
            {
              name: 'messageToClient',
              type: 'textarea',
              label: 'Message for customer',
              admin: {
                description:
                  'Shown on the public Track your quote page when the customer enters this tracking ID. Keep it professional — do not include confidential pricing details you would not email directly.',
              },
            },
            {
              name: 'clientDownloads',
              type: 'array',
              label: 'Documents for customer',
              labels: { singular: 'Document', plural: 'Documents' },
              admin: {
                description:
                  'Official quotation PDFs, invoices, or other files the customer can download from Track your quote.',
                initCollapsed: false,
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      defaultValue: 'Official quotation',
                      admin: {
                        width: '40%',
                        description: 'e.g. Official quotation, Pro-forma invoice',
                      },
                    },
                    {
                      name: 'file',
                      type: 'upload',
                      relationTo: 'media',
                      required: true,
                      admin: { width: '60%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      label: 'Internal notes',
      admin: { description: 'Private notes — not visible to the customer.' },
    },
  ],
  timestamps: true,
}
