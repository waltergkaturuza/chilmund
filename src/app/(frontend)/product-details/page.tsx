import type { Metadata } from 'next'
import Image from 'next/image'
import { innerHeroRadialSection } from '@/utilities/pageHero'
import { Beaker, Droplets, FlaskConical, Package, Shield } from 'lucide-react'
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
            SAZ-aligned labelling and controlled batch release — the same quality that leaves our warehouse for
            municipalities, industry, and agriculture across the region.
          </p>

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12">
            <figure className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm dark:border-white/10 dark:bg-slate-800">
              <div className="relative aspect-square w-full min-h-[260px] shrink-0 lg:aspect-auto lg:min-h-0 lg:flex-1">
                <Image
                  src="/manufacturing/aluminium-sulphate-product-bags.png"
                  alt="Stacks of Chilmund Chemicals branded 50 kg bags of aluminium sulphate in warehouse storage, showing product name and grade markings."
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </figure>

            <div className="flex min-h-0 flex-col">
              <h3 className="text-center text-lg font-bold text-slate-900 dark:text-white lg:mb-4 lg:text-left">
                Technical specifications
              </h3>
              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950 shadow-inner lg:mt-0 dark:border-white/10">
                <table className="w-full border-collapse text-sm">
                  <caption className="sr-only">
                    Aluminium sulphate technical specifications for Chilmund Chemicals products
                  </caption>
                  <tbody className="divide-y divide-white/[0.06]">
                    {specs.map((row, i) => (
                      <tr
                        key={row.label}
                        className={i % 2 === 0 ? 'bg-slate-900/60' : 'bg-slate-900/40'}
                      >
                        <th
                          scope="row"
                          className="w-[44%] px-4 py-3.5 text-left font-medium text-slate-400 md:px-5"
                        >
                          {row.label}
                        </th>
                        <td className="px-4 py-3.5 text-right font-semibold text-white md:px-5">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
