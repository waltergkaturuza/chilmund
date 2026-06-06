import { HeaderClient } from './Component.client'
import { defaultNavItems } from './defaultNavItems'
import { applyNavLabelOverrides } from './navLabelOverrides'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

type NavItems = Exclude<Header['navItems'], null | undefined>
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

  if (productsIndex === -1) return items

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

  if (hadLogisticsInProducts && !items.some(isLogisticsTopItem)) {
    const logisticsTopItem: NavItem = {
      style: 'link',
      link: { type: 'custom', url: '/trucking-logistics', label: 'Logistics', newTab: false },
    }
    const partnersAfterInsert = items.findIndex(
      (item) => item?.style === 'dropdown' && item?.dropdownLabel?.toLowerCase?.() === 'partners',
    )
    const insertAt = partnersAfterInsert >= 0 ? partnersAfterInsert + 1 : productsIndex + 1
    items.splice(insertAt, 0, logisticsTopItem)
  }

  return applyNavLabelOverrides(items.filter((item) => !isIndustryAwardsTopItem(item)))
}

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  const hasNavItems = headerData?.navItems && headerData.navItems.length > 0
  const sourceNavItems = hasNavItems ? headerData.navItems : defaultNavItems
  const data: Header = { ...headerData, navItems: normalizeNavItems(sourceNavItems) }

  return <HeaderClient data={data} />
}
