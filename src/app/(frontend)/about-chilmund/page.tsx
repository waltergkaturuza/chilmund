import type { Metadata } from 'next'
import { BrandLogo } from '@/components/BrandLogo/BrandLogo'
import { CHILMUND_LOGO_WORDMARK_TOP_PADDING } from '@/constants/brand'
import { chilmundCopy } from '@/content/chilmundCopy'
import { aboutHeroSection } from '@/utilities/pageHero'
import { AboutFoundationSections } from './AboutFoundationSections'
import { Factory, Users, Globe, Droplets } from 'lucide-react'
import React from 'react'

export const metadata: Metadata = {
  title: 'About Us | Chilmund Chemicals',
  description: chilmundCopy.about.intro,
}

const stats = [
  { label: 'Established', value: '2007', icon: <Factory className="size-5" /> },
  { label: 'Monthly capacity', value: '7500t+', icon: <Droplets className="size-5" /> },
  { label: 'Employees', value: '200+', icon: <Users className="size-5" /> },
  { label: 'Countries served', value: '10+', icon: <Globe className="size-5" /> },
]

export default function AboutChilmundPage() {
  return (
    <article className="min-h-screen">
      {/* Hero, logo left, copy centered in right column */}
      <section className={aboutHeroSection}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
        <div className="relative mx-auto grid max-w-6xl items-start gap-6 md:grid-cols-2 md:gap-8">
          <div className="flex justify-center md:justify-start">
            <BrandLogo
              width={560}
              className="h-auto w-full max-w-[min(100%,22rem)] md:max-w-none md:w-[min(100%,32rem)] lg:w-[min(100%,36rem)]"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              variant="default"
            />
          </div>
          <div
            className="text-center md:grid md:text-left"
            style={{ ['--wordmark-align' as string]: CHILMUND_LOGO_WORDMARK_TOP_PADDING }}
          >
            <h1 className="mb-3 text-4xl font-extrabold tracking-tight md:col-start-1 md:row-start-1 md:mb-0 md:text-left md:text-[2.75rem] md:leading-tight lg:text-5xl">
              Company Overview
            </h1>
            <p
              className="mx-auto max-w-2xl text-base leading-snug text-white/70 md:col-start-1 md:row-start-1 md:mx-0 md:pt-[var(--wordmark-align)] md:text-lg"
            >
              {chilmundCopy.about.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                {s.icon}
              </div>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{s.value}</div>
              <div className="mt-1 text-sm text-slate-500 dark:text-white/50">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <AboutFoundationSections />
    </article>
  )
}
