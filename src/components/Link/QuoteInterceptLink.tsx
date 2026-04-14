'use client'

import { useQuoteModalOptional } from '@/providers/QuoteModal'
import { Button, type ButtonProps } from '@/components/ui/button'
import React from 'react'

/**
 * Intercept clicks on links whose label matches "Request a quote" (case-insensitive)
 * and open the quote modal instead of navigating.
 */
export function QuoteInterceptButton({
  label,
  className,
  size,
  variant,
  children,
}: {
  label?: string | null
  className?: string
  size?: ButtonProps['size'] | null
  variant?: ButtonProps['variant']
  children?: React.ReactNode
}) {
  const ctx = useQuoteModalOptional()

  if (!ctx) return null

  return (
    <Button
      className={className}
      size={size}
      variant={variant}
      onClick={ctx.openQuoteModal}
    >
      {label && label}
      {children && children}
    </Button>
  )
}
