import type { Metadata } from 'next'
import { chilmundCopy } from '@/content/chilmundCopy'
import { User } from 'lucide-react'
import React from 'react'

export const metadata: Metadata = {
  title: 'Meet Our Team | Chilmund Chemicals',
  description:
    'Meet the leadership team driving Chilmund Chemicals\' growth as a Pan-African water treatment chemicals manufacturer.',
}

const COLORS = [
  'from-blue-600 to-blue-800',
  'from-emerald-600 to-emerald-800',
  'from-violet-600 to-violet-800',
  'from-rose-600 to-rose-800',
  'from-amber-600 to-amber-800',
  'from-cyan-600 to-cyan-800',
]

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function MeetOurTeamPage() {
  return (
    <article className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 px-4 py-20 text-center text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Meet Our Team</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
            Our experienced leadership team combines deep industry knowledge with a passion for
            sustainable water solutions across Africa.
          </p>
        </div>
      </section>

      {/* Team grid */}
      <section className="bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {chilmundCopy.team.map((member, i) => (
              <div
                key={member.name}
                className="group rounded-2xl border border-slate-200 bg-white p-6 text-center transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-slate-900/60"
              >
                <div
                  className={`mx-auto flex size-20 items-center justify-center rounded-full bg-gradient-to-br ${COLORS[i % COLORS.length]} text-2xl font-bold text-white shadow-lg`}
                >
                  {getInitials(member.name)}
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                  {member.role}
                </p>
              </div>
            ))}
          </div>

          {/* Join the team CTA */}
          <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-white/10 dark:bg-slate-800/50">
            <User className="mx-auto size-10 text-blue-600 dark:text-blue-400" />
            <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              Join Our Team
            </h3>
            <p className="mt-2 text-slate-600 dark:text-white/60">
              We&apos;re always looking for talented individuals to join our growing team. Currently
              employing 120+ people with plans to grow to 250.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-flex rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>
    </article>
  )
}
