import type { CollectionConfig } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { SIDEBAR } from '@/admin/sidebarGroups'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from 'payload'

export const IndustryAwards: CollectionConfig = {
  slug: 'industry-awards',
  labels: { singular: 'Industry Award', plural: 'Industry Awards' },
  admin: {
    group: SIDEBAR.content,
    useAsTitle: 'title',
    defaultColumns: ['title', 'awardYear', 'awardingBody', '_status', 'createdAt'],
    description: 'Showcase industry awards, recognitions and achievements.',
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: {
    drafts: {
      autosave: false,
      validate: false,
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'e.g. "Best Chemical Manufacturer 2025"' },
    },
    slugField(),
    {
      type: 'row',
      fields: [
        {
          name: 'awardYear',
          type: 'number',
          required: true,
          label: 'Year',
          min: 1990,
          max: 2100,
          admin: { width: '25%', description: 'Year the award was received.' },
        },
        {
          name: 'awardingBody',
          type: 'text',
          required: true,
          label: 'Awarding body / organisation',
          admin: { width: '75%' },
        },
      ],
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Quality & Excellence', value: 'quality' },
        { label: 'Safety & Environment', value: 'safety' },
        { label: 'Innovation', value: 'innovation' },
        { label: 'Export & Trade', value: 'export' },
        { label: 'Community & CSR', value: 'community' },
        { label: 'Industry Leadership', value: 'leadership' },
        { label: 'Other', value: 'other' },
      ],
      admin: { description: 'Used for filtering on the public page.' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Award photo, certificate scan, or trophy image.' },
    },
    {
      name: 'summary',
      type: 'textarea',
      maxLength: 400,
      admin: { description: 'Brief description shown on the award card.' },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Full details',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      admin: { description: 'Optional longer write-up about the award.' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Featured awards appear prominently at the top.' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) return new Date()
            return value
          },
        ],
      },
    },
  ],
  timestamps: true,
}
