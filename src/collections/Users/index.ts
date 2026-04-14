import type { CollectionConfig } from 'payload'
import { SIDEBAR } from '@/admin/sidebarGroups'
import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: ({ req: { user } }) => user?.roles?.includes('admin') ?? false,
    delete: ({ req: { user } }) => user?.roles?.includes('admin') ?? false,
    read: authenticated,
    update: ({ req: { user }, id }) => {
      if (user?.roles?.includes('admin')) return true
      return { id: { equals: user?.id } }
    },
  },
  admin: {
    group: SIDEBAR.administration,
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['editor'],
      required: true,
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        update: ({ req: { user } }) => user?.roles?.includes('admin') ?? false,
      },
      admin: {
        description: 'Admins can manage users and settings. Editors can manage content only.',
      },
    },
  ],
  timestamps: true,
}
