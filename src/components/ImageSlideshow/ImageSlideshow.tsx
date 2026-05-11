'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { cn } from '@/utilities/ui'

export type ImageSlideshowSlide = {
  src: string
  alt: string
}

export type ImageSlideshowProps = {
  slides: ImageSlideshowSlide[]
  /** Default 5000 (SHEQ). */
  intervalMs?: number
  /** Outer wrapper; include layout (e.g. aspect ratio), border, overflow-hidden. */
  className?: string
  sizes?: string
}

export function ImageSlideshow({
  slides,
  intervalMs = 5000,
  className,
  sizes = '(max-width: 1024px) 100vw, 50vw',
}: ImageSlideshowProps) {
  const [index, setIndex] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (reduceMotion || slides.length <= 1) return
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, intervalMs)
    return () => window.clearInterval(timer)
  }, [slides.length, intervalMs, reduceMotion])

  if (slides.length === 0) return null

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const next = () => setIndex((i) => (i + 1) % slides.length)

  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          className={`object-cover object-center transition-opacity duration-500 ${i === index ? 'opacity-100' : 'opacity-0'}`}
          sizes={sizes}
          priority={i === 0}
        />
      ))}

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-slate-900/55 px-2.5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-slate-900/75"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-slate-900/55 px-2.5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-slate-900/75"
          >
            ›
          </button>
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={`${slide.src}-dot`}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`size-2.5 rounded-full border border-white/70 transition-colors ${i === index ? 'bg-white' : 'bg-white/35 hover:bg-white/60'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
