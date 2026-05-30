import Link from 'next/link'
import { ImageSlideshow } from '@/components/ImageSlideshow/ImageSlideshow'
import { sheqOperationalIntegritySlides } from '@/content/sheqOperationalIntegritySlides'
import React from 'react'

const linkCls =
  'font-semibold text-blue-700 underline-offset-4 transition-colors hover:text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300'

export function OperationalIntegritySection() {
  return (
    <section className="border-b border-slate-200/90 bg-white py-16 dark:border-white/10 dark:bg-slate-950 md:py-22">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="home-card overflow-hidden rounded-3xl border border-slate-200 bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_48%,#eef2ff_100%)] shadow-xl dark:border-white/15 dark:bg-[linear-gradient(135deg,oklch(18%_0.04_250deg)_0%,oklch(14%_0.035_248deg)_100%)] md:grid md:grid-cols-2 md:items-stretch">
          <div className="w-full p-8 md:p-10">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white md:text-3xl">
              Operational integrity (SHEQ)
            </h2>
            <p className="mt-4 text-[1.05rem] font-medium leading-relaxed text-slate-700 dark:text-white/65">
              Compromise is not an option. Safety and quality are not departmental silos — they are our licence to
              operate. Our SHEQ function applies global-best operating discipline across plant, labs, and logistics.
            </p>
            <ul className="mt-8 space-y-3 text-[0.9375rem] text-slate-700 dark:text-white/62">
              <li className="flex gap-2">
                <span className="text-blue-600 dark:text-blue-400">✓</span>
                SAZ-tracked conformity — hallmark quality mark on-pack.
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 dark:text-blue-400">✓</span>
                R&amp;D &amp; lab investments toward next-generation water chemistry.
              </li>
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-blue-700 dark:hover:bg-blue-600"
                href="#qc-qa"
              >
                QC / QA process
                <span aria-hidden>→</span>
              </Link>
              <Link
                className={`inline-flex items-center gap-1 text-sm ${linkCls}`}
                href="#laboratory"
              >
                Explore our Laboratory facilities
              </Link>
            </div>
          </div>
          <aside className="flex min-h-0 w-full min-w-0 flex-col border-t border-slate-200 bg-slate-900/92 text-white dark:border-white/10 md:border-l md:border-t-0 [&_p.text-sm]:px-8 [&_p.text-sm]:pb-8">
            <p className="shrink-0 px-8 pt-8 pb-4 text-xs font-bold uppercase tracking-[0.22em] text-blue-300/95 md:px-10 md:pt-10">
              SHEQ as a culture
            </p>
            <div className="flex min-h-[18rem] flex-1 flex-col sm:min-h-[22rem] md:min-h-0">
              <ImageSlideshow
                slides={sheqOperationalIntegritySlides}
                growInFlexLayout
                captionOnDark
                imageQuality={92}
                intervalMs={6000}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
                className="relative min-h-[18rem] w-full flex-1 overflow-hidden sm:min-h-[22rem] md:min-h-[20rem] lg:min-h-[26rem]"
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
