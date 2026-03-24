import clsx from 'clsx'
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
        'flex flex-col leading-none transition-colors',
        variant === 'light' ? 'text-white' : 'text-foreground',
        className,
      )}
    >
      <span className="font-extrabold text-xl tracking-tight md:text-2xl">Chilmund</span>
      <span
        className={clsx(
          'mt-1 text-[0.65rem] font-bold uppercase tracking-[0.28em]',
          variant === 'light' ? 'text-amber-300' : 'text-amber-600',
        )}
      >
        Chemicals
      </span>
    </span>
  )
}
