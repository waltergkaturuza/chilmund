import Link from 'next/link'
import React from 'react'

import { ABOUT_CORE_VALUES } from '@/content/aboutCoreValues'

const linkCls =
  'font-semibold text-blue-700 underline-offset-4 transition-colors hover:text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300'

function PillarCard({
  title,
  subtitle,
  body,
  foot,
}: {
  title: string
  subtitle: string
  body: string
  foot: React.ReactNode
}) {
  return (
    <div className="home-card flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white px-7 py-6 shadow-xl dark:border-white/15 dark:bg-slate-950/80 dark:shadow-none">
      <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h3>
      <p className="text-sm font-medium text-slate-600 dark:text-white/60">{subtitle}</p>
      <div className="mt-5 flex flex-1 flex-col">
        <p className="flex-1 text-sm leading-relaxed text-slate-600 dark:text-white/58">{body}</p>
        <div className="mt-6 border-t border-slate-100 pt-5 text-[0.8125rem] leading-relaxed text-slate-500 dark:border-white/10 dark:text-white/45">
          {foot}
        </div>
      </div>
    </div>
  )
}

export function AboutFoundationSections() {
  return (
    <div className="home-content-sections space-y-0 [&_section]:scroll-mt-20">
      {/* Three pillars */}
      <section className="border-b border-slate-200/90 bg-white pb-10 pt-6 dark:border-white/10 dark:bg-slate-950 md:pb-16 md:pt-8">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center md:mb-14">
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
              Our Key Pillars
            </h2>
            <p className="mx-auto mt-3 max-w-2xl !text-center text-slate-600 dark:text-white/55">
              How we prioritise excellence at every interaction, grounded in who we are.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <PillarCard
              title="Quality"
              subtitle="Highest global standards"
              body="We deliver world-class products that meet rigorous specifications and audit-driven consistency."
              foot={
                <>
                  Dive deeper into assurance in{' '}
                  <Link className={linkCls} href="/sheq">
                    SHEQ &amp; laboratory
                  </Link>
                  .
                </>
              }
            />
            <PillarCard
              title="Affordability"
              subtitle="Inclusive access"
              body="We design solutions so that safe water remains accessible regardless of economic context."
              foot={
                <>
                  Explore{' '}
                  <Link className={linkCls} href="/csr">
                    community impact &amp; CSR programmes
                  </Link>
                  .
                </>
              }
            />
            <PillarCard
              title="Service excellence"
              subtitle="Reliability on specification &amp; schedule"
              body="Customer satisfaction anchors every dispatch, disciplined logistics, proactive communication and follow-through."
              foot={
                <>
                  Explore our{' '}
                  <Link className={linkCls} href="/trucking-logistics">
                    trucking &amp; logistics
                  </Link>
                  .
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* Vision & mission */}
      <section className="border-b border-slate-200/90 bg-slate-50 py-10 dark:border-white/10 dark:bg-slate-900/50 md:py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="home-card relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-xl dark:border-white/15 dark:bg-slate-950/80 dark:shadow-none">
              <h2 className="text-xl font-bold uppercase tracking-wide text-slate-900 dark:text-white">Our vision</h2>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-slate-700 dark:text-white/65">
                To be the most sustainable and trusted Pan-African water treatment chemicals partner, empowering
                communities to thrive through clean, accessible water.
              </p>
              <p className="mt-6 text-sm font-medium text-slate-600 dark:text-white/55">
                Aligned with our{' '}
                <Link
                  className="rounded-md bg-blue-50 px-2 py-0.5 text-blue-800 underline-offset-4 transition-colors hover:bg-blue-100 hover:underline dark:bg-blue-950/50 dark:text-blue-100 dark:hover:bg-blue-950"
                  href="/regional-markets"
                >
                  regional roadmap
                </Link>{' '}
                and stakeholder commitments.
              </p>
            </div>
            <div className="home-card relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-xl dark:border-white/15 dark:bg-slate-950/80 dark:shadow-none">
              <h2 className="text-xl font-bold uppercase tracking-wide text-slate-900 dark:text-white">Our mission</h2>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-slate-700 dark:text-white/65">
                We deliver result-oriented water solutions that enhance lives and livelihoods, one drop at a time. Through
                responsible manufacturing and environmental stewardship, we aim to create lasting impact on people and
                the planet.
              </p>
              <p className="mt-8 text-sm font-medium text-slate-600 dark:text-white/55">
                We continue advancing responsible operations at our Bindura plant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="border-b border-slate-200/90 bg-white py-10 dark:border-white/10 dark:bg-slate-950 md:py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
              Core Values
            </h2>
            <p className="mt-3 text-slate-600 dark:text-white/55">
              Values we embed from boardroom to plant floor, also reflected across{' '}
              <Link className={linkCls} href="/meet-our-team">
                leadership &amp; teams
              </Link>
              .
            </p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:gap-5">
            {ABOUT_CORE_VALUES.map((value, i) => (
              <li
                key={value}
                className="home-card group flex items-center gap-4 rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-slate-50/95 p-5 shadow-sm transition-colors hover:border-blue-100 hover:shadow-md dark:border-white/10 dark:from-slate-900 dark:to-slate-950 dark:hover:border-blue-900/60"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white dark:bg-blue-700">
                  {i + 1}
                </span>
                <p className="font-bold text-slate-900 dark:text-white">{value}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

    </div>
  )
}
