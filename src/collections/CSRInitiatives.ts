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

export const CSRInitiatives: CollectionConfig = {
  slug: 'csr-initiatives',
  labels: { singular: 'CSR Initiative', plural: 'CSR Initiatives' },
  admin: {
    group: SIDEBAR.content,
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'location', '_status', 'createdAt'],
    description:
      'Corporate Social Responsibility programmes, community projects and sustainability efforts.',
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
      admin: { description: 'e.g. "Clean Water for Bindura Schools"' },
    },
    slugField(),
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Community Development', value: 'community' },
        { label: 'Education & Training', value: 'education' },
        { label: 'Environment & Sustainability', value: 'environment' },
        { label: 'Health & Wellness', value: 'health' },
        { label: 'Water & Sanitation', value: 'water' },
        { label: 'Youth Empowerment', value: 'youth' },
        { label: 'Employee Welfare', value: 'employee' },
        { label: 'Other', value: 'other' },
      ],
      admin: { description: 'Used for filtering on the public CSR page.' },
    },
    {
      name: 'date',
      type: 'date',
      label: 'Initiative date',
      admin: {
        date: { pickerAppearance: 'dayOnly' },
        description: 'When the initiative took place or started.',
      },
    },
    {
      name: 'location',
      type: 'text',
      admin: { description: 'e.g. "Bindura, Zimbabwe"' },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Main photo for this initiative.' },
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Photo gallery',
      labels: { singular: 'Photo', plural: 'Photos' },
      admin: { description: 'Additional photos from the initiative.' },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      maxLength: 400,
      admin: { description: 'Brief description shown on the initiative card.' },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Full story',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'impact',
      type: 'textarea',
      label: 'Impact / outcomes',
      admin: { description: 'e.g. "500 learners now have access to clean water"' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Featured initiatives appear at the top of the page.' },
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
