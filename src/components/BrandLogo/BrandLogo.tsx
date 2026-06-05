import Image from 'next/image'
import React from 'react'

import {
  CHILMUND_LOGO_ALT,
  CHILMUND_LOGO_CONTENT,
  CHILMUND_LOGO_FULL,
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
 * Site logo — crops empty margins from `Chilmund Chemicals(Small-PNG)-01.png`
 * so header/footer height controls the visible mark, not the PNG canvas.
 */
export function BrandLogo({
  className,
  width = CHILMUND_LOGO_FULL.width,
  height = CHILMUND_LOGO_FULL.height,
  priority,
  sizes,
  variant = 'default',
}: BrandLogoProps) {
  const crop = CHILMUND_LOGO_CONTENT
  const full = CHILMUND_LOGO_FULL

  const imageStyle: React.CSSProperties = {
    width: `${(full.width / crop.width) * 100}%`,
    height: `${(full.height / crop.height) * 100}%`,
    left: `${-(crop.x / crop.width) * 100}%`,
    top: `${-(crop.y / crop.height) * 100}%`,
    ...(variant === 'light' ? { filter: 'brightness(0) invert(1)' } : {}),
  }

  return (
    <span
      className={cn('relative inline-block shrink-0 overflow-hidden align-middle', className)}
      style={{ aspectRatio: `${crop.width} / ${crop.height}` }}
    >
      <Image
        src={CHILMUND_LOGO_SRC}
        alt={CHILMUND_LOGO_ALT}
        width={width}
        height={height}
        className="absolute max-w-none"
        style={imageStyle}
        priority={priority}
        sizes={sizes}
      />
    </span>
  )
}
