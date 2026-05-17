import type { Metadata } from 'next'
import Image from 'next/image'
import { innerHeroRadialSection } from '@/utilities/pageHero'
import { Beaker, Droplets, FlaskConical, Package, Shield } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { ProductImageSlideshow } from './ProductImageSlideshow'

export const metadata: Metadata = {
  title: 'Product Details — Aluminium Sulphate | Chilmund Chemicals',
  description:
    'Technical specifications and product details for Chilmund Chemicals non-ferric Aluminium Sulphate with 17% Al₂O₃ content.',
}

const applications = [
  { icon: <Droplets className="size-5" />, title: 'Municipal water treatment', desc: 'Primary coagulant for drinking water purification used by local authorities nationwide.' },
  { icon: <FlaskConical className="size-5" />, title: 'Industrial wastewater', desc: 'Effective flocculation for mining, manufacturing, and food processing effluent.' },
  { icon: <Package className="size-5" />, title: 'Paper & pulp industry', desc: 'Sizing agent that improves water resistance and printability of paper products.' },
  { icon: <Beaker className="size-5" />, title: 'Textile processing', desc: 'Mordant for dye fixation and pH adjustment in textile finishing processes.' },
]

const certifications = [
  'IMS- ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018',
  'Standards Association of Zimbabwe (SAZ) certified Product',
  'SHEQ compliance verified',
]

export default function ProductDetailsPage() {
  return (
    <article className="min-h-screen">
      {/* Hero */}
      <section className={innerHeroRadialSection}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Aluminium Sulphate
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
            High-purity, non-ferric aluminium sulphate manufactured at our state-of-the-art plant
            in Bindura, Zimbabwe.
          </p>
        </div>
      </section>

      {/* Product at a glance: photo + technical specs */}
      <section className="bg-white dark:bg-slate-900">
        <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-3xl">
            Aluminium sulphate — product at a glance
          </h2>
          <p className="mx-auto mt-3 max-w-none text-center text-sm leading-snug text-slate-600 text-balance md:max-w-4xl md:text-base dark:text-white/55">
            We cater for various granular sizes, powder, kibbles and liquid product. All certified with SAZ product Mark
            (ZWS 1120:2024)
          </p>

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12">
            <figure className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm dark:border-white/10 dark:bg-slate-800">
              <ProductImageSlideshow />
            </figure>

            <figure className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm dark:border-white/10 dark:bg-slate-800">
              <div className="relative aspect-[4/3] w-full min-h-[260px] shrink-0 lg:min-h-[380px]">
                <Image
                  src="/Liquid Product.jpg"
                  alt="Liquid aluminium sulphate product at Chilmund Chemicals."
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </figure>
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
