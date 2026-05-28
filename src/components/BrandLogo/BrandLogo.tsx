import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

import {
  CHILMUND_LOGO_ALT,
  CHILMUND_LOGO_ASPECT,
  CHILMUND_LOGO_COLOUR_SRC,
  CHILMUND_LOGO_SRC,
} from '@/constants/brand'

type BrandLogoProps = {
  className?: string
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
  /** 'light' = white logo for dark backgrounds; 'default' = full-colour for light backgrounds. */
  variant?: 'default' | 'light'
}

/**
 * Site logo.
 * - Dark backgrounds (dark header / footer): use `variant="light"` — white SVG.
 * - Light backgrounds (white header): use `variant="default"` — full-colour PNG.
 */
export function BrandLogo({
  className,
  width = 160,
  height = Math.round(width / CHILMUND_LOGO_ASPECT),
  priority,
  sizes,
  variant = 'default',
}: BrandLogoProps) {
  const src = variant === 'light' ? CHILMUND_LOGO_SRC : CHILMUND_LOGO_COLOUR_SRC
  return (
    <span className="inline-flex shrink-0 overflow-visible p-0.5">
      <Image
        src={src}
        alt={CHILMUND_LOGO_ALT}
        width={width}
        height={height}
        className={clsx('h-auto w-auto', className)}
        priority={priority}
        sizes={sizes}
        unoptimized
      />
    </span>
  )
}
