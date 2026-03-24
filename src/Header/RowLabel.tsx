'use client'
import React from 'react'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

type NavRow = NonNullable<Header['navItems']>[number]

export const RowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<NavRow>()
  const style = data?.style || 'link'
  const n = rowNumber !== undefined ? rowNumber + 1 : ''

  if (style === 'dropdown' && data?.dropdownLabel) {
    return <div>Menu {n}: {data.dropdownLabel}</div>
  }

  const label = data?.link?.label
  if (label) {
    return <div>Link {n}: {label}</div>
  }

  return <div>Item {n}</div>
}
