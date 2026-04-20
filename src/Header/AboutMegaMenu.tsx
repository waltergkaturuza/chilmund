'use client'

import { cn } from '@/utilities/ui'
import { ChevronDown, Eye, Target, Heart, Award, Droplets, Shield, FlaskConical } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

const pillars = [
  {
    title: 'Quality',
    text: 'We deliver world-class products that meet the highest global standards.',
  },
  {
    title: 'Affordability',
    text: 'We ensure our solutions are accessible to all, regardless of economic status.',
  },
  {
    title: 'Service Excellence',
    text: 'We prioritize customer satisfaction through timely delivery and exceptional support.',
  },
]

const coreValues = [
  { title: 'Quality', text: 'Rigorous monitoring at every stage ensures world-class products.' },
  {
    title: 'Integrity & Excellence',
    text: 'Transparency and commitment to the highest standards guide our actions.',
  },
  {
    title: 'Teamwork & Innovation',
    text: 'Collaboration drives us to evolve and deliver superior solutions.',
  },
  {
    title: 'Sustainability',
    text: 'We build a brighter future for people and the planet in harmony.',
  },
  {
    title: 'Diversity & Inclusion',
    text: 'We celebrate the strengths of our talented team to drive collective success.',
  },
  {
    title: 'Growth Partnerships',
    text: "We invest in our employees' well-being and growth, fostering mutual success.",
  },
  {
    title: 'Positivity & Empowerment',
    text: 'We cultivate optimism, empowering our team to approach challenges with resilience.',
  },
]

const applications = [
  { label: 'Municipal water treatment', text: 'Efficient removal of suspended solids and pathogens.' },
  { label: 'Industrial processing', text: 'Essential for paper sizing and textile dyeing.' },
  { label: 'Agriculture & mining', text: 'Soil pH adjustment and wastewater remediation.' },
]

interface AboutMegaMenuProps {
  dark?: boolean
  /** Pill label from CMS (e.g. "About") — keep short for narrow desktops. */
  tabLabel: string
  tabStripItem: string
  tabStripActive: (dark?: boolean) => string
  tabStripIdle: (dark?: boolean) => string
  pathname: string
  links: { label: string; href: string }[]
}

export function AboutMegaMenu({
  dark,
  tabLabel,
  tabStripItem,
  tabStripActive,
  tabStripIdle,
  pathname,
  links,
}: AboutMegaMenuProps) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const anyActive = links.some((l) => pathname === l.href || pathname.startsWith(l.href + '/'))

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  useEffect(() => {
    return () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current)
    }
  }, [])

  const sectionTitle = 'mb-2 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-blue-500/90'
  const cardBg = dark ? 'rounded-lg bg-white/5 p-3' : 'rounded-lg bg-slate-50 p-3'

  return (
    <div
      ref={wrapRef}
      className="relative shrink-0"
      onMouseEnter={() => {
        if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null }
        setOpen(true)
      }}
      onMouseLeave={() => {
        leaveTimer.current = setTimeout(() => setOpen(false), 240)
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          tabStripItem,
          'cursor-pointer border-0 bg-transparent',
          anyActive || open ? tabStripActive(dark) : tabStripIdle(dark),
        )}
      >
        {tabLabel}
        <ChevronDown
          className={cn('size-3.5 shrink-0 opacity-80 transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {open && (
        /* pt-2 bridges trigger → panel so the pointer does not leave wrapRef in the gap */
        <div className="absolute left-0 top-full z-[60] w-[min(92vw,56rem)] pt-2" role="presentation">
          <div
            className={cn(
              'rounded-2xl border shadow-2xl',
              dark
                ? 'border-white/10 bg-slate-950/95 text-white backdrop-blur-md'
                : 'border-slate-200 bg-white text-slate-900 shadow-slate-300/40',
            )}
            role="menu"
          >
          <div className="grid gap-0 lg:grid-cols-[13rem_1fr]">
            {/* Left: nav links */}
            <div
              className={cn(
                'flex flex-col gap-0.5 rounded-l-2xl py-3',
                dark ? 'border-r border-white/10 bg-white/[0.02]' : 'border-r border-slate-100 bg-slate-50/60',
              )}
            >
              {links.map((l) => {
                const active = pathname === l.href
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block px-5 py-2.5 text-sm font-medium transition-colors',
                      active
                        ? dark ? 'bg-blue-600/20 text-blue-200' : 'bg-blue-100 text-blue-900'
                        : dark ? 'text-white/80 hover:bg-white/10 hover:text-white' : 'text-slate-700 hover:bg-slate-100',
                    )}
                  >
                    {l.label}
                  </Link>
                )
              })}
            </div>

            {/* Right: rich content */}
            <div className="max-h-[70vh] overflow-y-auto p-5">
              {/* Three pillars */}
              <div className="mb-5">
                <h4 className={sectionTitle}>
                  <Award className="mr-1.5 inline size-3.5 align-[-0.15em]" aria-hidden />
                  Our Three Pillars
                </h4>
                <div className="grid gap-2 sm:grid-cols-3">
                  {pillars.map((p) => (
                    <div key={p.title} className={cardBg}>
                      <p className="text-xs font-bold text-blue-700">{p.title}</p>
                      <p className={cn('mt-1 text-xs leading-relaxed', dark ? 'text-white/65' : 'text-slate-600')}>
                        {p.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vision & Mission side by side */}
              <div className="mb-5 grid gap-3 sm:grid-cols-2">
                <div className={cardBg}>
                  <h4 className={sectionTitle}>
                    <Eye className="mr-1.5 inline size-3.5 align-[-0.15em]" aria-hidden />
                    Our Vision
                  </h4>
                  <p className={cn('text-xs leading-relaxed', dark ? 'text-white/65' : 'text-slate-600')}>
                    To be the most sustainable and trusted Pan-African water treatment chemicals partner, empowering
                    communities to thrive through clean, accessible water.
                  </p>
                </div>
                <div className={cardBg}>
                  <h4 className={sectionTitle}>
                    <Target className="mr-1.5 inline size-3.5 align-[-0.15em]" aria-hidden />
                    Our Mission
                  </h4>
                  <p className={cn('text-xs leading-relaxed', dark ? 'text-white/65' : 'text-slate-600')}>
                    We deliver result-oriented water solutions that enhance lives and livelihoods, one drop at a time.
                    Through responsible manufacturing and environmental stewardship, we create a lasting impact on
                    people and the planet.
                  </p>
                </div>
              </div>

              {/* Core values */}
              <div className="mb-5">
                <h4 className={sectionTitle}>
                  <Heart className="mr-1.5 inline size-3.5 align-[-0.15em]" aria-hidden />
                  Core Values
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {coreValues.map((v) => (
                    <span
                      key={v.title}
                      title={v.text}
                      className={cn(
                        'inline-flex cursor-default rounded-full px-2.5 py-1 text-[0.65rem] font-semibold transition-colors',
                        dark
                          ? 'bg-white/8 text-white/75 hover:bg-white/15 hover:text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900',
                      )}
                    >
                      {v.title}
                    </span>
                  ))}
                </div>
              </div>

              {/* Product & Applications */}
              <div className="mb-4 grid gap-3 sm:grid-cols-2">
                <div className={cardBg}>
                  <h4 className={sectionTitle}>
                    <Droplets className="mr-1.5 inline size-3.5 align-[-0.15em]" aria-hidden />
                    Product Excellence
                  </h4>
                  <p className={cn('text-xs leading-relaxed', dark ? 'text-white/65' : 'text-slate-600')}>
                    <span className="font-semibold">Core product:</span> Granular, liquid and kibbled aluminium
                    sulphate — the &quot;universal coagulant&quot; for municipal water treatment, industrial
                    processing, agriculture and mining.
                  </p>
                  <p className={cn('mt-2 text-xs leading-relaxed', dark ? 'text-white/55' : 'text-slate-500')}>
                    Beyond our flagship alum, we provide coagulants &amp; flocculants and disinfectants.
                  </p>
                </div>
                <div className={cardBg}>
                  <h4 className={sectionTitle}>
                    <FlaskConical className="mr-1.5 inline size-3.5 align-[-0.15em]" aria-hidden />
                    Applications
                  </h4>
                  <ul className={cn('space-y-1.5 text-xs leading-relaxed', dark ? 'text-white/65' : 'text-slate-600')}>
                    {applications.map((a) => (
                      <li key={a.label}>
                        <span className="font-semibold">{a.label}:</span> {a.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* SHEQ */}
              <div className={cardBg}>
                <h4 className={sectionTitle}>
                  <Shield className="mr-1.5 inline size-3.5 align-[-0.15em]" aria-hidden />
                  Operational Integrity (SHEQ)
                </h4>
                <p className={cn('text-xs leading-relaxed', dark ? 'text-white/65' : 'text-slate-600')}>
                  At Chilmund, safety and quality are our licence to operate. Our fully fledged SHEQ department
                  adheres to global best practices. <strong>SAZ certified</strong> products carry the Standards
                  Association of Zimbabwe mark of quality. Our <strong>R&amp;D laboratory</strong> focuses on the
                  next generation of water treatment technology.
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  )
}
