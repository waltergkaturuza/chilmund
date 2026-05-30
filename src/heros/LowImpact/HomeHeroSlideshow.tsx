'use client'

import { ImageSlideshow } from '@/components/ImageSlideshow/ImageSlideshow'
import React from 'react'

/** Campus / plant highlights — no truck photos in the home hero carousel. */
const HOME_SLIDES = [
  '/slide/slide6.jpeg',
  `/${encodeURIComponent('Storage tanks.jpg')}`,
  `/${encodeURIComponent('AIEnhancer_DJI_0333(1).png')}`,
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
    />
  )
}
