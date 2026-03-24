import type { Access } from 'payload'

/** Public read only when `published` is true; staff see all. */
export const publicIfProductPublished: Access = ({ req: { user } }) => {
  if (user) return true
  return { published: { equals: true } }
}
