import Link from 'next/link'
import React from 'react'

import type { Product } from '@/payload-types'

export function ProductCard({ product }: { product: Pick<Product, 'slug' | 'title' | 'shortDescription' | 'category'> }) {
  return (
    <Link
      className="group flex flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-shadow hover:border-blue-500/60 hover:shadow-md"
      href={`/products/${product.slug}`}
    >
      {product.category ? (
        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700/90">
          {product.category.replace(/-/g, ' ')}
        </span>
      ) : null}
      <h2 className="mt-2 text-lg font-semibold tracking-tight text-slate-900 group-hover:text-blue-900">
        {product.title}
      </h2>
      {product.shortDescription ? (
        <p className="mt-2 line-clamp-3 text-sm text-slate-600">{product.shortDescription}</p>
      ) : null}
      <span className="mt-4 text-sm font-semibold text-blue-700">View product →</span>
    </Link>
  )
}
