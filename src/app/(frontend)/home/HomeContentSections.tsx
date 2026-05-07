import Link from 'next/link'
import {
  Award,
  BadgeCheck,
  Building2,
  Handshake,
  HeartHandshake,
  Leaf,
  Medal,
  ShieldCheck,
  Sparkles,
  Sprout,
  Trophy,
  Video,
} from 'lucide-react'
import React from 'react'

const linkCls =
  'font-semibold text-blue-700 underline-offset-4 transition-colors hover:text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300'

/**
 * Styled home storytelling (pillars → vision → products → SHEQ → CSR → awards → resources link).
 * Linked to main site destinations; replaces plain CMS RichText blocks for `home`.
 */
export function HomeContentSections() {
  return (
    <div className="home-content-sections space-y-0 [&_section]:scroll-mt-20">
      {/* Three pillars */}
      <section className="border-b border-slate-200/90 bg-white py-16 dark:border-white/10 dark:bg-slate-950 md:py-22">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center md:mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700 dark:text-blue-400">Foundation</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-4xl">
              Our three pillars
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-white/55">
              How we prioritise excellence at every interaction — grounded in{' '}
              <Link className={linkCls} href="/about-chilmund">
                who we are
              </Link>
              .
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <PillarCard
              icon={<Trophy className="size-7" />}
              hue="from-amber-500/90 to-amber-700"
              title="Quality"
              subtitle="Highest global standards"
              body="We deliver world-class products that meet rigorous specifications and audit-driven consistency."
              foot={
                <>
                  Dive deeper into assurance in{' '}
                  <Link className={linkCls} href="/sheq">
                    SHEQ &amp; laboratory
                  </Link>
                  .
                </>
              }
            />
            <PillarCard
              icon={<Handshake className="size-7" />}
              hue="from-emerald-500/90 to-emerald-800"
              title="Affordability"
              subtitle="Inclusive access"
              body="We design solutions so that safe water chemistry remains accessible regardless of economic context."
              foot={
                <>
                  Explore{' '}
                  <Link className={linkCls} href="/csr">
                    community impact &amp; CSR programmes
                  </Link>
                  .
                </>
              }
            />
            <PillarCard
              icon={<HeartHandshake className="size-7" />}
              hue="from-blue-600/95 to-blue-900"
              title="Service excellence"
              subtitle="Reliability on spec &amp; schedule"
              body="Customer satisfaction anchors every dispatch — disciplined logistics, proactive communication and follow-through."
              foot={
                <>
                  Logistics &amp; fleet:{' '}
                  <Link className={linkCls} href="/trucking-logistics">
                    trucking &amp; fulfilment
                  </Link>
                  .
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* Vision & mission */}
      <section className="border-b border-slate-200/90 bg-slate-50 py-16 dark:border-white/10 dark:bg-slate-900/50 md:py-22">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-[linear-gradient(155deg,_oklch(22%_0.06_250deg)_0%,_oklch(16%_0.05_248deg)_100%)] px-8 py-10 text-white shadow-xl dark:border-white/15">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-blue-400/25 blur-2xl"
              />
              <BadgeCheck className="relative mb-5 size-9 text-emerald-300" />
              <h2 className="relative text-xl font-bold uppercase tracking-wide text-white/95">Our vision</h2>
              <p className="relative mt-4 text-[1.05rem] leading-relaxed text-white/82">
                To be the most sustainable and trusted Pan-African water treatment chemicals partner, empowering
                communities to thrive through clean, accessible water.
              </p>
              <p className="relative mt-6 text-sm font-medium text-white/55">
                Aligned with our{' '}
                <Link className="rounded-md bg-white/15 px-2 py-0.5 text-white underline-offset-4 hover:bg-white/25 hover:underline" href="/regional-markets">
                  regional roadmap
                </Link>{' '}
                and stakeholder commitments.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-xl dark:border-white/15 dark:bg-slate-950/80 dark:shadow-none">
              <Sprout className="mb-5 size-9 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-xl font-bold uppercase tracking-wide text-slate-900 dark:text-white">Our mission</h2>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-slate-700 dark:text-white/65">
                We deliver result-oriented water solutions that enhance lives and livelihoods, one drop at a time. Through
                responsible manufacturing and environmental stewardship, we aim to create lasting impact on people and
                the planet.
              </p>
              <Link
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-5 py-2.5 text-sm font-semibold text-blue-800 transition-colors hover:bg-blue-100 dark:border-blue-900/80 dark:bg-blue-950/50 dark:text-blue-100 dark:hover:bg-blue-950"
                href="/manufacturing-plant"
              >
                See the Bindura plant
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="border-b border-slate-200/90 bg-white py-16 dark:border-white/10 dark:bg-slate-950 md:py-22">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-4xl">
              Core values
            </h2>
            <p className="mt-3 text-slate-600 dark:text-white/55">
              Values we embed from boardroom to plant floor — also reflected across{' '}
              <Link className={linkCls} href="/meet-our-team">
                leadership &amp; teams
              </Link>
              .
            </p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:gap-5">
            {coreValues.map((v, i) => (
              <li
                key={v.title}
                className="group flex gap-4 rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-slate-50/95 p-5 shadow-sm transition-colors hover:border-blue-100 hover:shadow-md dark:border-white/10 dark:from-slate-900 dark:to-slate-950 dark:hover:border-blue-900/60"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white dark:bg-blue-700">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white/55">{v.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Products & applications */}
      <section className="border-b border-slate-200/90 bg-slate-50 py-16 dark:border-white/10 dark:bg-slate-900/50 md:py-22">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-600/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-800 dark:bg-blue-500/20 dark:text-blue-300">
                <Sparkles className="size-3.5" />
                Portfolio
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                Product excellence
              </h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-slate-700 dark:text-white/65">
                <strong className="font-semibold text-slate-900 dark:text-white">Products:</strong> granular, liquid and
                kibbled aluminium sulphate — the &quot;universal coagulant&quot; for high-performance municipal water
                treatment, industrial processes, agriculture and mining.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  className="inline-flex rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500"
                  href="/products"
                >
                  Browse products
                </Link>
                <Link
                  className="inline-flex rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-white/20 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
                  href="/product-details"
                >
                  Specifications
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-white/70 bg-white p-8 shadow-lg dark:border-white/15 dark:bg-slate-950/80 lg:col-span-5">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
                <Building2 className="size-5 text-blue-600" />
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
              <Link
                className={`mt-8 inline-flex text-sm ${linkCls}`}
                href="/uses-aluminium-sulphate"
              >
                Uses of aluminium sulphate — full overview →
              </Link>

              <div className="mt-10 border-t border-slate-100 pt-8 dark:border-white/10">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Full-spectrum chemistry
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white/55">
                  Beyond alum, we formulate coagulants &amp; flocculants plus disinfectants to match your treatment train.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHEQ */}
      <section className="border-b border-slate-200/90 bg-white py-16 dark:border-white/10 dark:bg-slate-950 md:py-22">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_48%,#eef2ff_100%)] shadow-xl dark:border-white/15 dark:bg-[linear-gradient(135deg,oklch(18%_0.04_250deg)_0%,oklch(14%_0.035_248deg)_100%)] md:flex">
            <div className="flex-1 p-8 md:p-12 lg:max-w-[58%]">
              <ShieldCheck className="size-10 text-blue-600 dark:text-blue-400" />
              <h2 className="mt-6 text-2xl font-extrabold text-slate-900 dark:text-white md:text-3xl">
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
                  href="/sheq"
                >
                  SHEQ &amp; IMS hub
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  className={`inline-flex items-center gap-1 text-sm ${linkCls}`}
                  href="/sheq#laboratory"
                >
                  Laboratory capability
                </Link>
              </div>
              <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-white/70 p-4 dark:border-white/25 dark:bg-slate-900/60">
                <div className="flex items-start gap-3">
                  <Video className="size-5 shrink-0 text-slate-500 dark:text-white/45" aria-hidden />
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-white/45">
                    <strong className="font-semibold text-slate-900 dark:text-white">Brand story video</strong> — production,
                    fleet logistics, QC laboratory and stakeholder interviews will sit here once finalised alongside{' '}
                    <Link className={linkCls} href="/partnerships-accreditations">
                      SAZ, PRAZ &amp; innovator honours
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
            <aside className="flex flex-shrink-0 flex-col justify-between border-t border-slate-200 bg-slate-900/92 p-8 text-white dark:border-white/10 md:border-l md:border-t-0 lg:max-w-sm">
              <div>
                <Medal className="size-8 text-amber-400" />
                <p className="mt-4 text-sm leading-relaxed text-white/72">
                  Social proof dossiers — certification marks and partnership credentials — curated on our accreditations
                  centre.
                </p>
              </div>
              <Link
                className="inline-flex justify-center rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/25"
                href="/partnerships-accreditations"
              >
                Partnerships &amp; accreditations
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* CSR + Awards row */}
      <section className="border-b border-slate-200/90 bg-slate-50 py-16 dark:border-white/10 dark:bg-slate-900/40 md:py-22">
        <div className="container mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:gap-12">
          <div className="rounded-3xl border border-emerald-900/25 bg-emerald-950/[0.14] px-8 py-10 shadow-sm dark:bg-emerald-950/35">
            <Leaf className="size-10 text-emerald-500" />
            <h2 className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white">Impact (CSR)</h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-slate-700 dark:text-white/65">
              Investing upstream of our success: education bursaries, nutrition uplift for vulnerable households, and lasting
              livelihood pathways anchored in local manufacture.
            </p>
            <Link className={`mt-6 inline-flex gap-1 text-sm font-semibold ${linkCls}`} href="/csr">
              CSR programmes &amp; stories →
            </Link>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-xl dark:border-white/12 dark:bg-slate-950/85">
            <Award className="size-10 text-amber-500" />
            <h2 className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white">Industry accolades</h2>
            <ul className="mt-6 space-y-3 text-[0.9375rem] text-slate-700 dark:text-white/60">
              <li className="flex gap-2">
                <BadgeCheck className="mt-0.5 size-4 shrink-0 text-amber-600" />
                Best Exhibitor — SADC Industrialization Week
              </li>
              <li className="flex gap-2">
                <BadgeCheck className="mt-0.5 size-4 shrink-0 text-amber-600" />
                Company of the Year — Mashonaland Central
              </li>
              <li className="flex gap-2">
                <BadgeCheck className="mt-0.5 size-4 shrink-0 text-amber-600" />
                Best Innovator — National Business Awards
              </li>
              <li className="flex gap-2">
                <BadgeCheck className="mt-0.5 size-4 shrink-0 text-amber-600" />
                Outstanding Investor in Manufacturing — Africa Investment Leaders Forum &amp; Awards
              </li>
            </ul>
            <Link className={`mt-8 inline-flex text-sm ${linkCls}`} href="/industry-awards">
              Trophy cabinet &amp; citations →
            </Link>
          </div>
        </div>
      </section>

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

const coreValues = [
  { title: 'Quality', body: 'Rigorous monitoring at every stage ensures world-class products.' },
  { title: 'Integrity & excellence', body: 'Transparency and commitment to the highest standards guide our actions.' },
  { title: 'Teamwork & innovation', body: 'Collaboration drives us to evolve and deliver superior solutions.' },
  {
    title: 'Sustainable livelihoods & environment',
    body: 'We build a brighter future for people and the planet in harmony.',
  },
  { title: 'Diversity & inclusion', body: 'We celebrate the strengths of our talented team to drive collective success.' },
  {
    title: 'Growth-oriented partnerships',
    body: 'We invest in employees’ well-being and growth, fostering mutual success.',
  },
  {
    title: 'Positivity & empowerment',
    body: 'We cultivate optimism and resilience across teams and partnerships — approaching challenges with energy and conviction.',
  },
]

function PillarCard({
  icon,
  title,
  subtitle,
  body,
  foot,
  hue,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  body: string
  foot: React.ReactNode
  hue: string
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md dark:border-white/12 dark:bg-slate-950/85">
      <div className={`bg-gradient-to-br px-7 py-6 text-white shadow-inner ${hue}`}>
        <div className="flex items-center gap-3 opacity-[0.98]">{icon}</div>
        <h3 className="mt-4 text-xl font-bold tracking-tight">{title}</h3>
        <p className="text-sm font-medium text-white/85">{subtitle}</p>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className="flex-1 text-sm leading-relaxed text-slate-600 dark:text-white/58">{body}</p>
        <div className="mt-6 border-t border-slate-100 pt-5 text-[0.8125rem] leading-relaxed text-slate-500 dark:border-white/10 dark:text-white/45">
          {foot}
        </div>
      </div>
    </div>
  )
}
