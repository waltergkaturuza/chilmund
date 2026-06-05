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

  const width = size === 'footer' ? 360 : 320
  const heightClass =
    size === 'footer'
      ? 'h-14 w-auto sm:h-16 md:h-[4.5rem]'
      : compactUntil2xl
        ? 'h-12 w-auto sm:h-14 xl:h-12 2xl:h-16'
        : 'h-12 w-auto sm:h-14 md:h-16'

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 transition-colors',
        className,
      )}
    >
      <BrandLogo
        width={width}
        className={heightClass}
        sizes={size === 'footer' ? '(max-width: 768px) 260px, 360px' : '(max-width: 768px) 240px, 320px'}
        priority
        variant={variant}
      />
    </span>
  )
}
