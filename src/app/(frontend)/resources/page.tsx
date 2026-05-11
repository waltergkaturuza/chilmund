import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { staticLibraryDocuments } from '@/content/staticLibraryDocuments'

import { ResourcesPageClient } from './ResourcesPageClient'

export const metadata: Metadata = {
  title: 'Resources | Chilmund Chemicals',
  description:
    'Browse and download certificates, documents, infographics, videos and more from Chilmund Chemicals.',
}

type MediaDoc = {
  url?: string | null
  filename?: string | null
  mimeType?: string | null
  sizes?: Record<string, { url?: string | null }> | null
}

function resolveImageUrl(media: unknown): string | null {
  if (!media || typeof media !== 'object') return null
  const m = media as MediaDoc
  return m.sizes?.medium?.url || m.sizes?.small?.url || m.url || null
}

function resolveDownloadUrl(media: unknown): string | null {
  if (!media || typeof media !== 'object') return null
  return (media as MediaDoc).url || null
}

function resolveFilename(media: unknown): string | null {
  if (!media || typeof media !== 'object') return null
  return (media as MediaDoc).filename || null
}

export type ResourceItem = {
  id: string
  title: string
  resourceType: string
  description: string
  downloadUrl: string | null
  filename: string | null
  thumbnailUrl: string | null
  videoUrl: string | null
  fileSize: string | null
  featured: boolean
  publishedAt: string | null
}

export default async function ResourcesPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'resources',
    where: { _status: { equals: 'published' } },
    sort: '-createdAt',
    limit: 200,
    depth: 1,
  })

  const cmsItems: ResourceItem[] = docs.map((doc) => ({
    id: String(doc.id),
    title: doc.title,
    resourceType: doc.resourceType,
    description: doc.description || '',
    downloadUrl: resolveDownloadUrl(doc.file),
    filename: resolveFilename(doc.file),
    thumbnailUrl: resolveImageUrl(doc.thumbnail) || resolveImageUrl(doc.file),
    videoUrl: doc.videoUrl || null,
    fileSize: doc.fileSize || null,
    featured: doc.featured ?? false,
    publishedAt: (doc.publishedAt as string) || doc.createdAt,
  }))

  const staticItems: ResourceItem[] = staticLibraryDocuments.map((d) => ({
    id: `static:${d.slug}`,
    title: d.title,
    resourceType: d.resourceType,
    description: d.description,
    downloadUrl: d.href,
    filename: d.href.split('/').pop() || null,
    thumbnailUrl: null,
    videoUrl: null,
    fileSize: d.fileSize,
    featured: d.featured,
    publishedAt: null,
  }))

  const items = [...staticItems, ...cmsItems]

  return <ResourcesPageClient items={items} />
}
