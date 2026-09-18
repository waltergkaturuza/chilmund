import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const linkCls =
  'font-semibold text-blue-700 underline-offset-4 transition-colors hover:text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300'

export function ProductExcellenceSection() {
  return (
    <section className="border-b border-slate-200/90 bg-slate-50 py-10 dark:border-white/10 dark:bg-slate-900/50 md:py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
          <div className="flex min-w-0 flex-col lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-600/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-800 dark:bg-blue-500/20 dark:text-blue-300">
              Portfolio
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
              Product excellence
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-slate-700 dark:text-white/65">
              <strong className="font-semibold text-slate-900 dark:text-white">Products:</strong> Granular, liquid and
              kibbled aluminium sulphate — the &quot;universal coagulant&quot; for high-performance municipal water
              treatment, industrial processes, agriculture and mining.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="inline-flex rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-white/20 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
                href="#product-at-a-glance"
              >
                Specifications
              </Link>
              <Link
                className="inline-flex rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500"
                href="/uses-aluminium-sulphate"
              >
                Uses overview
              </Link>
            </div>

            <div className="mt-10 border-t border-slate-200/90 pt-10 dark:border-white/10">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Applications
              </h3>
              <ul className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700 dark:text-white/60">
                <li className="border-l-2 border-blue-500 pl-4">
                  <strong className="text-slate-900 dark:text-white">Municipal water treatment:</strong> efficient removal
                  of suspended solids and pathogens.
                </li>
                <li className="border-l-2 border-blue-400 pl-4">
                  <strong className="text-slate-900 dark:text-white">Industrial:</strong> paper sizing (ink hold-out) &
                  textile dyeing (colour fixation).
                </li>
                <li className="border-l-2 border-blue-600 pl-4">
                  <strong className="text-slate-900 dark:text-white">Agriculture &amp; mining:</strong> soil pH modulation
                  and wastewater remediation.
                </li>
              </ul>
              <Link className={`mt-8 inline-flex text-sm ${linkCls}`} href="/uses-aluminium-sulphate">
                Uses of aluminium sulphate — full overview →
              </Link>
            </div>

            <figure className="relative mt-10 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-lg dark:border-white/10 dark:bg-slate-950 lg:hidden">
              <Image
                src="/WTP-for-modern-infrastructure-1024x683.webp"
                alt="Modern water treatment and infrastructure serving communities and industry"
                width={1024}
                height={683}
                sizes="100vw"
                className="h-auto w-full object-cover"
              />
            </figure>
          </div>

          <div className="relative hidden min-h-0 lg:col-span-7 lg:block">
            <figure className="relative sticky top-24 min-h-[min(36rem,calc(100vh-7rem))] overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-200 shadow-xl dark:border-white/10 dark:bg-slate-950">
              <Image
                src="/WTP-for-modern-infrastructure-1024x683.webp"
                alt="Modern water treatment and infrastructure serving communities and industry"
                fill
                sizes="(max-width: 1280px) 55vw, 700px"
                className="object-cover object-center"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
