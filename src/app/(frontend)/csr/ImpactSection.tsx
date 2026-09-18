import React from 'react'

/** Impact intro card — sits in the CSR sidebar below “Our commitment”. */
export function ImpactCard() {
  return (
    <div className="home-card w-full rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-xl dark:border-white/12 dark:bg-slate-950/85">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Impact (CSR)</h2>
      <p className="mt-4 text-[1.0625rem] leading-relaxed text-slate-700 dark:text-white/65">
        Investing upstream of our success: education bursaries, nutrition uplift for vulnerable households, and lasting
        livelihood pathways anchored in local manufacture.
      </p>
    </div>
  )
}
