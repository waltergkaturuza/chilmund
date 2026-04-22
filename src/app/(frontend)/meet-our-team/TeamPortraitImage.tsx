'use client'

import { cn } from '@/utilities/ui'
import Image from 'next/image'
import React from 'react'

type Props = {
  src: string
  alt: string
  /** Tailwind object-position utilities, e.g. object-[50%_58%] */
  objectPositionClass?: string | null
  sizes: string
  priority?: boolean
  className?: string
}

/**
 * Optimized portrait: Next/Image (responsive formats + quality) with object-fit cover.
 */
export function TeamPortraitImage({
  src,
  alt,
  objectPositionClass,
  sizes,
  priority = false,
  className,
}: Props) {
  if (!src) return null

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      quality={85}
      priority={priority}
      className={cn('object-cover', objectPositionClass ?? 'object-center', className)}
      {...(alt === '' ? { 'aria-hidden': true as const } : {})}
    />
  )
}
