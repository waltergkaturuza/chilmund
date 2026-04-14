import type { Metadata } from 'next'
import { Beaker, Droplets, Factory, Fish, FlaskConical, Leaf, Package, Pickaxe, Shirt, Waves } from 'lucide-react'
import React from 'react'

export const metadata: Metadata = {
  title: 'Uses of Aluminium Sulphate | Chilmund Chemicals',
  description:
    'Comprehensive guide to the applications of aluminium sulphate in water treatment, industry, agriculture, and more.',
}

const uses = [
  {
    icon: <Droplets className="size-6" />,
    title: 'Drinking Water Purification',
    desc: 'The primary use of aluminium sulphate is as a coagulant in municipal water treatment. It causes suspended impurities to clump together (flocculate) so they can be easily removed through sedimentation and filtration, producing clear, safe drinking water.',
    color: 'bg-blue-600',
  },
  {
    icon: <Factory className="size-6" />,
    title: 'Industrial Wastewater Treatment',
    desc: 'Used extensively in mining, food processing, and manufacturing plants to treat effluent water before discharge. Aluminium sulphate removes heavy metals, organic matter, and suspended solids from industrial wastewater.',
    color: 'bg-slate-700',
  },
  {
    icon: <Waves className="size-6" />,
    title: 'Sewage Treatment',
    desc: 'Municipal sewage treatment plants use aluminium sulphate to reduce phosphorus levels and clarify wastewater. It helps meet environmental discharge standards and protects downstream water bodies.',
    color: 'bg-cyan-700',
  },
  {
    icon: <Package className="size-6" />,
    title: 'Paper & Pulp Manufacturing',
    desc: 'Acts as a sizing agent in papermaking, improving water resistance, ink holdout, and printability. It also aids in retention of fillers and fines during the paper manufacturing process.',
    color: 'bg-amber-700',
  },
  {
    icon: <Shirt className="size-6" />,
    title: 'Textile Industry',
    desc: 'Used as a mordant to fix dyes onto fabric fibres, ensuring colour fastness. Also used for pH adjustment in various textile processing stages including finishing and printing.',
    color: 'bg-violet-700',
  },
  {
    icon: <Leaf className="size-6" />,
    title: 'Soil Amendment & Agriculture',
    desc: 'Lowers soil pH for acid-loving plants (azaleas, blueberries, hydrangeas). Helps control phosphorus runoff from agricultural land, reducing eutrophication of waterways.',
    color: 'bg-emerald-700',
  },
  {
    icon: <Pickaxe className="size-6" />,
    title: 'Mining Industry',
    desc: 'Used for water clarification in mineral processing operations. Helps manage acid mine drainage and treat process water in gold, platinum, and coal mining operations across the region.',
    color: 'bg-orange-700',
  },
  {
    icon: <FlaskConical className="size-6" />,
    title: 'Chemical Manufacturing',
    desc: 'Serves as a raw material or reagent in the production of other aluminium compounds, catalysts, and speciality chemicals used in various industrial processes.',
    color: 'bg-rose-700',
  },
  {
    icon: <Fish className="size-6" />,
    title: 'Aquaculture & Lake Management',
    desc: 'Controls algae blooms in fish ponds, lakes, and reservoirs by binding excess phosphorus. Improves water clarity and dissolved oxygen levels for healthier aquatic ecosystems.',
    color: 'bg-teal-700',
  },
  {
    icon: <Beaker className="size-6" />,
    title: 'Cosmetics & Pharmaceuticals',
    desc: 'Found in antiperspirants, aftershave preparations, and styptic products. Also used in some pharmaceutical formulations as an astringent compound.',
    color: 'bg-pink-700',
  },
]

export default function UsesOfAluminiumSulphatePage() {
  return (
    <article className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 px-4 py-20 text-center text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Uses of Aluminium Sulphate
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
            From purifying drinking water for millions to enabling industrial processes — aluminium
            sulphate is one of the most versatile chemical compounds in use today.
          </p>
        </div>
      </section>

      {/* Uses grid */}
      <section className="bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
            {uses.map((u) => (
              <div
                key={u.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-slate-900/60"
              >
                <div className={`mb-4 flex size-12 items-center justify-center rounded-xl text-white ${u.color}`}>
                  {u.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white/60">
                  {u.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
