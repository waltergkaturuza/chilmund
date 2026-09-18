import React from 'react'

const accolades = [
  'Best Exhibitor — SADC Industrialization Week',
  'Company of the Year — Mashonaland Central',
  'Best Innovator — National Business Awards',
  'Outstanding Investor in Manufacturing — Africa Investment Leaders Forum & Awards',
] as const

export function IndustryAccoladesSection() {
  return (
    <section className="border-t border-slate-200/90 bg-slate-50 py-10 dark:border-white/10 dark:bg-slate-900/40 md:py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="home-card mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-xl dark:border-white/12 dark:bg-slate-950/85">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Industry accolades</h2>
          <ul className="mt-6 space-y-3 text-[0.9375rem] text-slate-700 dark:text-white/60">
            {accolades.map((line) => (
              <li key={line}>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
