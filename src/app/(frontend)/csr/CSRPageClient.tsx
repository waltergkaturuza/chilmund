'use client'

import { ImageSlideshow } from '@/components/ImageSlideshow/ImageSlideshow'
import { csrHighlightSlides } from '@/content/csrHighlightSlides'
import { cn } from '@/utilities/ui'
import { innerHeroRadialSection } from '@/utilities/pageHero'
import {
  Calendar,
  Droplets,
  GraduationCap,
  HandHeart,
  Heart,
  Leaf,
  MapPin,
  Search,
  Sparkles,
  Star,
  Users,
  Briefcase,
  Images,
} from 'lucide-react'
import React, { useMemo, useState } from 'react'

import type { CSRItem } from './page'
import { ImpactCard } from './ImpactSection'

const CATEGORY_META: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  community: { label: 'Community Development', icon: <HandHeart className="size-4" />, color: 'bg-rose-600' },
  education: { label: 'Education & Training', icon: <GraduationCap className="size-4" />, color: 'bg-blue-600' },
  environment: { label: 'Environment & Sustainability', icon: <Leaf className="size-4" />, color: 'bg-emerald-600' },
  health: { label: 'Health & Wellness', icon: <Heart className="size-4" />, color: 'bg-red-600' },
  water: { label: 'Water & Sanitation', icon: <Droplets className="size-4" />, color: 'bg-cyan-600' },
  youth: { label: 'Youth Empowerment', icon: <Users className="size-4" />, color: 'bg-violet-600' },
  employee: { label: 'Employee Welfare', icon: <Briefcase className="size-4" />, color: 'bg-amber-600' },
  other: { label: 'Other', icon: <Sparkles className="size-4" />, color: 'bg-slate-600' },
}

function catMeta(key: string) {
  return CATEGORY_META[key] || CATEGORY_META.other!
}

export function CSRPageClient({ items }: { items: CSRItem[] }) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = useMemo(() => {
    const cats = new Set(items.map((i) => i.category))
    return Array.from(cats).sort()
  }, [items])

  const filtered = useMemo(() => {
    let result = items
    if (activeCategory) result = result.filter((i) => i.category === activeCategory)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.summary.toLowerCase().includes(q) ||
          (i.location || '').toLowerCase().includes(q),
      )
    }
    const featured = result.filter((i) => i.featured)
    const rest = result.filter((i) => !i.featured)
    return [...featured, ...rest]
  }, [items, activeCategory, search])

  const featuredItem = filtered.find((i) => i.featured)
  const rest = filtered.filter((i) => i !== featuredItem)

  return (
    <article className="min-h-screen bg-slate-50 pb-20 text-slate-900 dark:bg-slate-950 dark:text-white">
      <section className={innerHeroRadialSection}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/35 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/45 to-transparent" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Corporate Social Responsibility
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            Making a positive impact in our communities through education, environment,
            health, and youth empowerment programmes.
          </p>
        </div>
      </section>

      <div id="csr-programmes" className="scroll-mt-24 border-b border-slate-200 bg-white py-10 dark:border-white/10 dark:bg-slate-950">
        <div className="container px-4">
          <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          {/* Main */}
          <div className="space-y-8">
            {/* Category filter pills */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className={cn(
                  'rounded-full px-5 py-2 text-sm font-semibold transition-colors',
                  !activeCategory
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/15 dark:hover:text-white',
                )}
              >
                All
              </button>
              {categories.map((c) => {
                const meta = catMeta(c)
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveCategory(c === activeCategory ? null : c)}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                      activeCategory === c
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/15 dark:hover:text-white',
                    )}
                  >
                    {meta.icon}
                    {meta.label}
                  </button>
                )
              })}
            </div>

            {csrHighlightSlides.length > 0 && (
              <div className="rounded-xl border border-slate-200 bg-slate-50/90 p-6 dark:border-white/10 dark:bg-slate-900/50 sm:p-8">
                <h2 className="text-center text-lg font-extrabold text-slate-900 dark:text-white sm:text-xl">
                  CSR in focus
                </h2>
                <div className="mt-4 w-full">
                  <ImageSlideshow
                    slides={csrHighlightSlides}
                    controlsOnLight
                    imageFit="contain"
                    intervalMs={6500}
                    sizes="(max-width: 1024px) 100vw, min(100%, 72rem)"
                    className="relative h-[min(46vh,400px)] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-inner dark:border-white/10 dark:bg-slate-950 sm:h-[min(48vh,440px)]"
                  />
                </div>
              </div>
            )}

            {/* Featured hero card */}
            {featuredItem && <FeaturedCard item={featuredItem} />}

            {/* Grid */}
            {rest.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {rest.map((item) => (
                  <CSRCard key={item.id} item={item} />
                ))}
              </div>
            ) : !featuredItem ? (
              <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-slate-50 py-16 text-center dark:border-white/10 dark:bg-white/5">
                <Search className="size-10 text-slate-400 dark:text-white/30" aria-hidden />
                <p className="mt-4 text-lg font-semibold !text-center text-slate-700 dark:text-white/60">
                  No initiatives found
                </p>
                <p className="mt-1 text-sm !text-center text-slate-500 dark:text-white/40">
                  Try adjusting your search or filter.
                </p>
              </div>
            ) : null}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Search */}
            <SidebarCard title="Search" icon={<Search className="size-4" />}>
              <input
                type="text"
                placeholder="Search initiatives..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40"
              />
            </SidebarCard>

            {/* Categories */}
            <SidebarCard title="Focus areas" icon={<HandHeart className="size-4" />}>
              <div className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => setActiveCategory(null)}
                  className={cn(
                    'block w-full rounded-md px-3 py-2 text-left text-sm transition-colors',
                    !activeCategory
                      ? 'bg-blue-100 font-semibold text-blue-700 dark:bg-blue-600/20 dark:text-blue-400'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white',
                  )}
                >
                  All ({items.length})
                </button>
                {categories.map((c) => {
                  const meta = catMeta(c)
                  const count = items.filter((i) => i.category === c).length
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setActiveCategory(c === activeCategory ? null : c)}
                      className={cn(
                        'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors',
                        activeCategory === c
                          ? 'bg-blue-100 font-semibold text-blue-700 dark:bg-blue-600/20 dark:text-blue-400'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white',
                      )}
                    >
                      {meta.icon}
                      {meta.label}
                      <span className="ml-auto text-xs text-slate-400 dark:text-white/30">{count}</span>
                    </button>
                  )
                })}
              </div>
            </SidebarCard>

            {/* Impact summary */}
            <SidebarCard title="Our commitment" icon={<Heart className="size-4" />}>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-white/50">
                Chilmund Chemicals is committed to sustainable development and giving back to
                the communities where we operate. Our CSR programmes focus on education, clean water,
                environmental stewardship, and youth empowerment.
              </p>
            </SidebarCard>

            <ImpactCard />
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

function FeaturedCard({ item }: { item: CSRItem }) {
  const meta = catMeta(item.category)
  const date = item.date ? new Date(item.date) : null

  return (
    <div className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-colors hover:border-slate-300 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-none dark:hover:border-white/20">
      {item.image && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute left-4 top-4 flex gap-2">
            <span className={cn('inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm', meta.color)}>
              {meta.icon}
              {meta.label}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/90 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              <Star className="size-3" />
              Featured
            </span>
          </div>
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-white/50">
          {date && (
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          )}
          {item.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              {item.location}
            </span>
          )}
          {item.galleryCount > 0 && (
            <span className="flex items-center gap-1.5">
              <Images className="size-3.5" />
              {item.galleryCount} photos
            </span>
          )}
        </div>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {item.title}
        </h2>
        {item.summary && (
          <p className="mt-3 line-clamp-3 text-slate-600 dark:text-white/60">{item.summary}</p>
        )}
        {item.impact && (
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-500/20 dark:bg-emerald-500/10">
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              <Sparkles className="mr-1.5 inline size-4" />
              {item.impact}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function CSRCard({ item }: { item: CSRItem }) {
  const meta = catMeta(item.category)
  const date = item.date ? new Date(item.date) : null

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-colors hover:border-slate-300 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-none dark:hover:border-white/20">
      <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-emerald-100 to-slate-100 dark:from-emerald-900/30 dark:to-slate-900">
            <HandHeart className="size-16 text-emerald-500/35 dark:text-emerald-500/30" />
          </div>
        )}
        <div className="absolute left-3 top-3">
          <span className={cn('inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[0.65rem] font-semibold text-white backdrop-blur-sm', meta.color)}>
            {meta.icon}
            {meta.label}
          </span>
        </div>
        {item.galleryCount > 0 && (
          <div className="absolute bottom-3 right-3">
            <span className="inline-flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white/80 backdrop-blur-sm">
              <Images className="size-3" />
              {item.galleryCount}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-white/40">
          {date && (
            <span>{date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          )}
          {item.location && (
            <>
              <span className="text-slate-300 dark:text-white/20">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="size-3" />
                {item.location}
              </span>
            </>
          )}
        </div>
        <h3 className="mt-2 line-clamp-2 font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {item.title}
        </h3>
        {item.summary && (
          <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-white/50">{item.summary}</p>
        )}
        {item.impact && (
          <p className="mt-3 line-clamp-2 rounded-md border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800 dark:border-transparent dark:bg-emerald-500/10 dark:text-emerald-300">
            <Sparkles className="mr-1 inline size-3" />
            {item.impact}
          </p>
        )}
      </div>
    </div>
  )
}
