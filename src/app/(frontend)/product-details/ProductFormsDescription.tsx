import React from 'react'

const solidForms = [
  {
    name: 'Granular',
    detail: 'coarse product with a particle size ranging from 2 to 6.5 mm',
  },
  {
    name: 'Fines',
    detail: 'finely crushed product with a particle size ranging from 0.5 to 2 mm',
  },
  {
    name: 'Kibble',
    detail: 'loosely crushed product with a particle size ranging from 30 to 60 mm',
  },
  {
    name: 'Flakes',
    detail: 'flaked sheets with a thickness between 3 to 6.5 mm',
  },
] as const

export function ProductFormsDescription() {
  return (
    <div className="rounded-xl border border-slate-200/90 bg-slate-50/90 px-5 py-6 text-justify text-[0.9375rem] leading-relaxed text-slate-700 shadow-sm dark:border-white/10 dark:bg-slate-900/50 dark:text-white/62 sm:px-6 sm:py-7 sm:text-base">
      <div className="space-y-6">
        <div>
          <h3 className="text-left text-base font-bold tracking-tight text-slate-900 dark:text-white sm:text-lg">
            1. Solid Aluminium sulphate
          </h3>
          <p className="mt-3 text-justify">
            Is a white to off-white crystalline salt with a particle size ranging from 2&nbsp;-&nbsp;6.5&nbsp;mm.
            Comes in four product forms:
          </p>
          <ol className="mt-4 list-[lower-roman] space-y-2.5 pl-6 marker:font-medium marker:text-slate-800 dark:marker:text-white/80">
            {solidForms.map((form) => (
              <li key={form.name} className="text-justify pl-1">
                <span className="font-semibold text-slate-900 dark:text-white">{form.name}</span> - {form.detail}
              </li>
            ))}
          </ol>
        </div>
        <div className="border-t border-slate-200/80 pt-6 dark:border-white/10">
          <h3 className="text-left text-base font-bold tracking-tight text-slate-900 dark:text-white sm:text-lg">
            2. Liquid Alum
          </h3>
          <p className="mt-3 text-justify">
            A pale yellow to light brown liquid with customer specified Al₂O₃ content.
          </p>
        </div>
      </div>
    </div>
  )
}
