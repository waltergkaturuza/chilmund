import type { Page, Post, Product } from '@/payload-types'

export type CMSLinkLike = {
  type?: ('reference' | 'custom') | null
  reference?:
    | {
        relationTo: 'pages'
        value: number | Page
      }
    | {
        relationTo: 'posts'
        value: number | Post
      }
    | {
        relationTo: 'products'
        value: number | Product
      }
    | null
  url?: string | null
}

export function resolveCMSLinkHref(link: CMSLinkLike | null | undefined): string | null {
  if (!link) return null
  if (link.type === 'reference' && link.reference?.value) {
    const v = link.reference.value
    if (typeof v === 'object' && v && 'slug' in v && typeof v.slug === 'string') {
      if (link.reference.relationTo === 'pages') return `/${v.slug}`
      return `/${link.reference.relationTo}/${v.slug}`
    }
  }
  if (link.type === 'custom' && link.url) return link.url
  return null
}

export function isHrefActive(pathname: string, href: string): boolean {
  if (!href) return false
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}
