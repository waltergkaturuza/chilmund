import clsx from 'clsx'
import React from 'react'

import { BrandLogo } from '@/components/BrandLogo/BrandLogo'

interface Props {
  className?: string
  /** Preserved for compatibility with existing call sites */
  variant?: 'default' | 'light'
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className } = props

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 transition-colors',
        className,
      )}
    >
      <BrandLogo width={160} height={113} className="h-8 w-auto md:h-10" priority />
    </span>
  )
}
