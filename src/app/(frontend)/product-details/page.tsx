import type { Metadata } from 'next'
import { Beaker, CheckCircle, Droplets, FlaskConical, Package, Shield } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'Product Details — Aluminium Sulphate | Chilmund Chemicals',
  description:
    'Technical specifications and product details for Chilmund Chemicals non-ferric Aluminium Sulphate with 17% Al₂O₃ content.',
}

const specs = [
  { label: 'Chemical formula', value: 'Al₂(SO₄)₃ · nH₂O' },
  { label: 'Al₂O₃ content', value: '≥ 17%' },
  { label: 'Iron (Fe) content', value: 'Non-ferric (< 0.01%)' },
  { label: 'pH (1% solution)', value: '3.0 – 3.5' },
  { label: 'Appearance', value: 'Off-white granules / lumps' },
  { label: 'Solubility', value: 'Readily soluble in water' },
  { label: 'Packaging', value: '25 kg, 50 kg bags & bulk' },
  { label: 'Daily capacity', value: '70 tonnes' },
]

const applications = [
  { icon: <Droplets className="size-5" />, title: 'Municipal water treatment', desc: 'Primary coagulant for drinking water purification used by local authorities nationwide.' },
  { icon: <FlaskConical className="size-5" />, title: 'Industrial wastewater', desc: 'Effective flocculation for mining, manufacturing, and food processing effluent.' },
  { icon: <Package className="size-5" />, title: 'Paper & pulp industry', desc: 'Sizing agent that improves water resistance and printability of paper products.' },
  { icon: <Beaker className="size-5" />, title: 'Textile processing', desc: 'Mordant for dye fixation and pH adjustment in textile finishing processes.' },
]

const certifications = [
  'ISO 9001:2015 Quality Management',
  'SAZ (Standards Association of Zimbabwe) certified',
  'SHEQ compliance verified',
  'Environmental Impact Assessment approved',
]

export default function ProductDetailsPage() {
  return (
    <article className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 px-4 py-20 text-center text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl">
          <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-blue-500/20">
            <FlaskConical className="size-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Aluminium Sulphate
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
            High-purity, non-ferric aluminium sulphate manufactured at our state-of-the-art plant
            in Bindura, Zimbabwe.
          </p>
        </div>
      </section>

      {/* Technical specs */}
      <section className="bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-center text-2xl font-extrabold text-slate-900 dark:text-white">
            Technical Specifications
          </h2>
          <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
            {specs.map((s, i) => (
              <div
                key={s.label}
                className={`flex items-center justify-between px-6 py-4 ${i % 2 === 0 ? 'bg-slate-50 dark:bg-slate-800/50' : 'bg-white dark:bg-slate-900'}`}
              >
                <span className="text-sm font-medium text-slate-500 dark:text-white/50">{s.label}</span>
                <span className="font-semibold text-slate-900 dark:text-white">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-center text-2xl font-extrabold text-slate-900 dark:text-white">
            Applications
          </h2>
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
            {applications.map((a) => (
              <div key={a.title} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900/60">
                <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                  {a.icon}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">{a.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-white/60">{a.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/uses-aluminium-sulphate"
              className="inline-flex rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              View all uses of Aluminium Sulphate →
            </Link>
          </div>
        </div>
      </section>

      {/* Quality */}
      <section className="bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-center text-2xl font-extrabold text-slate-900 dark:text-white">
            Quality & Certifications
          </h2>
          <div className="mx-auto mt-8 max-w-2xl space-y-3">
            {certifications.map((c) => (
              <div key={c} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 dark:border-white/10 dark:bg-slate-800/50">
                <Shield className="size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-white/80">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
