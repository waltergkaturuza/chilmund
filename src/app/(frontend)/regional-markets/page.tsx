import type { Metadata } from 'next'
import React from 'react'
import { RegionalMarketsMap } from './RegionalMarketsMap'

export const metadata: Metadata = {
  title: 'Regional Markets | Chilmund Chemicals',
  description:
    'Chilmund Chemicals serves municipal, industrial, and mining sectors across Southern and East Africa — with operations reaching 10+ countries.',
}

const MARKETS = [
  {
    country: 'Zimbabwe',
    flag: '🇿🇼',
    lat: -19.0,
    lng: 29.9,
    desc: 'Headquarters (Harare) & manufacturing plant (Bindura). Nationwide municipal, industrial and mining supply.',
    highlight: true,
  },
  {
    country: 'South Africa',
    flag: '🇿🇦',
    lat: -29.0,
    lng: 24.0,
    desc: 'Municipal water treatment and mining chemicals across all provinces.',
  },
  {
    country: 'Mozambique',
    flag: '🇲🇿',
    lat: -18.7,
    lng: 35.5,
    desc: 'Maputo, Beira, and northern corridor municipalities.',
  },
  {
    country: 'Zambia',
    flag: '🇿🇲',
    lat: -15.4,
    lng: 28.3,
    desc: 'Copperbelt mining sector and Lusaka municipal supply.',
  },
  {
    country: 'Malawi',
    flag: '🇲🇼',
    lat: -13.3,
    lng: 34.3,
    desc: 'Lilongwe and Blantyre water boards.',
  },
  {
    country: 'Botswana',
    flag: '🇧🇼',
    lat: -22.3,
    lng: 24.7,
    desc: 'Water Utilities Corporation and mining operations.',
  },
  {
    country: 'Namibia',
    flag: '🇳🇦',
    lat: -22.6,
    lng: 17.1,
    desc: 'NamWater and municipal water treatment plants.',
  },
  {
    country: 'Tanzania',
    flag: '🇹🇿',
    lat: -6.4,
    lng: 34.9,
    desc: 'Dar es Salaam and regional mining operations.',
  },
  {
    country: 'DRC',
    flag: '🇨🇩',
    lat: -4.3,
    lng: 15.3,
    desc: 'Mining sector in the Katanga (Haut-Katanga) copper belt.',
  },
  {
    country: 'Kenya',
    flag: '🇰🇪',
    lat: -1.3,
    lng: 36.8,
    desc: 'Nairobi Water and Sewerage Company, industrial chemicals.',
  },
] as const

export default function RegionalMarketsPage() {
  return (
    <article className="pb-20 pt-0">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]" />
        <div className="container relative z-10 px-4 py-20 text-center md:py-28">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            Regional Markets
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/75 md:text-xl">
            Serving 10+ countries across Southern and East Africa with world-class water treatment chemicals.
          </p>
        </div>
      </section>

      {/* Map + cards */}
      <section className="container px-4 py-16 md:py-20">
        <RegionalMarketsMap markets={MARKETS as any} />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MARKETS.map((m) => (
            <div
              key={m.country}
              className={`rounded-xl border p-5 shadow-sm transition-shadow hover:shadow-md ${'highlight' in m && m.highlight ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/10' : 'border-border bg-card'}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{m.flag}</span>
                <h3 className="text-lg font-bold">{m.country}</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}
