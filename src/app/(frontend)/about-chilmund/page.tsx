import type { Metadata } from 'next'
import { CHILMUND_LOGO_ALT, CHILMUND_LOGO_SRC } from '@/constants/brand'
import { chilmundCopy } from '@/content/chilmundCopy'
import { aboutHeroSection } from '@/utilities/pageHero'
import { Eye, Target, Factory, Users, Globe, Droplets } from 'lucide-react'
import Image from 'next/image'
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
      {/* Hero — logo left, copy centered in right column */}
      <section className={aboutHeroSection}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-6 md:grid-cols-2 md:gap-8">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-[min(100%,20rem)] rounded-xl border border-white/15 bg-white px-3 py-2 shadow-lg shadow-black/30 sm:px-4 sm:py-2.5 md:max-w-none md:w-[min(100%,26rem)] lg:w-[min(100%,28rem)]">
              <Image
                src={CHILMUND_LOGO_SRC}
                alt={CHILMUND_LOGO_ALT}
                width={560}
                height={168}
                className="h-auto w-full"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              Company Overview
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-snug text-white/70 md:text-lg">
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

      {/* Vision & Mission */}
      <section className="bg-white dark:bg-slate-900">
        <div className="container mx-auto grid gap-8 px-4 py-16 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-white/10 dark:bg-slate-800/50">
            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
              <Eye className="size-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-white/60">
              {chilmundCopy.vision}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-white/10 dark:bg-slate-800/50">
            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
              <Target className="size-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-white/60">
              {chilmundCopy.mission}
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-center text-2xl font-extrabold text-slate-900 dark:text-white">
            Our Core Values
          </h2>
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {chilmundCopy.coreValues.map((val, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 dark:border-white/10 dark:bg-slate-800/50"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {i + 1}
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-white/80">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
