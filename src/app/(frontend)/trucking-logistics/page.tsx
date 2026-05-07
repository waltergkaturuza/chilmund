import type { Metadata } from 'next'
import { MutedAutoplayLoopVideo } from '@/heros/LowImpact/MutedAutoplayLoopVideo'
import { innerHeroRadialSection } from '@/utilities/pageHero'
import { Clock, Globe, MapPin, Package, Route, Shield, Truck, Warehouse } from 'lucide-react'
import React from 'react'

const TRUCKS_VIDEO_SRC = `/${encodeURIComponent('trucks.mp4')}`

export const metadata: Metadata = {
  title: 'Trucking & Logistics | Chilmund Chemicals',
  description:
    'Reliable trucking and logistics services for aluminium sulphate delivery across Zimbabwe and the Southern African region.',
}

const capabilities = [
  { icon: <Truck className="size-6" />, title: 'Dedicated Fleet', desc: 'Own fleet of trucks purpose-built for safe chemical transportation, ensuring reliable and timely deliveries.' },
  { icon: <Globe className="size-6" />, title: 'Regional Reach', desc: 'Distribution network covering Zimbabwe, Zambia, Malawi, Mozambique, DRC, and other Southern and East African markets.' },
  { icon: <Warehouse className="size-6" />, title: 'Strategic Warehousing', desc: 'Warehousing facilities at key distribution points for buffer stock and rapid deployment to customers.' },
  { icon: <Shield className="size-6" />, title: 'Safety First', desc: 'All drivers trained in hazardous materials handling. Vehicles equipped with spill kits and safety equipment.' },
  { icon: <Clock className="size-6" />, title: 'On-Time Delivery', desc: 'GPS-tracked fleet with real-time monitoring to ensure on-time delivery and full supply chain visibility.' },
  { icon: <Package className="size-6" />, title: 'Flexible Packaging', desc: 'Available in 25 kg bags, 50 kg bags, 1-tonne bulk bags, and loose bulk options to suit customer requirements.' },
]

const routes = [
  { from: 'Bindura Plant', to: 'Harare & surrounding municipalities', time: 'Same day' },
  { from: 'Bindura Plant', to: 'Bulawayo, Gweru, Mutare', time: '1–2 days' },
  { from: 'Bindura Plant', to: 'Zambia (Lusaka, Copperbelt)', time: '2–3 days' },
  { from: 'Bindura Plant', to: 'Malawi, Mozambique', time: '3–5 days' },
  { from: 'Bindura Plant', to: 'DRC, Tanzania', time: '5–7 days' },
]

export default function TruckingLogisticsPage() {
  return (
    <article className="min-h-screen">
      {/* Hero */}
      <section className={innerHeroRadialSection}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Trucking &amp; Logistics
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
            From our Bindura plant to your door — reliable, safe, and on-time delivery of
            aluminium sulphate across the region.
          </p>
        </div>
      </section>

      {/* Delivery routes — near full-bleed like home hero; wider video column */}
      <section className="bg-slate-50 dark:bg-slate-900">
        <div className="relative mx-auto w-full max-w-none px-3 py-16 sm:px-4 md:px-5 lg:px-7 xl:px-10">
          <h2 className="text-center text-2xl font-extrabold text-slate-900 dark:text-white">
            Delivery Estimates
          </h2>
          <div className="mx-auto mt-10 grid gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-10 xl:gap-12">
            <div className="min-w-0 lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
                <div className="grid grid-cols-[1fr_1fr_auto] bg-blue-600 px-4 py-3 text-xs font-semibold text-white sm:px-6 sm:text-sm">
                  <span>From</span>
                  <span>To</span>
                  <span>Est. time</span>
                </div>
                {routes.map((r, i) => (
                  <div
                    key={r.to}
                    className={`grid grid-cols-[1fr_1fr_auto] items-center gap-1 px-4 py-3 text-xs sm:px-6 sm:py-4 sm:text-sm ${i % 2 === 0 ? 'bg-white dark:bg-slate-800/50' : 'bg-slate-50 dark:bg-slate-900'}`}
                  >
                    <span className="flex items-center gap-2 text-slate-500 dark:text-white/50">
                      <Route className="size-3.5 shrink-0" />
                      {r.from}
                    </span>
                    <span className="flex min-w-0 items-center gap-2 font-medium text-slate-900 dark:text-white">
                      <MapPin className="size-3.5 shrink-0 text-blue-600 dark:text-blue-400" />
                      {r.to}
                    </span>
                    <span className="shrink-0 rounded-full bg-blue-100 px-2 py-1 text-[0.65rem] font-semibold whitespace-nowrap text-blue-700 sm:px-3 sm:text-xs dark:bg-blue-500/20 dark:text-blue-300">
                      {r.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="min-w-0 lg:col-span-7">
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-lg dark:border-white/10 sm:rounded-3xl sm:shadow-xl lg:sticky lg:top-24 lg:aspect-auto lg:min-h-[min(36rem,calc(100vh-7rem))]">
                <MutedAutoplayLoopVideo
                  src={TRUCKS_VIDEO_SRC}
                  className="absolute inset-0 size-full object-cover"
                  aria-label="Chilmund trucking and delivery fleet"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-center text-2xl font-extrabold text-slate-900 dark:text-white">
            Our Logistics Capabilities
          </h2>
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-slate-900/60"
              >
                <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                  {c.icon}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">{c.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-white/60">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
