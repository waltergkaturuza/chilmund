'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { cn } from '@/utilities/ui'

export type ImageSlideshowSlide = {
  src: string
  alt: string
  /** Shown below the image when set (updates with the active slide). */
  caption?: string
}

export type ImageSlideshowProps = {
  slides: ImageSlideshowSlide[]
  /** Default 5000 (SHEQ). */
  intervalMs?: number
  /** Outer wrapper; include layout (e.g. aspect ratio), border, overflow-hidden. */
  className?: string
  sizes?: string
  /** Use on light backgrounds (arrows + dots tuned for certificates, etc.). */
  controlsOnLight?: boolean
  /** Certificates and diagrams: show full frame without cropping. */
  imageFit?: 'cover' | 'contain'
  /**
   * Grow to fill a column flex parent (e.g. partners page aside). Parent should be
   * `flex flex-col` with `min-h-0`; row height typically comes from a sibling grid column.
   */
  growInFlexLayout?: boolean
}

export function ImageSlideshow({
  slides,
  intervalMs = 5000,
  className,
  sizes = '(max-width: 1024px) 100vw, 50vw',
  controlsOnLight = false,
  imageFit = 'cover',
  growInFlexLayout = false,
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

  const activeCaption = slides[index]?.caption
  const arrowBtn = controlsOnLight
    ? 'border border-slate-200/90 bg-white/95 text-slate-800 shadow-sm hover:bg-slate-50 dark:border-white/12 dark:bg-slate-950/80 dark:text-white dark:hover:bg-slate-900'
    : 'bg-slate-900/55 text-white hover:bg-slate-900/75'
  const dotBtn = (i: number) =>
    controlsOnLight
      ? cn(
          'size-2.5 rounded-full border transition-colors',
          i === index
            ? 'border-blue-600 bg-blue-600 dark:border-blue-400 dark:bg-blue-500'
            : 'border-slate-300 bg-white hover:border-slate-400 dark:border-white/35 dark:bg-white/20 dark:hover:border-white/55',
        )
      : `size-2.5 rounded-full border border-white/70 transition-colors ${i === index ? 'bg-white' : 'bg-white/35 hover:bg-white/60'}`

  return (
    <div
      className={cn(
        'flex w-full flex-col gap-3',
        growInFlexLayout && 'min-h-0 flex-1',
      )}
    >
      <div
        className={cn(
          'relative w-full overflow-hidden',
          imageFit === 'contain' && 'bg-slate-100 dark:bg-slate-900/80',
          growInFlexLayout && 'min-h-[13rem] flex-1 sm:min-h-[16rem] lg:min-h-0',
          className,
        )}
      >
        {slides.map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            className={cn(
              'object-center transition-opacity duration-500',
              imageFit === 'contain' ? 'object-contain' : 'object-cover',
              i === index ? 'opacity-100' : 'opacity-0',
            )}
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
              className={cn(
                'absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full px-2.5 py-1.5 text-sm font-semibold transition-colors',
                arrowBtn,
              )}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className={cn(
                'absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full px-2.5 py-1.5 text-sm font-semibold transition-colors',
                arrowBtn,
              )}
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
                  className={dotBtn(i)}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {activeCaption ? (
        <p
          className={cn(
            'text-center text-sm leading-relaxed text-slate-600 dark:text-white/60',
            growInFlexLayout && 'shrink-0',
          )}
        >
          {activeCaption}
        </p>
      ) : null}
    </div>
  )
}
