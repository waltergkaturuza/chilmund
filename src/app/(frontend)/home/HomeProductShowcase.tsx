'use client'

import Link from 'next/link'
import { ImageSlideshow } from '@/components/ImageSlideshow/ImageSlideshow'
import { homeProductHighlightSlides } from '@/content/homeProductHighlightSlides'
import { homeTrucksHighlightSlides } from '@/content/homeTrucksHighlightSlides'
import React from 'react'

export function HomeProductShowcase() {
  return (
    <section
      aria-label="Product highlights"
      className="border-b border-slate-200/90 bg-white py-12 dark:border-white/10 dark:bg-slate-950 md:py-16"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div className="min-w-0">
            <ImageSlideshow
              slides={homeProductHighlightSlides}
              intervalMs={6500}
              controlsOnLight
              imageQuality={92}
              sizes="(max-width: 1024px) 100vw, min(640px, 50vw)"
              className="relative aspect-[4/3] min-h-[280px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-lg dark:border-white/10 dark:bg-slate-900 sm:min-h-[360px] lg:min-h-[420px]"
            />
            <p className="mt-3 text-center text-sm leading-relaxed text-slate-600 dark:text-white/55">
              Explore our{' '}
              <Link
                className="text-blue-700 underline-offset-2 hover:text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                href="/product-details"
              >
                products portfolio
              </Link>
            </p>
          </div>
          <div className="min-w-0">
            <ImageSlideshow
              slides={homeTrucksHighlightSlides}
              intervalMs={6500}
              controlsOnLight
              imageQuality={92}
              sizes="(max-width: 1024px) 100vw, min(640px, 50vw)"
              className="relative aspect-[4/3] min-h-[280px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-lg dark:border-white/10 dark:bg-slate-900 sm:min-h-[360px] lg:min-h-[420px]"
            />
            <p className="mt-3 text-center text-sm leading-relaxed text-slate-600 dark:text-white/55 lg:text-left">
              After production we ensure the product lands on time at your premises through efficient{' '}
              <Link
                className="text-blue-700 underline-offset-2 hover:text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                href="/trucking-logistics"
              >
                Trucking and Logistics
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
