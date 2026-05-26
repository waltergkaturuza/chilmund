import type { Metadata } from 'next'
import { innerHeroRadialSection } from '@/utilities/pageHero'
import { Shield } from 'lucide-react'
import React from 'react'
import { ProductExcellenceSection } from './ProductExcellenceSection'
import { ProductFormsDescription } from './ProductFormsDescription'

export const metadata: Metadata = {
  title: 'Product Details — Aluminium Sulphate | Chilmund Chemicals',
  description:
    'Technical specifications and product details for Chilmund Chemicals non-ferric Aluminium Sulphate with 17% Al₂O₃ content.',
}

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

      <ProductExcellenceSection />

      {/* Product at a glance */}
      <section id="product-at-a-glance" className="scroll-mt-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-3xl">
            Aluminium sulphate — product at a glance
          </h2>
          <p className="mx-auto mt-3 w-full max-w-6xl px-2 text-center text-sm leading-relaxed text-slate-600 !text-center md:text-base dark:text-white/55">
            We cater for a wide range of granular sizes (from kibbles to fines) and liquid products. All certified with
            SAZ product mark (ZWS 1120:2024)
          </p>

          <div className="mx-auto mt-10 max-w-4xl">
            <ProductFormsDescription />
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
