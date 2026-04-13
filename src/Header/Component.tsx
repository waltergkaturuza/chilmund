import { HeaderClient } from './Component.client'
import { defaultNavItems } from './defaultNavItems'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  const hasNavItems = headerData?.navItems && headerData.navItems.length > 0
  const data: Header = hasNavItems
    ? headerData
    : { ...headerData, navItems: defaultNavItems }

  return <HeaderClient data={data} />
}
