import Link from 'next/link'
import React from 'react'

import { HomeProductShowcase } from './HomeProductShowcase'

const linkCls =
  'font-semibold text-blue-700 underline-offset-4 transition-colors hover:text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300'

/**
 * Home product showcase and resources links. Other storytelling lives on About, Product Details, SHEQ, CSR, and Partners.
 */
export function HomeContentSections() {
  return (
    <div className="home-content-sections space-y-0 [&_section]:scroll-mt-20">
      <HomeProductShowcase />

      <section
        aria-label="Resources"
        className="border-b border-slate-200/90 bg-white py-7 dark:border-white/10 dark:bg-slate-950 md:py-8"
      >
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <p className="text-sm text-slate-600 dark:text-white/62">
            <Link className={linkCls} href="/resources">
              MSDS, COAs, brochures &amp; downloads — browse Resources →
            </Link>
            <span className="mx-3 text-slate-400 dark:text-white/30" aria-hidden>
              |
            </span>
            <Link className={linkCls} href="/about-chilmund">
              View Company Overview →
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
