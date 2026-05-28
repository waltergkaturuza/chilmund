import Image from 'next/image'
import React from 'react'

import {
  CHILMUND_LOGO_ALT,
  CHILMUND_LOGO_ASPECT,
  CHILMUND_LOGO_SRC,
} from '@/constants/brand'
import { cn } from '@/utilities/ui'

type BrandLogoProps = {
  className?: string
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
  /**
   * 'light'   → white logo for dark backgrounds (CSS invert filter applied).
   * 'default' → full-colour logo for light/white backgrounds.
   */
  variant?: 'default' | 'light'
}

/**
 * Site logo — always renders LOGO new.svg.
 * On dark backgrounds pass `variant="light"` to render a clean all-white logo
 * (CSS brightness/invert filter; the baked-in white rect behind the tagline
 * becomes invisible because everything is white on dark).
 */
export function BrandLogo({
  className,
  width = 160,
  height = Math.round(width / CHILMUND_LOGO_ASPECT),
  priority,
  sizes,
  variant = 'default',
}: BrandLogoProps) {
  return (
    <span className="inline-flex shrink-0 overflow-visible p-0.5">
      <Image
        src={CHILMUND_LOGO_SRC}
        alt={CHILMUND_LOGO_ALT}
        width={width}
        height={height}
        className={cn('h-auto w-auto', className)}
        style={variant === 'light' ? { filter: 'brightness(0) invert(1)' } : undefined}
        priority={priority}
        sizes={sizes}
        unoptimized
      />
    </span>
  )
}
