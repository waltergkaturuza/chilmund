'use client'

import { cn } from '@/utilities/ui'
import {
  Award,
  Download,
  ExternalLink,
  FileText,
  Film,
  Image as ImageIcon,
  LayoutGrid,
  Presentation,
  Search,
  Star,
  Table,
} from 'lucide-react'
import React, { useMemo, useState } from 'react'

import type { ResourceItem } from './page'

const TYPE_META: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  certificate: { label: 'Certificate', icon: <Award className="size-4" />, color: 'bg-emerald-600' },
  document: { label: 'Document', icon: <FileText className="size-4" />, color: 'bg-blue-600' },
  infographic: { label: 'Infographic', icon: <LayoutGrid className="size-4" />, color: 'bg-violet-600' },
  video: { label: 'Video', icon: <Film className="size-4" />, color: 'bg-red-600' },
  image: { label: 'Image', icon: <ImageIcon className="size-4" />, color: 'bg-amber-600' },
  brochure: { label: 'Brochure', icon: <FileText className="size-4" />, color: 'bg-cyan-600' },
  datasheet: { label: 'Datasheet', icon: <Table className="size-4" />, color: 'bg-indigo-600' },
  presentation: { label: 'Presentation', icon: <Presentation className="size-4" />, color: 'bg-pink-600' },
  other: { label: 'Other', icon: <FileText className="size-4" />, color: 'bg-slate-600' },
}

function typeMeta(key: string) {
  return TYPE_META[key] || TYPE_META.other!
}

export function ResourcesPageClient({ items }: { items: ResourceItem[] }) {
  const [search, setSearch] = useState('')
  const [activeType, setActiveType] = useState<string | null>(null)

  const availableTypes = useMemo(() => {
    const types = new Set(items.map((i) => i.resourceType))
    return Array.from(types).sort()
  }, [items])

  const filtered = useMemo(() => {
    let result = items
    if (activeType) result = result.filter((i) => i.resourceType === activeType)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          typeMeta(i.resourceType).label.toLowerCase().includes(q),
      )
    }
    const featured = result.filter((i) => i.featured)
    const rest = result.filter((i) => !i.featured)
    return [...featured, ...rest]
  }, [items, activeType, search])

  return (
    <article className="min-h-screen bg-slate-950 pb-20 text-white">
      {/* Hero */}
      <section className="border-b border-white/10 bg-slate-900/50 px-4 py-14 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Resources</h1>
        <p className="mx-auto mt-3 max-w-xl text-white/60">
          Download certificates, documents, infographics, brochures and more.
        </p>
      </section>

      <div className="container px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          {/* Main */}
          <div className="space-y-8">
            {/* Type filter pills */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveType(null)}
                className={cn(
                  'rounded-full px-5 py-2 text-sm font-semibold transition-colors',
                  !activeType
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white',
                )}
              >
                All
              </button>
              {availableTypes.map((t) => {
                const meta = typeMeta(t)
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setActiveType(t === activeType ? null : t)}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                      activeType === t
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white',
                    )}
                  >
                    {meta.icon}
                    {meta.label}
                  </button>
                )
              })}
            </div>

            {/* Resource cards */}
            {filtered.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((item) => (
                  <ResourceCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-white/10 bg-white/5 py-16 text-center">
                <Search className="mx-auto size-10 text-white/30" />
                <p className="mt-4 text-lg font-semibold text-white/60">No resources found</p>
                <p className="mt-1 text-sm text-white/40">Try adjusting your search or filter.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Search */}
            <div className="rounded-xl border border-white/10 bg-slate-900/80 p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-400">
                <Search className="size-4" />
                Search
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                />
              </div>
            </div>

            {/* Types legend */}
            <div className="rounded-xl border border-white/10 bg-slate-900/80 p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-400">
                <LayoutGrid className="size-4" />
                Categories
              </h3>
              <div className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => setActiveType(null)}
                  className={cn(
                    'block w-full rounded-md px-3 py-2 text-left text-sm transition-colors',
                    !activeType
                      ? 'bg-blue-600/20 font-semibold text-blue-400'
                      : 'text-white/60 hover:bg-white/5 hover:text-white',
                  )}
                >
                  All ({items.length})
                </button>
                {availableTypes.map((t) => {
                  const meta = typeMeta(t)
                  const count = items.filter((i) => i.resourceType === t).length
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setActiveType(t === activeType ? null : t)}
                      className={cn(
                        'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors',
                        activeType === t
                          ? 'bg-blue-600/20 font-semibold text-blue-400'
                          : 'text-white/60 hover:bg-white/5 hover:text-white',
                      )}
                    >
                      {meta.icon}
                      {meta.label}
                      <span className="ml-auto text-xs text-white/30">{count}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}

function ResourceCard({ item }: { item: ResourceItem }) {
  const meta = typeMeta(item.resourceType)
  const isVideo = item.resourceType === 'video' && item.videoUrl

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-900/60 transition-colors hover:border-white/20">
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
        {item.thumbnailUrl ? (
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <div className="text-white/20">{meta.icon}</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

        {/* Type badge */}
        <div className="absolute left-3 top-3 flex gap-2">
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm',
              meta.color,
            )}
          >
            {meta.icon}
            {meta.label}
          </span>
          {item.featured && (
            <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/90 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              <Star className="size-3" />
              Featured
            </span>
          )}
        </div>

        {/* Video play overlay */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-transform group-hover:scale-110">
              <Film className="size-6 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-bold text-white transition-colors group-hover:text-blue-400 line-clamp-2">
          {item.title}
        </h3>
        {item.description && (
          <p className="mt-2 text-sm text-white/50 line-clamp-2">{item.description}</p>
        )}

        {/* Actions */}
        <div className="mt-auto flex items-center gap-2 pt-4">
          {isVideo ? (
            <a
              href={item.videoUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500"
            >
              <Film className="size-3.5" />
              Watch
            </a>
          ) : item.downloadUrl ? (
            <a
              href={item.downloadUrl}
              download={item.filename || true}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              <Download className="size-3.5" />
              Download
            </a>
          ) : null}

          {item.downloadUrl && !isVideo && (
            <a
              href={item.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/15 hover:text-white"
            >
              <ExternalLink className="size-3.5" />
              View
            </a>
          )}

          {item.fileSize && (
            <span className="ml-auto text-xs text-white/30">{item.fileSize}</span>
          )}
        </div>
      </div>
    </div>
  )
}
