'use client'

import { ImageSlideshow } from '@/components/ImageSlideshow/ImageSlideshow'
import React from 'react'

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
  return (
    <ImageSlideshow
      slides={[...PRODUCT_SLIDES]}
      className="relative aspect-[4/3] w-full min-h-[260px] shrink-0 overflow-hidden lg:min-h-[380px]"
      sizes="(max-width: 1024px) 100vw, 50vw"
    />
  )
}
