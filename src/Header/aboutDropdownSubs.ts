import type { Header } from '@/payload-types'
import { resolveCMSLinkHref } from '@/utilities/resolveCMSLinkHref'

export type HeaderNavEntry = NonNullable<NonNullable<Header['navItems']>[number]>
export type HeaderSubItem = NonNullable<NonNullable<HeaderNavEntry['subItems']>[number]>

const SITE_ROW: HeaderSubItem = {
  link: {
    type: 'custom',
    label: 'Site map',
    url: '/sitemap',
    newTab: false,
  },
}

/** Matches the pill treated as rich “About” mega menu — keep Company on the compact dropdown strip. */
export function isAboutMegaDropdown(label: string | null | undefined): boolean {
  const t = (label || '').trim().toLowerCase()
  return t.includes('about')
}

/** Company / legacy labels that should still get `/sitemap` with the CMS sub-links. */
export function isAboutOrCompanyDropdown(label: string | null | undefined): boolean {
  const t = (label || '').trim().toLowerCase()
  return isAboutMegaDropdown(label) || t.includes('company') || t.includes('about chilmund')
}

/**
 * Ensures a Site map destination appears in About / Company groups even when the header global
 * was configured before `/sitemap` existed.
 */
export function withInjectedSiteMapSubItems(item: HeaderNavEntry): HeaderSubItem[] {
  const subs = item.subItems || []
  if (!isAboutOrCompanyDropdown(item.dropdownLabel)) return subs

  const hasSiteMap = subs.some((row) => resolveCMSLinkHref(row.link) === '/sitemap')
  if (hasSiteMap) return subs

  const contactIdx = subs.findIndex((row) => {
    const href = resolveCMSLinkHref(row.link) ?? ''
    const lab = (row.link?.label || '').toLowerCase()
    return lab.includes('contact') || href.endsWith('/contact') || href.includes('/contact/')
  })

  const next = [...subs]
  if (contactIdx >= 0) next.splice(contactIdx, 0, SITE_ROW)
  else next.push(SITE_ROW)
  return next
}
