import type { Metadata } from 'next'
import { Award, Building2, CheckCircle, Globe, Handshake, Shield } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { ImageSlideshow } from '@/components/ImageSlideshow/ImageSlideshow'
import { awardsCertificatesSlides } from '@/content/awardsCertificatesSlides'
import { innerHeroRadialSection } from '@/utilities/pageHero'

export const metadata: Metadata = {
  title: 'Partners and Certifications | Chilmund Chemicals',
  description:
    'Our strategic partnerships and certifications that ensure quality, compliance, and market reach.',
}

const certifications = [
  {
    title: 'IMS- ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018',
    body: 'Integrated Management System',
    desc: 'Quality Management System certification ensuring consistent product quality and continuous improvement in all processes.',
    icon: <Shield className="size-6" />,
  },
  {
    title: 'SAZ Certification',
    body: 'Standards Association of Zimbabwe',
    desc: 'SAZ product mark (ZWS 1120:2024) certifying that our aluminium sulphate meets Zimbabwean national standards for water treatment chemicals.',
    icon: <Award className="size-6" />,
  },
  {
    title: 'EIA Approved',
    body: 'Environmental Management Agency',
    desc: 'Environmental Impact Assessment approval for our Bindura manufacturing operations, confirming compliance with environmental regulations.',
    icon: <CheckCircle className="size-6" />,
  },
  {
    title: 'SHEQ Compliance',
    body: 'Safety, Health, Environment & Quality',
    desc: 'Comprehensive SHEQ management system covering occupational health, process safety, environmental stewardship, and quality assurance.',
    icon: <Shield className="size-6" />,
  },
]

const partners = [
  {
    category: 'Municipal & Government',
    items: [
      'Local authorities and municipalities across Zimbabwe',
      'ZINWA (Zimbabwe National Water Authority)',
      'Regional water utilities in Zambia, Malawi, and Mozambique',
    ],
  },
  {
    category: 'Mining & Industrial',
    items: [
      'Gold, platinum, and coal mining operations',
      'Food and beverage processing plants',
      'Textile and paper manufacturing companies',
    ],
  },
  {
    category: 'Distribution & Trade',
    items: [
      'Regional chemical distributors',
      'Cross-border trade facilitators',
      'Logistics and freight partners across SADC',
    ],
  },
] as const

export default function PartnershipsAccreditationsPage() {
  return (
    <article className="min-h-screen">
      {/* Hero */}
      <section className={innerHeroRadialSection}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Partners and Certifications
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg md:leading-relaxed">
            Built on trust, verified by standards — our partnerships and certifications underpin
            every product we deliver.
          </p>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-center text-2xl font-extrabold text-slate-900 dark:text-white">Certifications</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600 dark:text-white/55">
            Standards, licenses and awards demonstrating global and national recognition for excellence
          </p>
          <div className="mx-auto mt-10 grid max-w-[92rem] gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
            <div className="grid h-full min-h-0 grid-cols-1 content-start gap-6 sm:grid-cols-2 lg:col-span-5">
              {certifications.map((a) => (
                <div
                  key={a.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-300/90 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-lg dark:shadow-black/30 dark:hover:shadow-2xl dark:hover:shadow-black/50"
                >
                  <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                    {a.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{a.title}</h3>
                  <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">{a.body}</p>
                  <p className="mt-3 text-sm text-slate-600 dark:text-white/60">{a.desc}</p>
                </div>
              ))}
            </div>
            <aside className="flex h-full min-h-0 flex-col rounded-2xl border border-slate-200 bg-slate-50/90 p-5 shadow-md shadow-slate-200/50 transition-all duration-300 hover:shadow-xl hover:shadow-slate-300/80 dark:border-white/10 dark:bg-slate-900/55 dark:shadow-lg dark:shadow-black/25 dark:hover:shadow-2xl dark:hover:shadow-black/45 lg:col-span-7">
              <h3 className="shrink-0 text-lg font-bold text-slate-900 dark:text-white">Certificates &amp; awards</h3>
              <div className="mt-4 flex min-h-[15rem] flex-1 flex-col sm:min-h-[18rem] lg:min-h-0">
                <ImageSlideshow
                  slides={awardsCertificatesSlides}
                  growInFlexLayout
                  className="rounded-xl border border-slate-200 shadow-inner dark:border-white/10"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  intervalMs={6000}
                  controlsOnLight
                  imageFit="contain"
                />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-center text-2xl font-extrabold text-slate-900 dark:text-white">
            Our Partners &amp; Clients
          </h2>
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-3">
            {partners.map((p) => (
              <div
                key={p.category}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-800/50"
              >
                <h3 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  {p.category === 'Municipal & Government' && <Building2 className="size-5 text-blue-600 dark:text-blue-400" />}
                  {p.category === 'Mining & Industrial' && <Globe className="size-5 text-amber-600 dark:text-amber-400" />}
                  {p.category === 'Distribution & Trade' && <Handshake className="size-5 text-emerald-600 dark:text-emerald-400" />}
                  {p.category}
                </h3>
                <ul className="mt-4 space-y-2">
                  {p.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-slate-600 dark:text-white/60">
                      <CheckCircle className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Explore Our Markets</h2>
          <p className="mx-auto mt-3 max-w-lg text-slate-600 dark:text-white/60">
            See where Chilmund Chemicals products are making an impact across Southern and East Africa.
          </p>
          <Link
            href="/regional-markets"
            className="mt-6 inline-flex rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
          >
            View Regional Markets →
          </Link>
        </div>
      </section>
    </article>
  )
}
