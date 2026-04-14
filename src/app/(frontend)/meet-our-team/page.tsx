import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { chilmundCopy } from '@/content/chilmundCopy'
import { Linkedin, Mail, User, Users } from 'lucide-react'
import React from 'react'

export const metadata: Metadata = {
  title: 'Meet Our Team | Chilmund Chemicals',
  description:
    'Meet the leadership team driving Chilmund Chemicals\' growth as a Pan-African water treatment chemicals manufacturer.',
}

type MediaDoc = { url?: string | null; sizes?: Record<string, { url?: string | null }> | null }

function resolveImage(media: unknown): string | null {
  if (!media || typeof media !== 'object') return null
  const m = media as MediaDoc
  return m.sizes?.medium?.url || m.sizes?.small?.url || m.url || null
}

type TeamMember = {
  name: string
  jobTitle: string
  department: string | null
  photo: string | null
  bio: string | null
  email: string | null
  linkedIn: string | null
  featured: boolean
}

const DEPT_LABELS: Record<string, string> = {
  management: 'Executive / Management',
  finance: 'Finance & Admin',
  business: 'Business Development',
  production: 'Production & Maintenance',
  research: 'Research & Compliance',
  engineering: 'Engineering',
  hr: 'Human Resources',
  quality: 'Quality Assurance',
  sheq: 'SHEQ & Safety',
  logistics: 'Supply Chain & Logistics',
  other: 'Other',
}

const GRADIENT_COLORS = [
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

const fallbackTeam: TeamMember[] = chilmundCopy.team.map((m) => ({
  name: m.name,
  jobTitle: m.role,
  department: null,
  photo: null,
  bio: null,
  email: null,
  linkedIn: null,
  featured: false,
}))

export default async function MeetOurTeamPage() {
  let members: TeamMember[] = fallbackTeam

  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'team-members',
      where: { _status: { equals: 'published' } },
      sort: 'order',
      limit: 100,
      depth: 1,
    })

    if (docs.length > 0) {
      members = docs.map((doc) => ({
        name: doc.name,
        jobTitle: doc.jobTitle,
        department: doc.department || null,
        photo: resolveImage(doc.photo),
        bio: doc.bio || null,
        email: doc.email || null,
        linkedIn: doc.linkedIn || null,
        featured: doc.featured ?? false,
      }))
    }
  } catch {
    // fall back to hardcoded data
  }

  const featured = members.filter((m) => m.featured)
  const rest = members.filter((m) => !m.featured)

  return (
    <article className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 px-4 py-20 text-center text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl">
          <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-blue-500/20">
            <Users className="size-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Meet Our Team</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
            Our experienced leadership team combines deep industry knowledge with a passion for
            sustainable water solutions across Africa.
          </p>
        </div>
      </section>

      {/* Featured members (larger cards) */}
      {featured.length > 0 && (
        <section className="bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4 pt-16">
            <h2 className="text-center text-2xl font-extrabold text-slate-900 dark:text-white">
              Leadership
            </h2>
            <div className="mx-auto mt-10 grid max-w-4xl gap-8 sm:grid-cols-2">
              {featured.map((m, i) => (
                <FeaturedCard key={m.name} member={m} colorIdx={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team grid */}
      <section className="bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 py-16">
          {featured.length > 0 && (
            <h2 className="mb-10 text-center text-2xl font-extrabold text-slate-900 dark:text-white">
              The Team
            </h2>
          )}
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((member, i) => (
              <MemberCard key={member.name} member={member} colorIdx={i + featured.length} />
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

function FeaturedCard({ member, colorIdx }: { member: TeamMember; colorIdx: number }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-xl dark:border-white/10 dark:bg-slate-900/60">
      {/* Photo or gradient avatar */}
      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-slate-100 dark:bg-slate-800">
        {member.photo ? (
          <img src={member.photo} alt={member.name} className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className={`flex size-28 items-center justify-center rounded-full bg-gradient-to-br ${GRADIENT_COLORS[colorIdx % GRADIENT_COLORS.length]} text-4xl font-bold text-white shadow-lg`}>
            {getInitials(member.name)}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{member.name}</h3>
        <p className="mt-1 text-sm font-semibold text-blue-600 dark:text-blue-400">{member.jobTitle}</p>
        {member.department && (
          <p className="mt-1 text-xs text-slate-400 dark:text-white/40">
            {DEPT_LABELS[member.department] || member.department}
          </p>
        )}
        {member.bio && (
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-white/60 line-clamp-4">
            {member.bio}
          </p>
        )}
        {(member.email || member.linkedIn) && (
          <div className="mt-4 flex gap-3">
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="flex size-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-blue-600 hover:text-blue-600 dark:border-white/15 dark:text-white/50 dark:hover:border-blue-400 dark:hover:text-blue-400"
                aria-label={`Email ${member.name}`}
              >
                <Mail className="size-4" />
              </a>
            )}
            {member.linkedIn && (
              <a
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-blue-600 hover:text-blue-600 dark:border-white/15 dark:text-white/50 dark:hover:border-blue-400 dark:hover:text-blue-400"
                aria-label={`${member.name} LinkedIn`}
              >
                <Linkedin className="size-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function MemberCard({ member, colorIdx }: { member: TeamMember; colorIdx: number }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 text-center transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-slate-900/60">
      {/* Photo or initials */}
      {member.photo ? (
        <div className="mx-auto size-24 overflow-hidden rounded-full border-4 border-slate-100 shadow-md dark:border-slate-800">
          <img src={member.photo} alt={member.name} className="size-full object-cover object-top" />
        </div>
      ) : (
        <div
          className={`mx-auto flex size-20 items-center justify-center rounded-full bg-gradient-to-br ${GRADIENT_COLORS[colorIdx % GRADIENT_COLORS.length]} text-2xl font-bold text-white shadow-lg`}
        >
          {getInitials(member.name)}
        </div>
      )}
      <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{member.name}</h3>
      <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">{member.jobTitle}</p>
      {member.department && (
        <p className="mt-1 text-xs text-slate-400 dark:text-white/40">
          {DEPT_LABELS[member.department] || member.department}
        </p>
      )}
      {member.bio && (
        <p className="mt-3 text-sm text-slate-500 dark:text-white/50 line-clamp-3">{member.bio}</p>
      )}
      {(member.email || member.linkedIn) && (
        <div className="mt-4 flex justify-center gap-3">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="flex size-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:border-blue-600 hover:text-blue-600 dark:border-white/15 dark:text-white/40 dark:hover:border-blue-400 dark:hover:text-blue-400"
              aria-label={`Email ${member.name}`}
            >
              <Mail className="size-3.5" />
            </a>
          )}
          {member.linkedIn && (
            <a
              href={member.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:border-blue-600 hover:text-blue-600 dark:border-white/15 dark:text-white/40 dark:hover:border-blue-400 dark:hover:text-blue-400"
              aria-label={`${member.name} LinkedIn`}
            >
              <Linkedin className="size-3.5" />
            </a>
          )}
        </div>
      )}
    </div>
  )
}
