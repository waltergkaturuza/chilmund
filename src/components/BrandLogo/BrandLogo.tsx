import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

import { CHILMUND_LOGO_ALT, CHILMUND_LOGO_ASPECT, CHILMUND_LOGO_SRC } from '@/constants/brand'

type BrandLogoProps = {
  className?: string
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
}

/** Site logo — SVG from `/public/LOGO new.svg` (unoptimized; Next image optimizer skips SVG). */
export function BrandLogo({
  className,
  width = 160,
  height = Math.round(width / CHILMUND_LOGO_ASPECT),
  priority,
  sizes,
}: BrandLogoProps) {
  return (
    <span className="inline-flex shrink-0 overflow-visible p-0.5">
      <Image
        src={CHILMUND_LOGO_SRC}
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
