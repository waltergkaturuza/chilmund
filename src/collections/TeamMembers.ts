import type { CollectionConfig } from 'payload'

import { SIDEBAR } from '@/admin/sidebarGroups'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  labels: { singular: 'Team Member', plural: 'Team Members' },
  admin: {
    group: SIDEBAR.content,
    useAsTitle: 'name',
    defaultColumns: ['name', 'jobTitle', 'department', 'order', '_status'],
    description: 'Manage the Chilmund team displayed on the "Meet Our Team" page.',
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
  defaultSort: 'order',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'jobTitle',
          type: 'text',
          required: true,
          label: 'Job title / role',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'department',
      type: 'select',
      options: [
        { label: 'Executive / Management', value: 'management' },
        { label: 'Finance & Admin', value: 'finance' },
        { label: 'Business Development', value: 'business' },
        { label: 'Production & Maintenance', value: 'production' },
        { label: 'Research & Compliance', value: 'research' },
        { label: 'Engineering', value: 'engineering' },
        { label: 'Human Resources', value: 'hr' },
        { label: 'Quality Assurance', value: 'quality' },
        { label: 'SHEQ & Safety', value: 'sheq' },
        { label: 'Supply Chain & Logistics', value: 'logistics' },
        { label: 'Other', value: 'other' },
      ],
      admin: { description: 'Used for grouping on the public page.' },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Professional headshot or portrait photo.' },
    },
    {
      name: 'bio',
      type: 'textarea',
      maxLength: 500,
      admin: { description: 'Short biography shown on hover/click (optional).' },
    },
    {
      name: 'email',
      type: 'email',
      admin: { description: 'Public contact email (optional).' },
    },
    {
      name: 'linkedIn',
      type: 'text',
      label: 'LinkedIn URL',
      admin: { description: 'Full LinkedIn profile URL (optional).' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 50,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first. Use 1-10 for executives, 20+ for others.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Featured members get a larger card.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
