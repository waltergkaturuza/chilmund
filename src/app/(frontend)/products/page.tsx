import type { Metadata } from 'next'
import configPromise from '@payload-config'
import type { Where } from 'payload'
import { getPayload } from 'payload'
import React, { Suspense } from 'react'

import { ProductCard } from './ProductCard'
import { ProductsSearchForm } from './ProductsSearchForm'

export const metadata: Metadata = {
  title: 'Products | Chilmund Chemicals',
  description: 'Industrial and agricultural chemicals — browse products and download datasheets.',
}

type Props = {
  searchParams: Promise<{ q?: string }>
}

export default async function ProductsCatalogPage({ searchParams }: Props) {
  const { q } = await searchParams
  const query = typeof q === 'string' ? q.trim() : ''
  const payload = await getPayload({ config: configPromise })

  const where: Where = query
    ? {
        and: [
          { published: { equals: true } },
          {
            or: [
              { title: { contains: query } },
              { shortDescription: { contains: query } },
            ],
          },
        ],
      }
    : { published: { equals: true } }

  const { docs } = await payload.find({
    collection: 'products',
    depth: 0,
    limit: 200,
    overrideAccess: false,
    pagination: false,
    select: {
      title: true,
      slug: true,
      shortDescription: true,
      category: true,
    },
    sort: 'title',
    where,
  })

  return (
    <main className="bg-[linear-gradient(180deg,oklch(98%_0.01_95deg)_0%,oklch(96%_0.02_250deg)_100%)] pb-24 pt-10 md:pt-14">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800/80">Catalog</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Products &amp; services
          </h1>
          <p className="mt-3 text-slate-600">
            Search the range, open a product for full details, and download PDF datasheets when available.
          </p>
          <div className="mt-8 flex justify-center">
            <Suspense fallback={null}>
              <ProductsSearchForm />
            </Suspense>
          </div>
        </div>

        {docs.length === 0 ? (
          <p className="mx-auto mt-16 max-w-md text-center text-slate-600">
            {query
              ? `No products match “${query}”. Try another search or clear the filter.`
              : 'No published products yet. Add products in the CMS under Website content → Products.'}
          </p>
        ) : (
          <ul className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {docs.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
