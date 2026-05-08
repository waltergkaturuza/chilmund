import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MutedAutoplayLoopVideo } from '@/heros/LowImpact/MutedAutoplayLoopVideo'
import { innerHeroRadialSection } from '@/utilities/pageHero'
import { getCachedGlobal } from '@/utilities/getGlobals'
import {
  CHILMUND_MANUFACTURING_PLANT_MAP_LABEL,
  resolveManufacturingPlantMapsEmbedUrl,
} from '@/utilities/manufacturingPlantMapsEmbed'
import { Factory, Gauge, HardHat, MapPin, Recycle, Shield, Truck, Zap } from 'lucide-react'
import React from 'react'

const HOME_HERO_DRONE_MP4_SRC = `/${encodeURIComponent('Chilmund drone mp4.mp4')}`

const facilityGallery = [
  {
    src: '/manufacturing plant.jpg',
    alt: 'Four large industrial chemical reactors suspended from a steel platform with yellow guardrails inside a modern factory.',
    caption:
      'Bindura manufacturing facility, engineered for dependable high-volume output.',
  },
  {
    src: '/Storage tanks.jpg',
    alt: 'Controlled liquid streams dispensing from a perforated pipe onto a metal processing surface.',
    caption:
      'Liquid Product Storage Tanks',
  },
  {
    src: '/Storage Tanks (2).jpg',
    alt: 'Chilmund Chemicals personnel in branded coveralls packing large bags of Aluminium sulphate beside industrial bagging machinery.',
    caption:
      'Storage Tanks',
  },
  {
    src: '/manufacturing/plant-logistics.png',
    alt: 'A forklift transports a pallet stacked with bulk chemical bags across a lined warehouse floor past safety bulletin boards.',
    caption:
      'Integrated material handling connects production to dispatch — streamlined movement that keeps deliveries on schedule.',
  },
] as const

export const metadata: Metadata = {
  title: 'Manufacturing Plant | Chilmund Chemicals',
  description:
    'Tour our state-of-the-art aluminium sulphate manufacturing plant in Bindura, Zimbabwe — 240 tonnes daily capacity.',
}

const highlights = [
  { icon: <Gauge className="size-5" />, title: '240 tonnes/day', desc: 'Daily production capacity with plans for expansion' },
  { icon: <Factory className="size-5" />, title: 'State-of-the-art', desc: 'Modern plant commissioned July 2023' },
  { icon: <Shield className="size-5" />, title: 'Quality assured', desc: 'Continuous testing and SAZ-certified output' },
  { icon: <Recycle className="size-5" />, title: 'Sustainable', desc: 'Environmentally responsible manufacturing processes' },
]

const features = [
  { icon: <Zap className="size-5" />, label: 'Automated reaction and drying systems for consistent quality' },
  { icon: <Shield className="size-5" />, label: 'On-site quality control laboratory for batch testing' },
  { icon: <HardHat className="size-5" />, label: 'Full SHEQ compliance with regular safety audits' },
  { icon: <Recycle className="size-5" />, label: 'Waste minimisation and effluent treatment facilities' },
  { icon: <Truck className="size-5" />, label: 'Integrated loading bay for efficient dispatch logistics' },
  { icon: <MapPin className="size-5" />, label: 'Strategically located in Bindura for raw material access' },
]

export default async function ManufacturingPlantPage() {
  const contact = await getCachedGlobal('company-contact', 0)()
  const embedSrc = resolveManufacturingPlantMapsEmbedUrl(contact?.googleMapsEmbedUrl)
  const plantAddress =
    contact?.manufacturingPlantAddress ?? '914/15 Kingston Road, Bindura, Zimbabwe'
  const openInGoogleMapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${CHILMUND_MANUFACTURING_PLANT_MAP_LABEL}, ${plantAddress}`)}`

  return (
    <article className="min-h-screen">
      {/* Hero */}
      <section className={innerHeroRadialSection}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Manufacturing Plant
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
            Our state-of-the-art aluminium sulphate manufacturing facility in Bindura, Zimbabwe,
            commissioned in July 2023, produces 240 tonnes of high-purity product daily.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-b border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.title} className="text-center">
              <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                {h.icon}
              </div>
              <div className="font-bold text-slate-900 dark:text-white">{h.title}</div>
              <div className="mt-1 text-sm text-slate-500 dark:text-white/50">{h.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Facility gallery */}
      <section className="border-b border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-slate-950">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
            {facilityGallery.map((item) => (
              <figure
                key={item.src}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/80 dark:shadow-none"
              >
                <div className="relative aspect-[4/3] w-full bg-slate-200 dark:bg-slate-800">
                  {item.src === '/manufacturing plant.jpg' ? (
                    <MutedAutoplayLoopVideo
                      src={HOME_HERO_DRONE_MP4_SRC}
                      className="absolute inset-0 size-full object-cover object-center"
                      aria-label="Aerial view of Chilmund manufacturing facility"
                    />
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                </div>
                <figcaption className="border-t border-slate-100 px-5 py-4 text-sm leading-relaxed text-slate-600 dark:border-white/10 dark:text-white/70 md:px-6 md:py-5 md:text-[0.9375rem]">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Plant features */}
      <section className="bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-center text-2xl font-extrabold text-slate-900 dark:text-white">
            Plant Capabilities
          </h2>
          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {features.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-6 py-4 dark:border-white/10 dark:bg-slate-900/60"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                  {f.icon}
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-white/80">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-white dark:bg-slate-900">
        <div className="container mx-auto max-w-7xl px-4 py-8 text-center md:py-10">
          <MapPin className="mx-auto size-9 text-blue-600 dark:text-blue-400 md:size-10" />
          <h2 className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white md:mt-2">Location</h2>
          <p className="mx-auto mt-2 max-w-none text-pretty text-base leading-snug text-slate-600 text-balance dark:text-white/60 md:text-lg md:leading-normal">
            Our manufacturing plant is strategically located in <strong>Bindura, Zimbabwe</strong>,
            providing easy access to bauxite raw materials and key transport routes for distribution
            across Southern and East Africa.
          </p>
          <p className="mx-auto mt-1.5 max-w-none text-pretty text-sm text-slate-500 text-balance dark:text-white/45 md:text-[0.9375rem]">
            {plantAddress}
          </p>

          {embedSrc ? (
            <div className="mx-auto mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-lg dark:border-white/15 dark:bg-slate-950 dark:shadow-none md:mt-8">
              <iframe
                title={`Google Maps — ${CHILMUND_MANUFACTURING_PLANT_MAP_LABEL}`}
                className="aspect-video min-h-[280px] w-full border-0 sm:min-h-[380px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={embedSrc}
              />
              <div className="border-t border-slate-100 bg-white px-4 py-3 text-center text-[0.8125rem] text-slate-600 dark:border-white/10 dark:bg-slate-900/90 dark:text-white/55">
                <span className="font-semibold text-slate-800 dark:text-white/90">
                  {CHILMUND_MANUFACTURING_PLANT_MAP_LABEL}
                </span>
                {' · '}
                <span>Open in Maps for directions and satellite view.</span>
              </div>
            </div>
          ) : (
            <p className="mx-auto mt-6 max-w-lg rounded-xl border border-dashed border-slate-300 px-6 py-6 text-sm text-slate-600 dark:border-white/20 dark:text-white/60 md:mt-8">
              Interactive map unavailable. Configure <strong className="text-slate-800 dark:text-white">Google Maps embed URL</strong> under Company contact in the admin panel, or{' '}
              <a
                className="font-semibold text-blue-600 underline underline-offset-2 hover:text-blue-700 dark:text-blue-400"
                href={openInGoogleMapsHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                open {CHILMUND_MANUFACTURING_PLANT_MAP_LABEL} in Google Maps
              </a>
              .
            </p>
          )}

          {embedSrc ? (
            <div className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm md:mt-5">
              <Link
                className="font-semibold text-blue-600 underline-offset-4 transition-colors hover:underline dark:text-blue-400"
                href="/bindura-map"
              >
                Full-screen map page →
              </Link>
              <a
                className="font-semibold text-blue-600 underline-offset-4 transition-colors hover:underline dark:text-blue-400"
                href={openInGoogleMapsHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                Open in Google Maps (new tab) →
              </a>
            </div>
          ) : null}
        </div>
      </section>
    </article>
  )
}
