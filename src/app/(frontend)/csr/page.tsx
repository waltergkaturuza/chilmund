import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CSRPageClient } from './CSRPageClient'

export const metadata: Metadata = {
  title: 'Corporate Social Responsibility | Chilmund Chemicals',
  description:
    'Discover how Chilmund Chemicals gives back to communities through education, environment, health and youth empowerment programmes.',
}

type MediaDoc = { url?: string | null; sizes?: Record<string, { url?: string | null }> | null }

function resolveImage(media: unknown): string | null {
  if (!media || typeof media !== 'object') return null
  const m = media as MediaDoc
  return m.sizes?.medium?.url || m.sizes?.small?.url || m.url || null
}

export type CSRItem = {
  id: string
  title: string
  slug: string
  category: string
  date: string | null
  location: string | null
  image: string | null
  summary: string
  impact: string | null
  featured: boolean
  galleryCount: number
  hasContent: boolean
}

export default async function CSRPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'csr-initiatives',
    where: { _status: { equals: 'published' } },
    sort: '-createdAt',
    limit: 200,
    depth: 1,
  })

  const items: CSRItem[] = docs.map((doc) => ({
    id: String(doc.id),
    title: doc.title,
    slug: doc.slug || '',
    category: doc.category,
    date: (doc.date as string) || null,
    location: doc.location || null,
    image: resolveImage(doc.heroImage),
    summary: doc.summary || '',
    impact: doc.impact || null,
    featured: doc.featured ?? false,
    galleryCount: doc.gallery?.length ?? 0,
    hasContent: !!doc.content,
  }))

  return <CSRPageClient items={items} />
}
