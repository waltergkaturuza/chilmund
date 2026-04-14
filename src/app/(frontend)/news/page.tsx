import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { NewsPageClient } from './NewsPageClient'

export const dynamic = 'force-static'
export const revalidate = 600

export const metadata: Metadata = {
  title: 'News & Events | Chilmund Chemicals',
  description: 'Latest news, industry events, award ceremonies, and CSR activities from Chilmund Chemicals.',
}

export default async function NewsPage() {
  const payload = await getPayload({ config: configPromise })

  const now = new Date().toISOString()

  const [posts, events, categories] = await Promise.all([
    payload.find({
      collection: 'posts',
      depth: 1,
      limit: 50,
      overrideAccess: false,
      sort: '-publishedAt',
      select: {
        title: true,
        slug: true,
        categories: true,
        meta: true,
        publishedAt: true,
        heroImage: true,
      },
    }),
    payload.find({
      collection: 'events',
      depth: 1,
      limit: 50,
      overrideAccess: false,
      sort: '-eventDate',
      select: {
        title: true,
        slug: true,
        eventDate: true,
        endDate: true,
        venue: true,
        eventType: true,
        summary: true,
        heroImage: true,
        registrationUrl: true,
      },
    }),
    payload.find({
      collection: 'categories',
      limit: 50,
      overrideAccess: false,
      sort: 'title',
    }),
  ])

  const newsItems = posts.docs.map((p: any) => ({
    id: p.id,
    type: 'post' as const,
    title: p.title || '',
    slug: p.slug || '',
    date: p.publishedAt || p.createdAt || '',
    image: typeof p.heroImage === 'object' && p.heroImage?.url ? p.heroImage.url : (typeof p.meta?.image === 'object' && p.meta?.image?.url ? p.meta.image.url : null),
    excerpt: p.meta?.description || '',
    categories: Array.isArray(p.categories)
      ? p.categories.map((c: any) => (typeof c === 'object' ? c.title : '')).filter(Boolean)
      : [],
    href: `/posts/${p.slug}`,
  }))

  const eventItems = events.docs.map((e: any) => ({
    id: e.id,
    type: 'event' as const,
    title: e.title || '',
    slug: e.slug || '',
    date: e.eventDate || '',
    image: typeof e.heroImage === 'object' && e.heroImage?.url ? e.heroImage.url : null,
    excerpt: e.summary || '',
    venue: e.venue || '',
    eventType: e.eventType || '',
    registrationUrl: e.registrationUrl || '',
    categories: e.eventType ? [e.eventType] : [],
    href: `/events/${e.slug}`,
    isUpcoming: e.eventDate ? new Date(e.eventDate) >= new Date(now) : false,
  }))

  const allCategories = categories.docs.map((c: any) => c.title as string).filter(Boolean)

  return (
    <NewsPageClient
      newsItems={newsItems}
      eventItems={eventItems}
      categories={allCategories}
    />
  )
}
