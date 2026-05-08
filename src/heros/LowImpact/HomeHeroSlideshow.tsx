'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const HOME_SLIDES = [
  '/slide/slide1.jpeg',
  '/slide/slide2.jpeg',
  '/slide/slide3.jpeg',
  '/slide/slide4.jpeg',
  '/slide/slide5.jpeg',
  '/slide/slide6.jpeg',
] as const

type HomeHeroSlideshowProps = {
  className?: string
  intervalMs?: number
}

export function HomeHeroSlideshow({ className, intervalMs = 4500 }: HomeHeroSlideshowProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (HOME_SLIDES.length <= 1) return
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % HOME_SLIDES.length)
    }, intervalMs)
    return () => window.clearInterval(timer)
  }, [intervalMs])

  return (
    <div className={className}>
      {HOME_SLIDES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt="Chilmund manufacturing campus and operations"
          fill
          className={`object-cover object-center transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
          sizes="(max-width: 1280px) 55vw, 700px"
          priority={i === 0}
        />
      ))}
    </div>
  )
}
