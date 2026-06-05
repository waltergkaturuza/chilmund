import clsx from 'clsx'
import React from 'react'

import { BrandLogo } from '@/components/BrandLogo/BrandLogo'

interface Props {
  className?: string
  /** Preserved for compatibility with existing call sites */
  variant?: 'default' | 'light'
  /** Slightly smaller mark on xl desktops so the tab strip fits without crowding */
  compactUntil2xl?: boolean
  /** Header uses a compact row; footer can display the mark larger */
  size?: 'header' | 'footer'
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className, variant = 'default', compactUntil2xl = false, size = 'header' } = props

  const heightClass =
    size === 'footer'
      ? 'h-12 w-auto sm:h-14 md:h-16'
      : compactUntil2xl
        ? 'h-10 w-auto sm:h-11 xl:h-10 2xl:h-12'
        : 'h-10 w-auto sm:h-11 md:h-12'

  return (
    <span
      className={clsx(
        'inline-flex items-center transition-colors',
        className,
      )}
    >
      <BrandLogo
        className={heightClass}
        sizes={size === 'footer' ? '(max-width: 768px) 220px, 320px' : '(max-width: 768px) 180px, 260px'}
        priority
        variant={variant}
      />
    </span>
  )
}
