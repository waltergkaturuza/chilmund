import type { Header } from '@/payload-types'
import { resolveCMSLinkHref } from '@/utilities/resolveCMSLinkHref'

type NavItems = NonNullable<Header['navItems']>

/** Canonical Title Case labels — keeps tabs consistent even when CMS copy drifts. */
export const NAV_LABEL_BY_HREF: Record<string, string> = {
  '/': 'Home',
  '/about-chilmund': 'About Us',
  '/meet-our-team': 'Meet Our Team',
  '/sitemap': 'Site Map',
  '/contact': 'Contact Us',
  '/product-details': 'Product Details',
  '/uses-aluminium-sulphate': 'Uses of Aluminium Sulphate',
  '/trucking-logistics': 'Logistics',
  '/partnerships-accreditations': 'Partners and Certifications',
  '/regional-markets': 'Regional Markets',
  '/sheq': 'SHEQ',
  '/news': 'News & Events',
  '/csr': 'CSR',
  '/resources': 'Library',
  '/track-quote': 'Track Your Quote',
  '/manufacturing-plant': 'Manufacturing Plant',
  '/bindura-map': 'Bindura Plant Map',
  '/industry-awards': 'Industry Awards',
}

function overrideLinkLabel<T extends { label?: string | null }>(
  link: T | null | undefined,
): T | null | undefined {
  if (!link) return link
  const href = resolveCMSLinkHref(link as Parameters<typeof resolveCMSLinkHref>[0])
  if (!href || !NAV_LABEL_BY_HREF[href]) return link
  return { ...link, label: NAV_LABEL_BY_HREF[href] }
}

export function applyNavLabelOverrides(navItems: Header['navItems']): NavItems {
  if (!navItems?.length) return []

  return navItems.map((item) => {
    if (!item) return item
    if (item.style === 'link') {
      return { ...item, link: overrideLinkLabel(item.link) ?? item.link }
    }
    if (item.style === 'dropdown' && item.subItems?.length) {
      return {
        ...item,
        subItems: item.subItems.map((sub) => ({
          ...sub,
          link: overrideLinkLabel(sub.link) ?? sub.link,
        })),
      }
    }
    return item
  }) as NavItems
}
