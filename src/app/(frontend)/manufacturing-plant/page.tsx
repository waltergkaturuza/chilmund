import type { Metadata } from 'next'
import { CheckCircle, Factory, Gauge, HardHat, MapPin, Recycle, Shield, Truck, Zap } from 'lucide-react'
import React from 'react'

export const metadata: Metadata = {
  title: 'Manufacturing Plant | Chilmund Chemicals',
  description:
    'Tour our state-of-the-art aluminium sulphate manufacturing plant in Bindura, Zimbabwe — 70 tonnes daily capacity.',
}

const highlights = [
  { icon: <Gauge className="size-5" />, title: '70 tonnes/day', desc: 'Daily production capacity with plans for expansion' },
  { icon: <Factory className="size-5" />, title: 'State-of-the-art', desc: 'Modern plant commissioned July 2023' },
  { icon: <Shield className="size-5" />, title: 'Quality assured', desc: 'Continuous testing and SAZ-certified output' },
  { icon: <Recycle className="size-5" />, title: 'Sustainable', desc: 'Environmentally responsible manufacturing processes' },
]

const features = [
  { icon: <Zap className="size-5" />, label: 'Automated reaction and drying systems for consistent quality' },
  { icon: <Shield className="size-5" />, label: 'On-site quality control laboratory for batch testing' },
  { icon: <HardHat className="size-5" />, label: 'Full SHEQ compliance with regular safety audits' },
  { icon: <Recycle className="size-5" />, label: 'Waste minimisation and effluent treatment facilities' },
  { icon: <Truck className="size-5" />, label: 'Integrated loading bay for efficient dispatch logistics' },
  { icon: <MapPin className="size-5" />, label: 'Strategically located in Bindura for raw material access' },
]

export default function ManufacturingPlantPage() {
  return (
    <article className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 px-4 py-20 text-center text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl">
          <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-blue-500/20">
            <Factory className="size-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Manufacturing Plant
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
            Our state-of-the-art aluminium sulphate manufacturing facility in Bindura, Zimbabwe,
            commissioned in July 2023, produces 70 tonnes of high-purity product daily.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-b border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.title} className="text-center">
              <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                {h.icon}
              </div>
              <div className="font-bold text-slate-900 dark:text-white">{h.title}</div>
              <div className="mt-1 text-sm text-slate-500 dark:text-white/50">{h.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Plant features */}
      <section className="bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-center text-2xl font-extrabold text-slate-900 dark:text-white">
            Plant Capabilities
          </h2>
          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {features.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-6 py-4 dark:border-white/10 dark:bg-slate-900/60"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                  {f.icon}
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-white/80">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 py-16 text-center">
          <MapPin className="mx-auto size-10 text-blue-600 dark:text-blue-400" />
          <h2 className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white">Location</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600 dark:text-white/60">
            Our manufacturing plant is strategically located in <strong>Bindura, Zimbabwe</strong>,
            providing easy access to bauxite raw materials and key transport routes for
            distribution across Southern and East Africa.
          </p>
        </div>
      </section>
    </article>
  )
}
