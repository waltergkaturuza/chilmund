import type { Metadata } from 'next'
import React from 'react'
import { innerHeroGradientInner, innerHeroGradientOuter } from '@/utilities/pageHero'
import { RegionalMarketsMap } from './RegionalMarketsMap'

export const metadata: Metadata = {
  title: 'Regional Markets | Chilmund Chemicals',
  description:
    'Chilmund Chemicals serves municipal, industrial, and mining sectors across Southern and East Africa — with operations reaching 10+ countries.',
}

const MARKETS = [
  { country: 'Zimbabwe', code: 'zw', lat: -19.0, lng: 29.9, highlight: true },
  { country: 'South Africa', code: 'za', lat: -29.0, lng: 24.0 },
  { country: 'Mozambique', code: 'mz', lat: -18.7, lng: 35.5 },
  { country: 'Zambia', code: 'zm', lat: -15.4, lng: 28.3 },
  { country: 'Malawi', code: 'mw', lat: -13.3, lng: 34.3 },
  { country: 'Botswana', code: 'bw', lat: -22.3, lng: 24.7 },
  { country: 'Namibia', code: 'na', lat: -22.6, lng: 17.1 },
  { country: 'Tanzania', code: 'tz', lat: -6.4, lng: 34.9 },
  { country: 'DRC', code: 'cd', lat: -4.3, lng: 15.3 },
  { country: 'Kenya', code: 'ke', lat: -1.3, lng: 36.8 },
] as const

function FlagImg({ code, size = 24 }: { code: string; size?: number }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
      width={size}
      height={Math.round(size * 0.75)}
      alt=""
      className="inline-block rounded-sm"
      loading="lazy"
    />
  )
}

export default function RegionalMarketsPage() {
  return (
    <article className="pb-20 pt-0">
      {/* Hero */}
      <section className={innerHeroGradientOuter}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]" />
        <div className={innerHeroGradientInner}>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Regional Markets
          </h1>
          <p className="mx-auto mt-4 max-w-5xl text-lg text-white/75 md:text-xl lg:whitespace-nowrap">
            Serving 10+ countries across Africa with world-class water treatment coagulants.
          </p>
        </div>
      </section>

      {/* Map + cards */}
      <section className="container px-4 py-10 md:py-14">
        <RegionalMarketsMap markets={[...MARKETS]} />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MARKETS.map((m) => (
            <div
              key={m.country}
              className={`rounded-xl border p-5 shadow-sm transition-shadow hover:shadow-md ${'highlight' in m && m.highlight ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/10' : 'border-border bg-card'}`}
            >
              <div className="flex items-center gap-3">
                <FlagImg code={m.code} size={32} />
                <h3 className="text-lg font-bold">{m.country}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}
