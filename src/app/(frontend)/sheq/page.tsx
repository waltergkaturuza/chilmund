import type { Metadata } from 'next'
import { AlertTriangle, CheckCircle, HardHat, Heart, Leaf, Recycle, Shield, Target } from 'lucide-react'
import React from 'react'

export const metadata: Metadata = {
  title: 'SHEQ | Chilmund Chemicals',
  description:
    'Safety, Health, Environment, and Quality — the pillars that guide every aspect of Chilmund Chemicals\' operations.',
}

const pillars = [
  {
    icon: <HardHat className="size-7" />,
    title: 'Safety',
    color: 'bg-amber-600',
    points: [
      'Zero-harm workplace culture with daily toolbox talks',
      'Regular safety drills and emergency response training',
      'Full PPE compliance across all operational areas',
      'Incident reporting and root-cause analysis systems',
    ],
  },
  {
    icon: <Heart className="size-7" />,
    title: 'Health',
    color: 'bg-red-600',
    points: [
      'Occupational health monitoring and medical surveillance',
      'On-site first aid facilities and trained responders',
      'Chemical exposure monitoring and control',
      'Employee wellness programmes and support',
    ],
  },
  {
    icon: <Leaf className="size-7" />,
    title: 'Environment',
    color: 'bg-emerald-600',
    points: [
      'Environmental Impact Assessment (EIA) approved operations',
      'Waste minimisation and responsible disposal practices',
      'Effluent treatment before any environmental discharge',
      'Energy efficiency and carbon footprint reduction initiatives',
    ],
  },
  {
    icon: <Shield className="size-7" />,
    title: 'Quality',
    color: 'bg-blue-600',
    points: [
      'ISO 9001:2015 Quality Management System',
      'SAZ (Standards Association of Zimbabwe) certified products',
      'On-site laboratory for continuous batch testing',
      'Customer feedback loop for continuous improvement',
    ],
  },
]

const commitments = [
  { icon: <Target className="size-5" />, text: 'Achieve and maintain zero workplace injuries' },
  { icon: <Recycle className="size-5" />, text: 'Minimise environmental impact through sustainable practices' },
  { icon: <Shield className="size-5" />, text: 'Deliver consistent product quality meeting international standards' },
  { icon: <AlertTriangle className="size-5" />, text: 'Identify and manage risks proactively across all operations' },
  { icon: <CheckCircle className="size-5" />, text: 'Comply with all applicable legislation and industry best practices' },
  { icon: <Heart className="size-5" />, text: 'Promote a culture of health, wellbeing, and continuous improvement' },
]

export default function SHEQPage() {
  return (
    <article className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 px-4 py-20 text-center text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl">
          <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-emerald-500/20">
            <Shield className="size-8 text-emerald-400" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            SHEQ
          </h1>
          <p className="mx-auto mt-2 text-lg font-medium text-blue-400">
            Safety · Health · Environment · Quality
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
            SHEQ is at the heart of everything we do. Our integrated management system ensures
            the safety of our people, the health of our communities, the protection of our
            environment, and the quality of our products.
          </p>
        </div>
      </section>

      {/* Four pillars */}
      <section className="bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-center text-2xl font-extrabold text-slate-900 dark:text-white">
            The Four Pillars
          </h2>
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900/60"
              >
                <div className={`flex items-center gap-3 px-6 py-4 text-white ${p.color}`}>
                  {p.icon}
                  <h3 className="text-lg font-bold">{p.title}</h3>
                </div>
                <div className="space-y-3 p-6">
                  {p.points.map((point) => (
                    <div key={point} className="flex gap-3">
                      <CheckCircle className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm text-slate-600 dark:text-white/60">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-center text-2xl font-extrabold text-slate-900 dark:text-white">
            Our SHEQ Commitments
          </h2>
          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {commitments.map((c) => (
              <div
                key={c.text}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-6 py-4 dark:border-white/10 dark:bg-slate-800/50"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                  {c.icon}
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-white/80">{c.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
