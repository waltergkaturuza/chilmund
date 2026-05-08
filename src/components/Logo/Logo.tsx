import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

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
      <Image
        src="/chilmund-logo.png"
        alt="Chilmund Chemicals"
        width={160}
        height={48}
        className="h-8 w-auto md:h-10"
        priority
      />
    </span>
  )
}
