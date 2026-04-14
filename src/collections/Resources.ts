import type { CollectionConfig } from 'payload'

import { SIDEBAR } from '@/admin/sidebarGroups'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const Resources: CollectionConfig = {
  slug: 'resources',
  labels: { singular: 'Resource', plural: 'Resources' },
  admin: {
    group: SIDEBAR.content,
    useAsTitle: 'title',
    defaultColumns: ['title', 'resourceType', '_status', 'createdAt'],
    description:
      'Public resource library — certificates, documents, infographics, videos, images, etc.',
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
      admin: { description: 'Display name shown on the public site.' },
    },
    {
      name: 'resourceType',
      type: 'select',
      required: true,
      label: 'Type',
      options: [
        { label: 'Certificate', value: 'certificate' },
        { label: 'Document', value: 'document' },
        { label: 'Infographic', value: 'infographic' },
        { label: 'Video', value: 'video' },
        { label: 'Image / Photo', value: 'image' },
        { label: 'Brochure', value: 'brochure' },
        { label: 'Datasheet', value: 'datasheet' },
        { label: 'Presentation', value: 'presentation' },
        { label: 'Other', value: 'other' },
      ],
      admin: { description: 'Used for filtering on the public Resources page.' },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'Short summary shown on the resource card.' },
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description:
          'The downloadable file — PDF, image, document, etc. For videos, upload a thumbnail here and paste the video URL below.',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Optional cover image / thumbnail. If empty the file preview is used.',
      },
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video URL',
      admin: {
        description: 'YouTube or Vimeo URL. Only needed for video resources.',
        condition: (_data, siblingData) => siblingData?.resourceType === 'video',
      },
    },
    {
      name: 'fileSize',
      type: 'text',
      label: 'File size',
      admin: {
        description: 'e.g. "2.4 MB" — shown as a hint next to the download button.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Featured resources appear at the top of the page.' },
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
