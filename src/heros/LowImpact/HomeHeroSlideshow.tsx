'use client'

import { ImageSlideshow } from '@/components/ImageSlideshow/ImageSlideshow'
import React from 'react'

const HOME_SLIDES = [
  '/slide/slide1.jpeg',
  '/slide/slide2.jpeg',
  '/slide/slide3.jpeg',
  '/slide/slide4.jpeg',
  '/slide/slide5.jpeg',
  '/slide/slide6.jpeg',
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
