import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface Props {
  className?: string
  /** Light-on-dark wordmark (e.g. over hero) */
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
      <Image
        src="/chilmund-logo.png"
        alt="Chilmund Chemicals"
        width={160}
        height={48}
        className={clsx(
          'h-8 w-auto md:h-10',
          variant === 'light' && 'brightness-0 invert',
        )}
        priority
      />
    </span>
  )
}
