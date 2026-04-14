import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { IndustryAwardsClient } from './IndustryAwardsClient'

export const metadata: Metadata = {
  title: 'Industry Awards | Chilmund Chemicals',
  description:
    'Explore Chilmund Chemicals\' industry awards, recognitions and achievements across quality, safety, innovation and more.',
}

type MediaDoc = { url?: string | null; sizes?: Record<string, { url?: string | null }> | null }

function resolveImage(media: unknown): string | null {
  if (!media || typeof media !== 'object') return null
  const m = media as MediaDoc
  return m.sizes?.medium?.url || m.sizes?.small?.url || m.url || null
}

export type AwardItem = {
  id: string
  title: string
  slug: string
  year: number
  awardingBody: string
  category: string | null
  image: string | null
  summary: string
  featured: boolean
  hasContent: boolean
}

export default async function IndustryAwardsPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'industry-awards',
    where: { _status: { equals: 'published' } },
    sort: '-awardYear',
    limit: 200,
    depth: 1,
  })

  const items: AwardItem[] = docs.map((doc) => ({
    id: String(doc.id),
    title: doc.title,
    slug: doc.slug || '',
    year: doc.awardYear,
    awardingBody: doc.awardingBody,
    category: doc.category || null,
    image: resolveImage(doc.image),
    summary: doc.summary || '',
    featured: doc.featured ?? false,
    hasContent: !!doc.content,
  }))

  return <IndustryAwardsClient items={items} />
}
