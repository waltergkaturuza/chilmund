'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type Slide = {
  src: string
  alt: string
}

type SheqImageSlideshowProps = {
  slides: Slide[]
  intervalMs?: number
}

export function SheqImageSlideshow({ slides, intervalMs = 5000 }: SheqImageSlideshowProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, intervalMs)
    return () => window.clearInterval(timer)
  }, [slides.length, intervalMs])

  if (slides.length === 0) return null

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const next = () => setIndex((i) => (i + 1) % slides.length)

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm dark:border-white/10 dark:bg-slate-900/60">
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          className={`object-cover object-center transition-opacity duration-500 ${i === index ? 'opacity-100' : 'opacity-0'}`}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={i === 0}
        />
      ))}

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/55 px-2.5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-slate-900/75"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/55 px-2.5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-slate-900/75"
          >
            ›
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
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
