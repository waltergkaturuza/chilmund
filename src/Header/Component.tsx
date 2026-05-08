import { HeaderClient } from './Component.client'
import { defaultNavItems } from './defaultNavItems'
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

function normalizeNavItems(navItems: Header['navItems']): NavItems {
  const items: NavItems = [...(navItems ?? [])]
  const productsIndex = items.findIndex(
    (item) => item?.style === 'dropdown' && item?.dropdownLabel?.toLowerCase?.() === 'products',
  )

  if (productsIndex === -1) return items

  const productsItem = items[productsIndex]
  const subItems = Array.isArray(productsItem.subItems) ? [...productsItem.subItems] : []
  const logisticsSubItem = subItems.find(isLogisticsSubItem)

  if (!logisticsSubItem) return items

  const filteredSubItems = subItems.filter((subItem) => !isLogisticsSubItem(subItem))
  items[productsIndex] = {
    ...productsItem,
    subItems: filteredSubItems,
  }

  if (items.some(isLogisticsTopItem)) return items

  const partnersIndex = items.findIndex(
    (item) => item?.style === 'dropdown' && item?.dropdownLabel?.toLowerCase?.() === 'partners',
  )
  const insertAt = partnersIndex >= 0 ? partnersIndex + 1 : productsIndex + 1

  const logisticsTopItem: NavItem = {
    style: 'link',
    link: { type: 'custom', url: '/trucking-logistics', label: 'Logistics', newTab: false },
  }

  items.splice(insertAt, 0, logisticsTopItem)
  return items
}

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  const hasNavItems = headerData?.navItems && headerData.navItems.length > 0
  const sourceNavItems = hasNavItems ? headerData.navItems : defaultNavItems
  const data: Header = { ...headerData, navItems: normalizeNavItems(sourceNavItems) }

  return <HeaderClient data={data} />
}
