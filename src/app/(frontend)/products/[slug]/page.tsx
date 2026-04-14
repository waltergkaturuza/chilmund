import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

import RichText from '@/components/RichText'
import { ProductEnquiryBar } from '@/components/ProductEnquiryBar'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { generateMeta } from '@/utilities/generateMeta'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

type Args = {
  params: Promise<{ slug?: string }>
}

const queryProductBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'products',
    depth: 2,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })
  return result.docs[0] || null
})

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'products',
    limit: 500,
    overrideAccess: true,
    pagination: false,
    select: { slug: true },
    where: { published: { equals: true } },
  })
  return docs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const product = await queryProductBySlug(decodeURIComponent(slug))
  if (!product) return { title: 'Product | Chilmund Chemicals' }
  return generateMeta({
    doc: product,
    path: `/products/${product.slug}`,
  })
}

export default async function ProductDetailPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const product = await queryProductBySlug(decodeURIComponent(slug))

  if (!product || !product.published) notFound()

  const contact = await getCachedGlobal('company-contact', 0)()

  const hero = product.heroImage
  const heroSrc =
    hero && typeof hero === 'object' && 'url' in hero && typeof hero.url === 'string' ? hero.url : null

  const sheet = product.datasheet
  const sheetHref =
    sheet && typeof sheet === 'object' && 'url' in sheet && typeof sheet.url === 'string'
      ? sheet.url
      : null

  return (
    <article className="pb-28 pt-10 md:pt-14">
      <div className="container max-w-3xl">
        <Link className="text-sm font-semibold text-blue-800 hover:text-blue-900" href="/products">
          ← All products
        </Link>
        {product.category ? (
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-800/80">
            {product.category.replace(/-/g, ' ')}
          </p>
        ) : null}
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          {product.title}
        </h1>
        {product.shortDescription ? (
          <p className="mt-4 text-lg text-slate-600">{product.shortDescription}</p>
        ) : null}

        {heroSrc ? (
          <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            <Image
              alt={product.title}
              className="object-cover"
              fill
              priority
              src={heroSrc}
              sizes="(max-width:768px) 100vw, 42rem"
            />
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          {sheetHref ? (
            <a
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:border-blue-600 hover:text-blue-950"
              href={sheetHref}
              rel="noopener noreferrer"
              target="_blank"
            >
              Download datasheet (PDF)
            </a>
          ) : null}
        </div>

        <div className="prose prose-slate mt-10 max-w-none">
          <RichText data={product.content as DefaultTypedEditorState} enableGutter={false} />
        </div>
      </div>

      <ProductEnquiryBar productTitle={product.title} salesEmail={contact?.salesEmail} />
    </article>
  )
}
