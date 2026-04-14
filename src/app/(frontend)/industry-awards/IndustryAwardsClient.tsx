'use client'

import { cn } from '@/utilities/ui'
import { Award, Calendar, Search, Star, Trophy, Building2 } from 'lucide-react'
import React, { useMemo, useState } from 'react'

import type { AwardItem } from './page'

const CATEGORY_LABELS: Record<string, string> = {
  quality: 'Quality & Excellence',
  safety: 'Safety & Environment',
  innovation: 'Innovation',
  export: 'Export & Trade',
  community: 'Community & CSR',
  leadership: 'Industry Leadership',
  other: 'Other',
}

const CATEGORY_COLORS: Record<string, string> = {
  quality: 'bg-emerald-600',
  safety: 'bg-amber-600',
  innovation: 'bg-violet-600',
  export: 'bg-cyan-600',
  community: 'bg-pink-600',
  leadership: 'bg-blue-600',
  other: 'bg-slate-600',
}

export function IndustryAwardsClient({ items }: { items: AwardItem[] }) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeYear, setActiveYear] = useState<number | null>(null)

  const categories = useMemo(() => {
    const cats = new Set(items.map((i) => i.category).filter(Boolean) as string[])
    return Array.from(cats).sort()
  }, [items])

  const years = useMemo(() => {
    const yrs = new Set(items.map((i) => i.year))
    return Array.from(yrs).sort((a, b) => b - a)
  }, [items])

  const filtered = useMemo(() => {
    let result = items
    if (activeCategory) result = result.filter((i) => i.category === activeCategory)
    if (activeYear) result = result.filter((i) => i.year === activeYear)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.awardingBody.toLowerCase().includes(q) ||
          i.summary.toLowerCase().includes(q),
      )
    }
    const featured = result.filter((i) => i.featured)
    const rest = result.filter((i) => !i.featured)
    return [...featured, ...rest]
  }, [items, activeCategory, activeYear, search])

  return (
    <article className="min-h-screen bg-slate-950 pb-20 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-slate-900/50 px-4 py-16 text-center">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
          <Trophy className="size-96" />
        </div>
        <div className="relative">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-amber-500/20">
            <Trophy className="size-8 text-amber-400" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Industry Awards</h1>
          <p className="mx-auto mt-3 max-w-xl text-white/60">
            Recognitions and achievements that reflect Chilmund Chemicals&apos; commitment to
            quality, safety, innovation and community.
          </p>
        </div>
      </section>

      <div className="container px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          {/* Main */}
          <div className="space-y-8">
            {/* Filter pills */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => { setActiveCategory(null); setActiveYear(null) }}
                className={cn(
                  'rounded-full px-5 py-2 text-sm font-semibold transition-colors',
                  !activeCategory && !activeYear
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white',
                )}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => { setActiveCategory(c === activeCategory ? null : c); setActiveYear(null) }}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                    activeCategory === c
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white',
                  )}
                >
                  {CATEGORY_LABELS[c] || c}
                </button>
              ))}
            </div>

            {/* Awards grid */}
            {filtered.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {filtered.map((item) => (
                  <AwardCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-white/10 bg-white/5 py-16 text-center">
                <Search className="mx-auto size-10 text-white/30" />
                <p className="mt-4 text-lg font-semibold text-white/60">No awards found</p>
                <p className="mt-1 text-sm text-white/40">Try adjusting your search or filter.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Search */}
            <SidebarCard title="Search" icon={<Search className="size-4" />}>
              <input
                type="text"
                placeholder="Search awards..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
              />
            </SidebarCard>

            {/* Years */}
            {years.length > 0 && (
              <SidebarCard title="By Year" icon={<Calendar className="size-4" />}>
                <div className="flex flex-wrap gap-2">
                  {years.map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => { setActiveYear(y === activeYear ? null : y); setActiveCategory(null) }}
                      className={cn(
                        'rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors',
                        activeYear === y
                          ? 'bg-blue-600 text-white'
                          : 'bg-white/10 text-white/60 hover:bg-white/15 hover:text-white',
                      )}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </SidebarCard>
            )}

            {/* Stats */}
            <SidebarCard title="Summary" icon={<Award className="size-4" />}>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Total awards</span>
                  <span className="font-bold text-white">{items.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Categories</span>
                  <span className="font-bold text-white">{categories.length}</span>
                </div>
                {years[0] && (
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Latest</span>
                    <span className="font-bold text-white">{years[0]}</span>
                  </div>
                )}
              </div>
            </SidebarCard>
          </aside>
        </div>
      </div>
    </article>
  )
}

function SidebarCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/80 p-5">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-400">
        {icon}
        {title}
      </h3>
      {children}
    </div>
  )
}

function AwardCard({ item }: { item: AwardItem }) {
  const catColor = item.category ? (CATEGORY_COLORS[item.category] || 'bg-slate-600') : 'bg-slate-600'
  const catLabel = item.category ? (CATEGORY_LABELS[item.category] || item.category) : null

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-900/60 transition-colors hover:border-white/20">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-amber-900/30 to-slate-900">
            <Trophy className="size-16 text-amber-500/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex gap-2">
          {catLabel && (
            <span className={cn('rounded-md px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm', catColor)}>
              {catLabel}
            </span>
          )}
          {item.featured && (
            <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/90 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              <Star className="size-3" />
              Featured
            </span>
          )}
        </div>

        {/* Year badge */}
        <div className="absolute bottom-3 right-3">
          <span className="rounded-lg bg-black/60 px-3 py-1 text-lg font-extrabold text-amber-400 backdrop-blur-sm">
            {item.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-white transition-colors group-hover:text-blue-400 line-clamp-2">
          {item.title}
        </h3>
        <div className="mt-2 flex items-center gap-1.5 text-sm text-white/50">
          <Building2 className="size-3.5 shrink-0" />
          <span className="line-clamp-1">{item.awardingBody}</span>
        </div>
        {item.summary && (
          <p className="mt-3 text-sm text-white/50 line-clamp-3">{item.summary}</p>
        )}
      </div>
    </div>
  )
}
