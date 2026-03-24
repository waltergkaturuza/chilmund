import React from 'react'

import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'

export type RenderHeroProps = Page['hero'] & {
  pageSlug?: string
}

export const RenderHero: React.FC<RenderHeroProps> = (props) => {
  const { pageSlug, ...rest } = props
  const { type } = rest || {}

  if (!type || type === 'none') return null

  if (type === 'lowImpact') {
    return <LowImpactHero {...rest} pageSlug={pageSlug} />
  }

  if (type === 'highImpact') {
    return <HighImpactHero {...rest} />
  }

  if (type === 'mediumImpact') {
    return <MediumImpactHero {...rest} />
  }

  return null
}
