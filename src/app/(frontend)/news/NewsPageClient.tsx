'use client'

import { cn } from '@/utilities/ui'
import { innerHeroRadialSection } from '@/utilities/pageHero'
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
    <article className="min-h-screen bg-slate-50 pb-20 text-slate-900 dark:bg-slate-950 dark:text-white">
      <section className={innerHeroRadialSection}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/35 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/45 to-transparent" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center px-4">
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">News &amp; Events</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            Stay updated with the latest from Chilmund Chemicals — industry news, events, awards, and community
            initiatives.
          </p>
        </div>
      </section>

      <div className="border-b border-slate-200 bg-white py-10 dark:border-white/10 dark:bg-slate-950">
        <div className="container px-4">
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
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/15 dark:hover:text-white',
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
              <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-slate-50 py-16 text-center dark:border-white/10 dark:bg-white/5">
                <p className="text-lg font-semibold !text-center text-slate-700 dark:text-white/60">
                  No results found
                </p>
                <p className="mt-1 text-sm !text-center text-slate-500 dark:text-white/40">
                  Try adjusting your search or filter.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Search */}
            <SidebarCard title="Search">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search updates..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40"
                />
              </div>
            </SidebarCard>

            {/* Recent posts */}
            <SidebarCard title="Recent posts">
              <div className="space-y-3">
                {recentPosts.map((p) => (
                  <Link key={p.id} href={p.href} className="group block">
                    <h4 className="text-sm font-semibold text-slate-800 transition-colors group-hover:text-blue-600 dark:text-white/90 dark:group-hover:text-blue-400">
                      {p.title}
                    </h4>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500 dark:text-white/40">
                      {p.categories[0] && <span className="text-blue-600 dark:text-blue-400">{p.categories[0]}</span>}
                      {p.date && (
                        <span>{new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</span>
                      )}
                    </div>
                  </Link>
                ))}
                {recentPosts.length === 0 && (
                  <p className="text-sm text-slate-500 dark:text-white/40">No posts yet.</p>
                )}
              </div>
            </SidebarCard>

            {/* Categories */}
            <SidebarCard title="Categories">
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
                  All
                </button>
                {allCategories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveCategory(c)}
                    className={cn(
                      'block w-full rounded-md px-3 py-2 text-left text-sm transition-colors',
                      activeCategory === c
                        ? 'bg-blue-100 font-semibold text-blue-700 dark:bg-blue-600/20 dark:text-blue-400'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white',
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </SidebarCard>

            {/* Newsletter subscribe */}
            <NewsletterWidget />
          </aside>
        </div>
        </div>
      </div>
    </article>
  )
}

function SidebarCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-900/80">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
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
    <Link
      href={item.href}
      className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-colors hover:border-slate-300 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-none dark:hover:border-white/20"
    >
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
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-white/50">
          {date && (
            <span className="flex items-center gap-1.5">
              {date.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          )}
          {event?.venue && (
            <span className="flex items-center gap-1.5">
              {event.venue}
            </span>
          )}
        </div>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {item.title}
        </h2>
        {item.excerpt && (
          <p className="mt-3 line-clamp-3 text-slate-600 dark:text-white/60">{item.excerpt}</p>
        )}
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-colors group-hover:text-blue-500 dark:text-blue-400 dark:group-hover:text-blue-300">
          Read more
        </span>
      </div>
    </Link>
  )
}

function NewsletterWidget() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) return

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(data.message || 'Successfully subscribed!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMessage('Connection error. Please try again.')
    }
  }

  return (
    <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-slate-50 p-5 dark:border-blue-500/20 dark:from-blue-950/80 dark:to-slate-900/80">
      <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
        Never Miss an Update
      </h3>
      <p className="mb-4 text-sm text-slate-600 dark:text-white/50">
        Subscribe for the latest news, events, and industry updates from Chilmund Chemicals.
      </p>

      {status === 'success' ? (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-100 px-4 py-3 text-sm font-medium text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300">
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2.5">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:opacity-60"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
          {status === 'error' && (
            <p className="text-xs text-red-600 dark:text-red-400">{message}</p>
          )}
        </form>
      )}
    </div>
  )
}

function SmallCard({ item }: { item: AnyItem }) {
  const date = item.date ? new Date(item.date) : null
  const isEvent = item.type === 'event'
  const event = isEvent ? (item as EventItem) : null

  return (
    <Link
      href={item.href}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-colors hover:border-slate-300 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-none dark:hover:border-white/20"
    >
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
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-white/40">
          {date && (
            <span>{date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          )}
          {event?.venue && (
            <>
              <span className="text-slate-300 dark:text-white/20">·</span>
              <span>{event.venue}</span>
            </>
          )}
        </div>
        <h3 className="mt-2 line-clamp-2 font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {item.title}
        </h3>
        {item.excerpt && (
          <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-white/50">{item.excerpt}</p>
        )}
        <span className="mt-auto pt-3 text-sm font-semibold text-blue-600 transition-colors group-hover:text-blue-500 dark:text-blue-400 dark:group-hover:text-blue-300">
          Read more →
        </span>
      </div>
    </Link>
  )
}
