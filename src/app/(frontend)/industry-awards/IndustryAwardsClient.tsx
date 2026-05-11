'use client'

import { ImageSlideshow } from '@/components/ImageSlideshow/ImageSlideshow'
import { industryAwardsSlideshowSlides } from '@/content/industryAwardsSlideshowSlides'
import { cn } from '@/utilities/ui'
import { innerHeroRadialSection } from '@/utilities/pageHero'
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
    <article className="min-h-screen bg-slate-50 pb-20 text-slate-900 dark:bg-slate-950 dark:text-white">
      <section className={innerHeroRadialSection}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/35 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-500/45 to-transparent" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
          <p className="mx-auto max-w-xl text-center text-[0.8125rem] font-semibold uppercase leading-snug tracking-[0.16em] text-amber-400/95 sm:text-sm sm:tracking-[0.18em]">
            Awards &amp; recognition
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Industry Awards
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            Recognitions and achievements that reflect Chilmund Chemicals&apos; commitment to
            quality, safety, innovation and community.
          </p>
        </div>
      </section>

      <div className="border-b border-slate-200 bg-white py-10 dark:border-white/10 dark:bg-slate-950">
        <div className="container px-4">
          {/* Highlight reel — same certificate assets as site gallery, with narrations */}
          <div className="mb-10 rounded-2xl border border-slate-200 bg-slate-50/90 p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/50 sm:p-8">
            <h2 className="text-center text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
              Award highlights
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-center text-sm leading-relaxed text-slate-600 dark:text-white/60">
              Certificates and trophies behind our industry story — browse with the arrows or dots. Structured award
              entries from the CMS appear below when published.
            </p>
            <div className="mx-auto mt-6 max-w-xl sm:max-w-2xl">
              <ImageSlideshow
                slides={industryAwardsSlideshowSlides}
                controlsOnLight
                imageFit="contain"
                intervalMs={6500}
                sizes="(max-width: 1024px) 100vw, 42rem"
                className="relative h-[min(38vh,320px)] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-inner dark:border-white/10 dark:bg-slate-950 sm:h-[min(40vh,360px)] lg:h-[min(44vh,400px)]"
              />
            </div>
          </div>

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
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/15 dark:hover:text-white',
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
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/15 dark:hover:text-white',
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
              <div className="rounded-xl border border-slate-200 bg-slate-50 py-16 text-center dark:border-white/10 dark:bg-white/5">
                <Search className="mx-auto size-10 text-slate-400 dark:text-white/30" />
                <p className="mt-4 text-lg font-semibold text-slate-700 dark:text-white/60">No awards found</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-white/40">Try adjusting your search or filter.</p>
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
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40"
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
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:bg-white/10 dark:text-white/60 dark:hover:bg-white/15 dark:hover:text-white',
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
                  <span className="text-slate-600 dark:text-white/60">Total awards</span>
                  <span className="font-bold text-slate-900 dark:text-white">{items.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-white/60">Categories</span>
                  <span className="font-bold text-slate-900 dark:text-white">{categories.length}</span>
                </div>
                {years[0] && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-white/60">Latest</span>
                    <span className="font-bold text-slate-900 dark:text-white">{years[0]}</span>
                  </div>
                )}
              </div>
            </SidebarCard>
          </aside>
          </div>
        </div>
      </div>
    </article>
  )
}

function SidebarCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-900/80">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
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
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-colors hover:border-slate-300 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-none dark:hover:border-white/20">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-amber-100 to-slate-100 dark:from-amber-900/30 dark:to-slate-900">
            <Trophy className="size-16 text-amber-500/35 dark:text-amber-500/30" />
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
        <h3 className="line-clamp-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {item.title}
        </h3>
        <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-600 dark:text-white/50">
          <Building2 className="size-3.5 shrink-0" />
          <span className="line-clamp-1">{item.awardingBody}</span>
        </div>
        {item.summary && (
          <p className="mt-3 line-clamp-3 text-sm text-slate-600 dark:text-white/50">{item.summary}</p>
        )}
      </div>
    </div>
  )
}
