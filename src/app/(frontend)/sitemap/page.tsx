import type { Metadata } from 'next'
import Link from 'next/link'

import type { Header } from '@/payload-types'

import { defaultNavItems } from '@/Header/defaultNavItems'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { innerHeroRadialSection } from '@/utilities/pageHero'
import { resolveCMSLinkHref } from '@/utilities/resolveCMSLinkHref'

export const metadata: Metadata = {
  title: 'Site map | Chilmund Chemicals',
  description: 'Structured directory of primary pages across the Chilmund Chemicals website.',
}

type NavItems = NonNullable<Header['navItems']>
type NavItem = NavItems[number]
type SubItem = NonNullable<NavItem['subItems']>[number]

function isLogisticsSubItem(subItem: SubItem): boolean {
  const label = subItem?.link?.label?.toLowerCase?.() ?? ''
  const url = subItem?.link?.url ?? ''
  return label === 'logistics' || url === '/trucking-logistics'
}

function isLogisticsTopItem(item: NavItem): boolean {
  const label = item?.link?.label?.toLowerCase?.() ?? ''
  const url = item?.link?.url ?? ''
  return label === 'logistics' || url === '/trucking-logistics'
}

function isManufacturingSubItem(subItem: SubItem): boolean {
  const label = subItem?.link?.label?.toLowerCase?.() ?? ''
  const url = subItem?.link?.url ?? ''
  return label.includes('manufacturing') || url === '/manufacturing-plant'
}

function isManufacturingTopItem(item: NavItem): boolean {
  const label = item?.link?.label?.toLowerCase?.() ?? ''
  const url = item?.link?.url ?? ''
  return label.includes('manufacturing') || url === '/manufacturing-plant'
}

function isIndustryAwardsSubItem(subItem: SubItem): boolean {
  const label = subItem?.link?.label?.toLowerCase?.() ?? ''
  const url = subItem?.link?.url ?? ''
  return label.includes('industry awards') || url === '/industry-awards'
}

function isIndustryAwardsTopItem(item: NavItem): boolean {
  const label = item?.link?.label?.toLowerCase?.() ?? ''
  const url = item?.link?.url ?? ''
  return label.includes('industry awards') || url === '/industry-awards'
}

function normalizeNavItems(navItems: Header['navItems']): NavItems {
  const items: NavItems = [...(navItems ?? [])]
  const productsIndex = items.findIndex(
    (item) => item?.style === 'dropdown' && item?.dropdownLabel?.toLowerCase?.() === 'products',
  )

  if (productsIndex === -1) {
    return items.filter((item) => !isManufacturingTopItem(item))
  }

  const productsItem = items[productsIndex]
  const subItems = Array.isArray(productsItem.subItems) ? [...productsItem.subItems] : []
  const hadLogisticsInProducts = subItems.some(isLogisticsSubItem)

  const filteredSubItems = subItems.filter(
    (subItem) =>
      !isLogisticsSubItem(subItem) &&
      !isManufacturingSubItem(subItem) &&
      !isIndustryAwardsSubItem(subItem),
  )

  if (filteredSubItems.length !== subItems.length) {
    items[productsIndex] = {
      ...productsItem,
      subItems: filteredSubItems,
    }
  }

  const withoutManufacturing = items.filter(
    (item) => !isManufacturingTopItem(item) && !isIndustryAwardsTopItem(item),
  )

  if (hadLogisticsInProducts && !withoutManufacturing.some(isLogisticsTopItem)) {
    const partnersIndex = withoutManufacturing.findIndex(
      (item) => item?.style === 'dropdown' && item?.dropdownLabel?.toLowerCase?.() === 'partners',
    )
    const insertAt = partnersIndex >= 0 ? partnersIndex + 1 : productsIndex + 1
    withoutManufacturing.splice(insertAt, 0, {
      style: 'link',
      link: { type: 'custom', url: '/trucking-logistics', label: 'Logistics', newTab: false },
    })
  }

  return withoutManufacturing
}

function buildSections(items: NonNullable<Header['navItems']>): {
  title: string
  links: { label: string; href: string }[]
}[] {
  const singles: { label: string; href: string }[] = []
  const sections: { title: string; links: { label: string; href: string }[] }[] = []

  for (const item of items) {
    const style = item.style || 'link'

    if (style === 'dropdown') {
      const links = (item.subItems || [])
        .map((s) => {
          const href = resolveCMSLinkHref(s.link)
          return href ? { label: String(s.link?.label || 'Link').trim() || 'Link', href } : null
        })
        .filter(Boolean) as { label: string; href: string }[]

      if (links.length && item.dropdownLabel) {
        sections.push({ title: item.dropdownLabel, links })
      }
    } else {
      const href = resolveCMSLinkHref(item.link)
      const label = item.link?.label?.trim()
      if (href && label) singles.push({ label, href })
    }
  }

  if (singles.length) sections.unshift({ title: 'Overview', links: singles })

  return sections
}

const extraSections: {
  title: string
  links: { label: string; href: string }[]
}[] = [
  {
    title: 'Tools & policies',
    links: [
      { label: 'Search', href: '/search' },
      { label: 'Bindura plant map', href: '/bindura-map' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Use', href: '/terms-of-use' },
    ],
  },
]

export default async function SiteMapPage() {
  const headerData = await getCachedGlobal('header', 1)()

  const hasNavItems = headerData?.navItems && headerData.navItems.length > 0
  const sourceNavItems = (hasNavItems ? headerData.navItems : defaultNavItems)!
  const navItems = normalizeNavItems(sourceNavItems)

  const primary = buildSections(navItems)

  return (
    <article className="min-h-screen">
      <section className={innerHeroRadialSection}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Site map</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg md:leading-relaxed">
            Navigate the main sections of our site using the headings below — the same destinations as the primary
            header menu whenever your menu is curated in Payload.
          </p>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950">
        <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-2">
        {primary.map(({ title, links }) => (
          <section key={title}>
            <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-400">
              {title}
            </h2>
            <ul className="mt-4 space-y-2.5 border-t border-slate-200 pt-4 text-sm dark:border-white/15">
              {links.map(({ label, href }) => (
                <li key={`${href}-${label}`}>
                  <Link
                    href={href}
                    className="font-medium text-slate-900 underline-offset-4 transition-colors hover:text-blue-600 hover:underline dark:text-white dark:hover:text-blue-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {extraSections.map(({ title, links }) => (
          <section key={title}>
            <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-400">
              {title}
            </h2>
            <ul className="mt-4 space-y-2.5 border-t border-slate-200 pt-4 text-sm dark:border-white/15">
              {links.map(({ label, href }) => (
                <li key={`${href}-${label}`}>
                  <Link
                    href={href}
                    className="font-medium text-slate-900 underline-offset-4 transition-colors hover:text-blue-600 hover:underline dark:text-white dark:hover:text-blue-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
          </div>
        </div>
      </section>
    </article>
  )
}
