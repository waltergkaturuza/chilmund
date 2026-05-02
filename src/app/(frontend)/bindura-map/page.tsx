import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import {
  CHILMUND_MANUFACTURING_PLANT_MAP_LABEL,
  resolveManufacturingPlantMapsEmbedUrl,
} from '@/utilities/manufacturingPlantMapsEmbed'
import { innerHeroRadialSection } from '@/utilities/pageHero'

export const metadata: Metadata = {
  title: 'Bindura plant location | Chilmund Chemicals',
  description:
    'Interactive map of the Chilmund Chemicals aluminium sulphate manufacturing plant in Bindura, Zimbabwe.',
}


export default async function BinduraPlantMapPage() {
  const contact = await getCachedGlobal('company-contact', 0)()

  const embedSrc = resolveManufacturingPlantMapsEmbedUrl(contact?.googleMapsEmbedUrl)
  const plantAddress =
    contact?.manufacturingPlantAddress ?? '914/15 Kingston Road, Bindura, Zimbabwe'
  const GOOGLE_MAPS_SEARCH = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${CHILMUND_MANUFACTURING_PLANT_MAP_LABEL}, ${plantAddress}`)}`
  return (
    <article className="min-h-screen pb-16">
      <section className={innerHeroRadialSection}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/35 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Bindura manufacturing plant · Map
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Locate our Bindura facility on Google Maps — {contact?.manufacturingPlantAddress || '914/15 Kingston Road, Bindura, Zimbabwe'}.
          </p>
          <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              className="text-sm font-semibold text-emerald-300 underline-offset-4 transition-colors hover:text-white hover:underline"
              href={GOOGLE_MAPS_SEARCH}
              rel="noopener noreferrer"
              target="_blank"
            >
              Open in Google Maps (new tab) →
            </a>
            <Link
              className="text-sm font-semibold text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
              href="/contact"
            >
              Contact us →
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-5xl px-4 py-10">
        {embedSrc ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-white/15 dark:bg-slate-950">
            <iframe
              className="aspect-video min-h-[320px] w-full border-0 sm:min-h-[400px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={embedSrc}
              title={`Google Maps — ${CHILMUND_MANUFACTURING_PLANT_MAP_LABEL}`}
            />
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600 dark:border-white/20 dark:bg-slate-900/50 dark:text-white/65">
            <p className="text-sm leading-relaxed">
              The interactive map embed is not configured yet. Ask your administrator to set{' '}
              <strong className="text-slate-800 dark:text-white">Google Maps embed URL</strong> under Payload →{' '}
              Company contact → Addresses &amp; quote, then redeploy — or{' '}
              <a className="font-semibold text-blue-600 underline hover:text-blue-500 dark:text-blue-400" href={GOOGLE_MAPS_SEARCH} rel="noopener noreferrer" target="_blank">
                open the plant coordinates in Google Maps
              </a>
              .
            </p>
          </div>
        )}
      </section>
    </article>
  )
}
