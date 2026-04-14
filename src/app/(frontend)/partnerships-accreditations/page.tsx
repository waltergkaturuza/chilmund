import type { Metadata } from 'next'
import { Award, Building2, CheckCircle, Globe, Handshake, Shield } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'Partnerships & Accreditations | Chilmund Chemicals',
  description:
    'Our strategic partnerships and industry accreditations that ensure quality, compliance, and market reach.',
}

const accreditations = [
  {
    title: 'ISO 9001:2015',
    body: 'International Organization for Standardization',
    desc: 'Quality Management System certification ensuring consistent product quality and continuous improvement in all processes.',
    icon: <Shield className="size-6" />,
  },
  {
    title: 'SAZ Certification',
    body: 'Standards Association of Zimbabwe',
    desc: 'National quality mark certifying that our aluminium sulphate meets Zimbabwean national standards for water treatment chemicals.',
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
]

export default function PartnershipsAccreditationsPage() {
  return (
    <article className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 px-4 py-20 text-center text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl">
          <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-blue-500/20">
            <Handshake className="size-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Partnerships &amp; Accreditations
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
            Built on trust, verified by standards — our partnerships and certifications underpin
            every product we deliver.
          </p>
        </div>
      </section>

      {/* Accreditations */}
      <section className="bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-center text-2xl font-extrabold text-slate-900 dark:text-white">
            Accreditations &amp; Certifications
          </h2>
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
            {accreditations.map((a) => (
              <div
                key={a.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900/60"
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
