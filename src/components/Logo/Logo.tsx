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
  const { className, variant = 'default' } = props

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 transition-colors',
        className,
      )}
    >
      <BrandLogo
        width={280}
        className="h-10 w-auto sm:h-11 md:h-12"
        sizes="(max-width: 768px) 200px, 280px"
        priority
        variant={variant}
      />
    </span>
  )
}
