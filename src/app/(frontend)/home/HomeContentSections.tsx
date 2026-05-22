import Link from 'next/link'
import React from 'react'

const linkCls =
  'font-semibold text-blue-700 underline-offset-4 transition-colors hover:text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300'

/**
 * Home resources link. Storytelling sections live on About, Product Details, SHEQ, CSR, and Partners pages.
 */
export function HomeContentSections() {
  return (
    <div className="home-content-sections space-y-0 [&_section]:scroll-mt-20">
      <section
        aria-label="Resources"
        className="border-b border-slate-200/90 bg-white py-7 dark:border-white/10 dark:bg-slate-950 md:py-8"
      >
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <p className="text-sm text-slate-600 dark:text-white/62">
            <Link className={linkCls} href="/resources">
              MSDS, COAs, brochures &amp; downloads — browse Resources →
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
