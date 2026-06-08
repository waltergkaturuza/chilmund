'use client'

import { ImageSlideshow } from '@/components/ImageSlideshow/ImageSlideshow'
import React from 'react'

function homeSlideSrc(filename: string): string {
  return `/homeslide/${encodeURIComponent(filename)}`
}

/** Enhanced campus / plant highlights — first slide from `public/`, others from `public/homeslide/`. */
const HOME_SLIDES = [
  `/${encodeURIComponent('chilmund plant.png')}`,
  homeSlideSrc('ChatGPT Image May 27, 2026, 04_52_34 PM (1).png'),
  homeSlideSrc('ChatGPT Image May 27, 2026, 05_01_38 PM (1).png'),
] as const

const HOME_SLIDE_ALT = 'Chilmund manufacturing campus and operations'

type HomeHeroSlideshowProps = {
  className?: string
  intervalMs?: number
}

export function HomeHeroSlideshow({ className, intervalMs = 5000 }: HomeHeroSlideshowProps) {
  const slides = HOME_SLIDES.map((src) => ({ src, alt: HOME_SLIDE_ALT }))

  return (
    <ImageSlideshow
      slides={slides}
      intervalMs={intervalMs}
      className={className}
      sizes="(max-width: 1280px) 55vw, 700px"
      imageQuality={92}
    />
  )
}
