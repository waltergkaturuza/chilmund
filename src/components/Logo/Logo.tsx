import clsx from 'clsx'
import React from 'react'

import { BrandLogo } from '@/components/BrandLogo/BrandLogo'

interface Props {
  className?: string
  /** Preserved for compatibility with existing call sites */
  variant?: 'default' | 'light'
  /** Slightly smaller mark on xl desktops so the tab strip fits without crowding */
  compactUntil2xl?: boolean
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className, variant = 'default', compactUntil2xl = false } = props

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 transition-colors',
        className,
      )}
    >
      <BrandLogo
        width={280}
        className={clsx(
          'h-10 w-auto sm:h-11',
          compactUntil2xl ? 'xl:h-10 2xl:h-12' : 'md:h-12',
        )}
        sizes="(max-width: 768px) 200px, 280px"
        priority
        variant={variant}
      />
    </span>
  )
}
