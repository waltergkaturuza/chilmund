import type { GlobalConfig } from 'payload'

import { SIDEBAR } from '@/admin/sidebarGroups'
import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header & main menu',
  admin: {
    group: SIDEBAR.site,
    description:
      'Controls the public top bar: pill-style tabs and optional dropdown groups (similar to large summit / conference sites). Order here is left → right on the site.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Main menu',
          fields: [
            {
              name: 'navItems',
              type: 'array',
              labels: { singular: 'Item', plural: 'Menu items' },
              maxRows: 14,
              admin: {
                initCollapsed: false,
                description:
                  'Use **Single link** for Home, Contact, etc. Use **Dropdown group** for sections with several destinations (e.g. Company, Products).',
                components: {
                  RowLabel: '@/Header/RowLabel#RowLabel',
                },
              },
              fields: [
                {
                  name: 'style',
                  type: 'select',
                  label: 'Type',
                  defaultValue: 'link',
                  required: false,
                  options: [
                    { label: 'Single link', value: 'link' },
                    { label: 'Dropdown group', value: 'dropdown' },
                  ],
                  admin: {
                    description: 'Dropdowns show a panel of sub-links on hover (desktop) or tap (mobile).',
                  },
                },
                link({
                  appearances: false,
                  overrides: {
                    admin: {
                      condition: (_data, siblingData) =>
                        !siblingData?.style || siblingData?.style === 'link',
                    },
                  },
                }),
                {
                  name: 'dropdownLabel',
                  type: 'text',
                  label: 'Dropdown label',
                  required: true,
                  admin: {
                    condition: (_data, siblingData) => siblingData?.style === 'dropdown',
                    description: 'Shown on the pill / button (e.g. “Company”, “Products”).',
                  },
                },
                {
                  name: 'subItems',
                  type: 'array',
                  label: 'Sub-links',
                  labels: { singular: 'Link', plural: 'Sub-links' },
                  minRows: 1,
                  admin: {
                    condition: (_data, siblingData) => siblingData?.style === 'dropdown',
                    initCollapsed: true,
                  },
                  fields: [link({ appearances: false })],
                },
              ],
            },
          ],
        },
        {
          label: 'Live site tips',
          fields: [
            {
              name: 'navHelp',
              type: 'ui',
              admin: {
                components: {
                  Field: '@/components/AdminNavHelp#AdminNavHelp',
                },
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
