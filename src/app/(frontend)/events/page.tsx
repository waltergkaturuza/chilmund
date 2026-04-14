import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const dynamic = 'force-static'
export const revalidate = 600

export const metadata: Metadata = {
  title: 'Events | Chilmund Chemicals',
  description: 'Upcoming and past events — conferences, exhibitions, awards, and CSR activities from Chilmund Chemicals.',
}

export default async function EventsPage() {
  const payload = await getPayload({ config: configPromise })

  const now = new Date().toISOString()

  const [upcoming, past] = await Promise.all([
    payload.find({
      collection: 'events',
      depth: 1,
      limit: 20,
      overrideAccess: false,
      sort: 'eventDate',
      where: { eventDate: { greater_than_equal: now } },
      select: {
        title: true, slug: true, eventDate: true, endDate: true,
        venue: true, eventType: true, summary: true, heroImage: true,
        registrationUrl: true,
      },
    }),
    payload.find({
      collection: 'events',
      depth: 1,
      limit: 12,
      overrideAccess: false,
      sort: '-eventDate',
      where: { eventDate: { less_than: now } },
      select: {
        title: true, slug: true, eventDate: true, venue: true,
        eventType: true, summary: true, heroImage: true,
      },
    }),
  ])

  return (
    <article className="pb-20 pt-0">
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]" />
        <div className="container relative z-10 px-4 py-20 text-center md:py-28">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">Events</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/75 md:text-xl">
            Conferences, exhibitions, award ceremonies, and community outreach.
          </p>
        </div>
      </section>

      <section className="container px-4 py-16 md:py-20">
        {upcoming.docs.length > 0 && (
          <div className="mb-16">
            <h2 className="mb-8 text-2xl font-bold tracking-tight">Upcoming Events</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.docs.map((event) => (
                <EventCard key={event.id} event={event} upcoming />
              ))}
            </div>
          </div>
        )}

        {past.docs.length > 0 && (
          <div>
            <h2 className="mb-8 text-2xl font-bold tracking-tight">Past Events</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {past.docs.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {upcoming.docs.length === 0 && past.docs.length === 0 && (
          <div className="py-20 text-center">
            <Calendar className="mx-auto size-12 text-muted-foreground/40" />
            <h2 className="mt-4 text-xl font-bold">No events yet</h2>
            <p className="mt-2 text-muted-foreground">Check back soon — we regularly participate in industry events across Southern Africa.</p>
          </div>
        )}
      </section>
    </article>
  )
}

function EventCard({ event, upcoming }: { event: Record<string, any>; upcoming?: boolean }) {
  const date = event.eventDate ? new Date(event.eventDate) : null
  const heroUrl = typeof event.heroImage === 'object' && event.heroImage?.url ? event.heroImage.url : null

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      {heroUrl && (
        <div className="aspect-video overflow-hidden bg-muted">
          <img src={heroUrl} alt={event.title || ''} className="size-full object-cover transition-transform group-hover:scale-105" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        {event.eventType && (
          <span className="mb-2 w-fit rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            {event.eventType}
          </span>
        )}
        <h3 className="text-lg font-bold tracking-tight">
          {event.slug ? (
            <Link href={`/events/${event.slug}`} className="hover:text-blue-600">{event.title}</Link>
          ) : event.title}
        </h3>
        {date && (
          <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="size-3.5" />
            <time dateTime={date.toISOString()}>
              {date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              {' · '}
              {date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
            </time>
          </div>
        )}
        {event.venue && (
          <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-3.5" />
            {event.venue}
          </div>
        )}
        {event.summary && (
          <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{event.summary}</p>
        )}
        <div className="mt-auto pt-4">
          {upcoming && event.registrationUrl && (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              Register <ExternalLink className="size-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
