'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const PRODUCT_SLIDES = [
  {
    src: '/manufacturing/aluminium-sulphate-product-bags.png',
    alt: 'Stacks of Chilmund Chemicals branded 50 kg bags of aluminium sulphate in warehouse storage, showing product name and grade markings.',
  },
  {
    src: '/product1.jpeg',
    alt: 'Granular aluminium sulphate product packaging at Chilmund Chemicals.',
  },
  {
    src: '/product2.jpeg',
    alt: 'Additional aluminium sulphate product presentation from Chilmund Chemicals.',
  },
] as const

export function ProductImageSlideshow() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (PRODUCT_SLIDES.length <= 1) return
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % PRODUCT_SLIDES.length)
    }, 4500)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="relative aspect-[4/3] w-full min-h-[260px] shrink-0 overflow-hidden lg:min-h-[380px]">
      {PRODUCT_SLIDES.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          className={`object-cover object-center transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={i === 0}
        />
      ))}

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {PRODUCT_SLIDES.map((slide, i) => (
          <button
            key={`${slide.src}-dot`}
            type="button"
            aria-label={`Show product image ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`size-2.5 rounded-full border border-white/70 transition-colors ${i === index ? 'bg-white' : 'bg-white/35 hover:bg-white/60'}`}
          />
        ))}
      </div>
    </div>
  )
}
