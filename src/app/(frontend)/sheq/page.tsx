import type { Metadata } from 'next'
import Image from 'next/image'
import {
  Award,
  Building2,
  CheckCircle,
  ClipboardCheck,
  FileCheck,
  Leaf,
  Microscope,
  Recycle,
  Shield,
  Sprout,
  Users,
} from 'lucide-react'
import React from 'react'

import { cn } from '@/utilities/ui'

export const metadata: Metadata = {
  title: 'SHEQ & Integrated Management System | Chilmund Chemicals',
  description:
    'Safety, Health, Environment and Quality — SAZ-aligned IMS covering ISO 9001, ISO 14001 & ISO 45001. QC/QA processes, laboratory facilities, and community initiatives.',
}

const qcSteps = [
  {
    title: 'Process definition & SOPs',
    body:
      'All manufacturing steps are documented in controlled standard operating procedures. Staff receive documented training prior to implementation, with competency records maintained.',
  },
  {
    title: 'Change & deviation control',
    body:
      'Process changes follow formal change control with risk assessment and IMS Technical Committee approval. Deviations are logged, investigated via root cause analysis, and closed with corrective actions.',
  },
  {
    title: 'Raw material control',
    body:
      'Incoming raw materials are sampled per the sampling plan and tested against defined specifications. Only approved materials are released to production.',
  },
  {
    title: 'In-process QC & GLP',
    body:
      'Critical process parameters are monitored and recorded during production. Laboratory testing follows Good Laboratory Practices with calibrated equipment, traceable standards, and documented methods.',
  },
  {
    title: 'Final product testing & release',
    body:
      'Each batch is tested for key quality parameters including Al₂O₃ content, pH, insoluble matter, and heavy metals. Release is authorized only after QC/QA Officer review and sign-off against the Certificate of Analysis.',
  },
  {
    title: 'Batch sample retention',
    body:
      'Representative samples from every batch are retained under controlled conditions for the defined retention period to support investigations, customer queries, or regulatory review.',
  },
]

export default function SHEQPage() {
  return (
    <article className="min-h-screen text-pretty">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 px-4 py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/35 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-emerald-500/20">
            <Shield className="size-8 text-emerald-400" aria-hidden />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400/95">
            Safety · Health · Environment · Quality
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">SHEQ &amp; IMS</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            Integrated Management System commitments covering ISO&nbsp;9001, ISO&nbsp;14001, and ISO&nbsp;45001 — from
            certified processes to analytical capability and responsible community engagement.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="border-b border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950">
        <div className="container mx-auto max-w-4xl px-4 py-16 md:py-20">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            SHEQ &amp; Integrated Management System (IMS)
          </h2>
          <div className="mt-6 space-y-5 text-[1.0625rem] leading-[1.75] text-slate-700 dark:text-white/65">
            <p>
              At Chilmund Chemicals, Safety, Health, Environment, and Quality (SHEQ) are fundamental to how we operate.
              Our commitment is embedded in an{' '}
              <strong className="font-semibold text-slate-900 dark:text-white">Integrated Management System (IMS)</strong>{' '}
              that ensures responsible operations, protection of people and the environment, and consistent delivery of
              high-quality products and services.
            </p>
            <p className="font-medium text-slate-800 dark:text-white/85">
              Our dedication to safety, health, environmental integrity and quality underpins an arduous journey toward
              an Integrated Management System comprising <strong className="font-semibold">ISO&nbsp;9001</strong>,{' '}
              <strong className="font-semibold">ISO&nbsp;14001</strong>, and <strong className="font-semibold">ISO&nbsp;45001</strong>.
            </p>
            <p>
              Chilmund Chemicals is in the{' '}
              <strong className="font-semibold text-slate-900 dark:text-white">final follow-up audit and verification</strong>{' '}
              stages toward <strong className="font-semibold text-slate-900 dark:text-white">SAZ IMS certification</strong>.
              Throughout this journey we have cultivated a congruent IMS organisational culture, resolving
              non-conformities and issues of concern through structured root cause analysis, corrective actions, and
              strengthened internal audits. That persistence shows we are committed to continual improvement and compliance
              across Quality, Safety, Health, and Environment.
            </p>
          </div>
        </div>
      </section>

      {/* IMS status */}
      <section className="bg-slate-50 dark:bg-slate-900/80">
        <div className="container mx-auto max-w-4xl px-4 py-16 md:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-3">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <FileCheck className="size-6" aria-hidden />
              </span>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">IMS implementation status</h2>
                <p className="mt-1 text-sm font-medium uppercase tracking-wide text-blue-700 dark:text-blue-400">
                  Standards Association of Zimbabwe (SAZ)
                </p>
              </div>
            </div>
          </div>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-slate-700 dark:text-white/65">
            We are implementing our Integrated Management System with discipline and transparency. We have{' '}
            <strong className="font-semibold text-slate-900 dark:text-white">successfully completed a Stage&nbsp;2 certification audit</strong>{' '}
            conducted by SAZ and are currently awaiting a{' '}
            <strong className="font-semibold text-slate-900 dark:text-white">follow-up audit for final certification</strong>. This milestone
            demonstrates the effectiveness of our systems and our readiness for full IMS certification.
          </p>

          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white/90 p-6 dark:border-white/15 dark:bg-slate-950/60">
            <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-800 dark:text-white/85">
              <ClipboardCheck className="size-4 text-blue-600 dark:text-blue-400" aria-hidden />
              Integrated Management System policy
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-white/55">
              The formal IMS policy is a controlled document. For signed copies, controlled dissemination, or integration
              into tender submissions, please contact our SHEQ function or your Chilmund account representative.
            </p>
          </div>
        </div>
      </section>

      {/* On-site safety & health (photography) */}
      <section id="site-safety" className="scroll-mt-24 border-b border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-white/40">On the ground</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-3xl">
              Safety &amp; awareness across our facilities
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-slate-600 dark:text-white/58">
              IMS and ISO&nbsp;45001 commitments show up in maintained equipment, clear signage, forklift and lifting
              disciplines, and occupational health readiness — from fire points to first aid and hazard literacy.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-start">
            <SheqPhoto
              src="/sheq/fire-point.png"
              alt="Fire point with dual blue extinguishers and FIRE POINT sign at Chilmund facility"
              caption="Fire point — serviced extinguishers and visible emergency identification."
              aspectClass="aspect-[4/5] sm:aspect-[3/4]"
            />
            <SheqPhoto
              src="/sheq/forklift-safety-sign.png"
              alt="Forklift safety instruction sign: daily checks, horn, seat belts, forks lowered"
              caption="Powered industrial truck rules — daily checks, disciplined travel, and mandated PPE."
              aspectClass="aspect-[3/4] sm:aspect-[4/5]"
            />
          </div>

          <SheqPhoto
            src="/sheq/safety-signage-overview.png"
            alt="Workplace safety boards: pipe colour coding, lifting equipment inspection tags, hard hat colour codes"
            caption="Standardised visual controls — pipe identification, lifting-equipment colour tags, and role-based hard-hat coding."
            aspectClass="aspect-[16/11] md:aspect-[21/9]"
            className="mt-8"
          />

          <SheqPhoto
            src="/sheq/first-aid-hazard-awareness.png"
            alt="First aid station and workplace hazards awareness poster on wall"
            caption="First-aid station and hazard-awareness material supporting workforce health and preparedness."
            aspectClass="aspect-[3/4] sm:aspect-[16/11] md:aspect-[2/1]"
            className="mt-8 max-w-4xl lg:mx-auto"
          />
        </div>
      </section>

      {/* QC/QA */}
      <section id="qc-qa" className="scroll-mt-24 border-b border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950">
        <div className="container mx-auto max-w-4xl px-4 py-16 md:py-20">
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-blue-700">
              <Building2 className="size-6" aria-hidden />
            </span>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">QC / QA process</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-white/45">
                Aluminium sulphate — consistency, compliance, traceability across the lifecycle
              </p>
            </div>
          </div>
          <p className="mt-8 text-[1.0625rem] leading-relaxed text-slate-700 dark:text-white/65">
            Our QC/QA process for aluminium sulphate production is designed to deliver product consistency, regulatory
            compliance, and traceability throughout the manufacturing lifecycle:
          </p>
          <ul className="mt-10 space-y-6">
            {qcSteps.map((step) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-xl border border-slate-100 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-slate-900/40"
              >
                <CheckCircle className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{step.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white/55">{step.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-10 rounded-xl bg-blue-50/90 px-5 py-4 text-sm font-medium leading-relaxed text-blue-950 dark:bg-blue-950/35 dark:text-blue-100/95">
            This closed-loop system ensures non-conforming product can be intercepted early, quality data informs continual improvement, and full batch traceability is maintained from raw material to authorised release.
          </p>
        </div>
      </section>

      {/* Laboratory */}
      <section id="laboratory" className="scroll-mt-24 bg-slate-50 dark:bg-slate-900/80">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="flex flex-wrap items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white">
              <Microscope className="size-6" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Laboratory facilities</h2>
              <p className="mt-2 max-w-4xl text-[1.0625rem] leading-relaxed text-slate-700 dark:text-white/65">
                As a testament to our commitment to Quality, Chilmund has established a laboratory equipped with analytical
                instruments including an <strong className="font-semibold text-slate-900 dark:text-white">Atomic Absorption Spectrophotometer (AAS)</strong>,{' '}
                digital temperature / conductivity / pH meters, and a{' '}
                <strong className="font-semibold text-slate-900 dark:text-white">thermogravimetric moisture-content analyser</strong>. Quarterly
                calibrated equipment and certified volumetric glassware allow competent analysts to execute routine QC testing,
                complexometric titrations, and method-validation work underpinning authorised product release.
              </p>
              <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-start">
                <SheqPhoto
                  src="/sheq/lab-workstation-documentation.png"
                  alt="Laboratory bench with labelled volumetric flasks, EDTA and standard preparation documentation for QC testing."
                  caption="Documented preparations and calibrated glassware supporting traceable QC work."
                  aspectClass="aspect-[4/3] sm:aspect-[3/2]"
                />
                <SheqPhoto
                  src="/sheq/lab-analyst-titration.png"
                  alt="Analyst in PPE performing titration at fume hood with burettes and labelled reagents."
                  caption="Analyst-controlled titrations and fume-hood disciplines aligned with SHEQ protocols."
                  aspectClass="aspect-[4/3] sm:aspect-[3/2]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHEQ Approach PDCA */}
      <section className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950">
        <div className="container mx-auto max-w-4xl px-4 py-16 md:py-20">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Our SHEQ approach</h2>
          <p className="mt-4 max-w-3xl text-[1.0625rem] leading-relaxed text-slate-700 dark:text-white/65">
            We apply a structured{' '}
            <strong className="text-slate-900 dark:text-white">Plan → Do → Check → Act (PDCA)</strong> model to reinforce
            continuous improvement across Safety, Health, Environment, and Quality.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <PillarCard
              title="Safety"
              bullets={[
                'Hazard identification and risk assessments',
                'Safe work procedures and PPE discipline',
                'Incident reporting with investigation and corrective actions',
                'Ongoing safety training and behavioural awareness',
              ]}
              accent="bg-amber-600"
            />
            <PillarCard
              title="Health"
              bullets={[
                'Occupational health monitoring programmes',
                'Exposure control strategies for hazardous substances',
                'Employee wellness initiatives',
                'Workplace hygiene and ergonomics reviews',
              ]}
              accent="bg-rose-600"
            />
            <PillarCard
              title="Environment"
              bullets={[
                'Responsible chemical handling and warehousing',
                'Waste-reduction and recycling initiatives',
                'Pollution-prevention safeguards',
                'Alignment with prevailing environmental statutes',
              ]}
              accent="bg-emerald-600"
            />
            <PillarCard
              title="Quality"
              bullets={[
                'Controlled QC/QA workflow with Certificate of Analysis alignment',
                'Laboratory-supported verification before batch release',
                'Granular KPIs and trend analysis — detailed registers maintained through the QC/QA office for audits and stakeholder requests',
              ]}
              accent="bg-blue-600"
            />
          </div>

          <h3 className="mt-16 text-lg font-bold text-slate-900 dark:text-white">How the SHEQ system is implemented</h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              'Integrated policies, procedures, and operational controls',
              'Periodic internal audits and externally witnessed SAZ certification audits',
              'Risk assessments and method statements prior to changing conditions',
              'Targeted competency development and SHEQ competency records',
              'Incident investigation paired with corrective & preventive actions',
              'Performance monitoring dashboards and escalation to leadership',
              'Scheduled management reviews of IMS effectiveness',
            ].map((line) => (
              <li
                key={line}
                className="flex gap-3 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm leading-snug text-slate-700 dark:border-white/10 dark:bg-slate-900/50 dark:text-white/65"
              >
                <span className="shrink-0 text-blue-600 dark:text-blue-400" aria-hidden>
                  ›
                </span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recognition */}
      <section className="bg-slate-50 dark:bg-slate-900/80">
        <div className="container mx-auto max-w-4xl px-4 py-16 md:py-20">
          <div className="flex items-center gap-3">
            <Award className="size-8 text-amber-600 dark:text-amber-400" aria-hidden />
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Recognition &amp; achievements</h2>
          </div>
          <div className="mt-8 rounded-2xl border border-amber-200/80 bg-white p-8 shadow-sm dark:border-amber-900/40 dark:bg-slate-950/60">
            <p className="text-[1.05rem] leading-relaxed text-slate-800 dark:text-white/80">
              <strong className="font-semibold text-slate-900 dark:text-white">National Social Security Authority — 2023</strong>
              <br />
              Recognised for <em>exemplary leadership in occupational safety &amp; health management</em> and good workplace safety practices.
            </p>
          </div>
        </div>
      </section>

      {/* Environmental & community */}
      <section className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950">
        <div className="container mx-auto max-w-4xl px-4 py-16 md:pb-24 md:pt-20">
          <div className="flex flex-wrap items-center gap-3">
            <Sprout className="size-8 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Environmental &amp; community initiatives</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-white/45">
                Extending stewardship beyond manufacturing
              </p>
            </div>
          </div>
          <p className="mt-8 text-[1.0625rem] leading-relaxed text-slate-700 dark:text-white/65">
            Chilmund extends environmental accountability beyond factory boundaries by collaborating with neighbouring communities toward cleaner, safer surroundings.
          </p>
          <h3 className="mt-10 flex flex-wrap items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
            <Recycle className="size-5 shrink-0 text-emerald-600" aria-hidden />
            Clean-up campaign participation
          </h3>
          <ul className="mt-6 space-y-4">
            {[
              'Engagement with workplace-led and municipality-linked clean-ups',
              'Participation in national programmes such as National Clean-Up Day Zimbabwe',
              'Visible environmental awareness reinforcement for crews and stakeholder partners',
              'Promoting segregation, recycling, and responsible waste stewardship',
            ].map((t) => (
              <li key={t} className="flex gap-3 text-slate-700 dark:text-white/65">
                <Leaf className="mt-1 size-4 shrink-0 text-emerald-600 dark:text-emerald-500/90" aria-hidden />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[1.0625rem] leading-relaxed text-slate-700 dark:text-white/65">
            These initiatives strengthen ISO&nbsp;14001-aligned objectives — reducing preventable pollution while nurturing a pragmatic culture of sustainability.
          </p>

          <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center dark:border-white/12 dark:bg-slate-900/40">
            <Users className="mx-auto size-10 text-slate-400 dark:text-white/35" aria-hidden />
            <p className="mt-3 text-sm text-slate-600 dark:text-white/55">
              Community stewardship photography — placeholders for forthcoming assets.
            </p>
          </div>
        </div>
      </section>
    </article>
  )
}

function PillarCard({
  title,
  bullets,
  accent,
}: {
  title: string
  bullets: string[]
  accent: string
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/55">
      <div className={`flex items-center gap-2 px-5 py-3.5 text-white ${accent}`}>
        <Shield className="size-5 opacity-95" aria-hidden />
        <h3 className="text-base font-bold">{title}</h3>
      </div>
      <ul className="space-y-2.5 px-5 py-4 text-sm leading-relaxed text-slate-600 dark:text-white/60">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-white/40" aria-hidden />
            {b}
          </li>
        ))}
      </ul>
    </div>
  )
}

function SheqPhoto({
  src,
  alt,
  caption,
  aspectClass,
  className,
}: {
  src: string
  alt: string
  caption: string
  aspectClass: string
  className?: string
}) {
  return (
    <figure className={cn('group', className)}>
      <div
        className={`relative w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-[0_14px_40px_-12px_rgba(15,23,42,0.35)] ring-1 ring-black/[0.04] dark:border-white/10 dark:bg-slate-900 dark:shadow-none ${aspectClass}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <figcaption className="mt-3 text-center text-xs leading-snug text-slate-500 dark:text-white/45 md:text-left">
        {caption}
      </figcaption>
    </figure>
  )
}
