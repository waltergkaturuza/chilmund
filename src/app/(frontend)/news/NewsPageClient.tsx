'use client'

import { cn } from '@/utilities/ui'
import { Calendar, Clock, MapPin, Search, ArrowRight, Tag } from 'lucide-react'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'

type NewsItem = {
  id: string
  type: 'post'
  title: string
  slug: string
  date: string
  image: string | null
  excerpt: string
  categories: string[]
  href: string
}

type EventItem = {
  id: string
  type: 'event'
  title: string
  slug: string
  date: string
  image: string | null
  excerpt: string
  venue: string
  eventType: string
  registrationUrl: string
  categories: string[]
  href: string
  isUpcoming: boolean
}

type AnyItem = NewsItem | EventItem

const FILTERS = ['All', 'News', 'Upcoming Events'] as const
type Filter = (typeof FILTERS)[number]

export function NewsPageClient({
  newsItems,
  eventItems,
  categories,
}: {
  newsItems: NewsItem[]
  eventItems: EventItem[]
  categories: string[]
}) {
  const [filter, setFilter] = useState<Filter>('All')
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const allItems = useMemo(() => {
    const combined: AnyItem[] = [...newsItems, ...eventItems]
    combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    return combined
  }, [newsItems, eventItems])

  const filtered = useMemo(() => {
    let items = allItems

    if (filter === 'News') items = items.filter((i) => i.type === 'post')
    if (filter === 'Upcoming Events') items = items.filter((i) => i.type === 'event' && (i as EventItem).isUpcoming)

    if (activeCategory) {
      items = items.filter((i) => i.categories.some((c) => c.toLowerCase() === activeCategory.toLowerCase()))
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter((i) => i.title.toLowerCase().includes(q) || i.excerpt.toLowerCase().includes(q))
    }

    return items
  }, [allItems, filter, search, activeCategory])

  const recentPosts = newsItems.slice(0, 5)

  const allCategories = useMemo(() => {
    const cats = new Set<string>()
    categories.forEach((c) => cats.add(c))
    eventItems.forEach((e) => { if (e.eventType) cats.add(e.eventType) })
    if (!cats.has('Events')) cats.add('Events')
    return Array.from(cats).sort()
  }, [categories, eventItems])

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <article className="min-h-screen bg-slate-950 pb-20 pt-0 text-white">
      {/* Header */}
      <section className="border-b border-white/10 bg-slate-900/50 px-4 py-12 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">News & Events</h1>
        <p className="mx-auto mt-3 max-w-xl text-white/60">
          Stay updated with the latest from Chilmund Chemicals — industry news, events, awards, and community initiatives.
        </p>
      </section>

      <div className="container px-4 py-10">
        {/* Filter pills */}
        <div className="mb-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => { setFilter(f); setActiveCategory(null) }}
              className={cn(
                'rounded-full px-5 py-2 text-sm font-semibold transition-colors',
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white',
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Main content */}
          <div className="space-y-8">
            {/* Featured card */}
            {featured && (
              <FeaturedCard item={featured} />
            )}

            {/* Rest */}
            {rest.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2">
                {rest.map((item) => (
                  <SmallCard key={item.id} item={item} />
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="rounded-xl border border-white/10 bg-white/5 py-16 text-center">
                <Search className="mx-auto size-10 text-white/30" />
                <p className="mt-4 text-lg font-semibold text-white/60">No results found</p>
                <p className="mt-1 text-sm text-white/40">Try adjusting your search or filter.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Search */}
            <SidebarCard title="Search" icon={<Search className="size-4" />}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search updates..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                />
              </div>
            </SidebarCard>

            {/* Recent posts */}
            <SidebarCard title="Recent posts" icon={<Clock className="size-4" />}>
              <div className="space-y-3">
                {recentPosts.map((p) => (
                  <Link key={p.id} href={p.href} className="group block">
                    <h4 className="text-sm font-semibold text-white/90 transition-colors group-hover:text-blue-400">
                      {p.title}
                    </h4>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-white/40">
                      {p.categories[0] && <span className="text-blue-400">{p.categories[0]}</span>}
                      {p.date && (
                        <span>{new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</span>
                      )}
                    </div>
                  </Link>
                ))}
                {recentPosts.length === 0 && (
                  <p className="text-sm text-white/40">No posts yet.</p>
                )}
              </div>
            </SidebarCard>

            {/* Categories */}
            <SidebarCard title="Categories" icon={<Tag className="size-4" />}>
              <div className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => setActiveCategory(null)}
                  className={cn(
                    'block w-full rounded-md px-3 py-2 text-left text-sm transition-colors',
                    !activeCategory ? 'bg-blue-600/20 font-semibold text-blue-400' : 'text-white/60 hover:bg-white/5 hover:text-white',
                  )}
                >
                  All
                </button>
                {allCategories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveCategory(c)}
                    className={cn(
                      'block w-full rounded-md px-3 py-2 text-left text-sm transition-colors',
                      activeCategory === c ? 'bg-blue-600/20 font-semibold text-blue-400' : 'text-white/60 hover:bg-white/5 hover:text-white',
                    )}
                  >
                    {c}
                  </button>
                ))}
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

function FeaturedCard({ item }: { item: AnyItem }) {
  const date = item.date ? new Date(item.date) : null
  const isEvent = item.type === 'event'
  const event = isEvent ? (item as EventItem) : null

  return (
    <Link href={item.href} className="group block overflow-hidden rounded-xl border border-white/10 bg-slate-900/60 transition-colors hover:border-white/20">
      {item.image && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <img src={item.image} alt={item.title} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute left-4 top-4 flex gap-2">
            {item.categories.map((c) => (
              <span key={c} className="rounded-md bg-blue-600/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {c}
              </span>
            ))}
            {isEvent && (
              <span className="rounded-md bg-amber-500/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                Event
              </span>
            )}
          </div>
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3 text-sm text-white/50">
          {date && (
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {date.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          )}
          {event?.venue && (
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              {event.venue}
            </span>
          )}
        </div>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-blue-400">
          {item.title}
        </h2>
        {item.excerpt && (
          <p className="mt-3 line-clamp-3 text-white/60">{item.excerpt}</p>
        )}
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-400 transition-colors group-hover:text-blue-300">
          Read more <ArrowRight className="size-3.5" />
        </span>
      </div>
    </Link>
  )
}

function SmallCard({ item }: { item: AnyItem }) {
  const date = item.date ? new Date(item.date) : null
  const isEvent = item.type === 'event'
  const event = isEvent ? (item as EventItem) : null

  return (
    <Link href={item.href} className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-900/60 transition-colors hover:border-white/20">
      {item.image && (
        <div className="relative aspect-video overflow-hidden">
          <img src={item.image} alt={item.title} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute left-3 top-3 flex gap-1.5">
            {item.categories.slice(0, 2).map((c) => (
              <span key={c} className="rounded bg-blue-600/90 px-2 py-0.5 text-[0.65rem] font-semibold text-white backdrop-blur-sm">
                {c}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2 text-xs text-white/40">
          {date && (
            <span>{date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          )}
          {event?.venue && (
            <>
              <span className="text-white/20">·</span>
              <span>{event.venue}</span>
            </>
          )}
        </div>
        <h3 className="mt-2 font-bold text-white transition-colors group-hover:text-blue-400 line-clamp-2">
          {item.title}
        </h3>
        {item.excerpt && (
          <p className="mt-2 text-sm text-white/50 line-clamp-2">{item.excerpt}</p>
        )}
        <span className="mt-auto pt-3 text-sm font-semibold text-blue-400 transition-colors group-hover:text-blue-300">
          Read more →
        </span>
      </div>
    </Link>
  )
}
