import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { publicIfProductPublished } from '@/access/publicIfProductPublished'
import { defaultLexical } from '@/fields/defaultLexical'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { slugField } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { revalidateProduct, revalidateProductDelete } from './hooks/revalidateProduct'

export const Products: CollectionConfig<'products'> = {
  slug: 'products',
  admin: {
    group: 'Website content',
    defaultColumns: ['title', 'slug', 'category', 'published', 'updatedAt'],
    useAsTitle: 'title',
    description:
      'Product catalog: public pages at /products/[slug], datasheet downloads, and SEO. Link products from Pages or the main nav.',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'products',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'products',
        req,
      }),
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: publicIfProductPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'published',
      type: 'checkbox',
      label: 'Published on website',
      defaultValue: false,
      admin: {
        description: 'Only published products appear in the catalog and on /products.',
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            {
              name: 'category',
              type: 'select',
              label: 'Product category',
              options: [
                { label: 'Industrial chemicals', value: 'industrial' },
                { label: 'Agriculture', value: 'agriculture' },
                { label: 'Water treatment', value: 'water-treatment' },
                { label: 'Other', value: 'other' },
              ],
              admin: {
                description: 'Used for filters on the product catalog.',
              },
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              label: 'Summary',
              admin: {
                description: 'Shown on catalog cards and in site search.',
              },
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero image',
            },
            {
              name: 'content',
              type: 'richText',
              editor: defaultLexical,
              label: 'Product details',
              required: true,
            },
            {
              name: 'datasheet',
              type: 'upload',
              relationTo: 'media',
              label: 'Datasheet (PDF)',
              admin: {
                description: 'Upload a PDF in Media first, then select it here.',
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateProduct],
    afterDelete: [revalidateProductDelete],
  },
}
