import { Leaf } from 'lucide-react'
import React from 'react'

export function ImpactSection() {
  return (
    <section className="border-b border-slate-200/90 bg-slate-50 py-12 dark:border-white/10 dark:bg-slate-900/40 md:py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="home-card max-w-3xl rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-xl dark:border-white/12 dark:bg-slate-950/85">
          <Leaf className="size-10 text-emerald-500" />
          <h2 className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white">Impact (CSR)</h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-slate-700 dark:text-white/65">
            Investing upstream of our success: education bursaries, nutrition uplift for vulnerable households, and
            lasting livelihood pathways anchored in local manufacture.
          </p>
        </div>
      </div>
    </section>
  )
}
