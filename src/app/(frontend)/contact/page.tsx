import type { Metadata } from 'next'
import Link from 'next/link'

import { innerHeroGradientInner, innerHeroGradientOuter } from '@/utilities/pageHero'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { CompanyContact } from '@/payload-types'
import React from 'react'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | Chilmund Chemicals',
  description:
    'Get in touch with Chilmund Chemicals — Southern Africa\'s leading aluminium sulphate manufacturer. Offices in Harare, manufacturing plant in Bindura.',
}

export default async function ContactPage() {
  const contact: CompanyContact = await getCachedGlobal('company-contact', 0)()

  return (
    <article className="pb-20 pt-0">
      {/* Hero banner */}
      <section className={innerHeroGradientOuter}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]" />
        <div className={innerHeroGradientInner}>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/75 md:text-xl">
            Whether you need a quotation, technical support, or want to explore a partnership — our
            team is ready to help.
          </p>
        </div>
      </section>

      {/* Contact cards + form */}
      <section className="container px-4 py-10 md:py-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* Left: contact details */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Get in touch</h2>
              <p className="mt-2 text-muted-foreground">
                Reach out through any of these channels — we typically respond within 24 hours.
              </p>
            </div>

            {/* Office cards */}
            <div className="space-y-4">
              {contact?.headOfficeAddress && (
                <ContactCard
                  title="Head Office — Harare"
                  lines={[
                    contact.headOfficeAddress,
                    ...(contact.salesPhone ? [`Tel: ${contact.salesPhone}`] : []),
                  ]}
                />
              )}

              {contact?.manufacturingPlantAddress && (
                <ContactCard
                  title="Manufacturing Plant — Bindura"
                  lines={[
                    contact.manufacturingPlantAddress,
                    ...(contact.phoneBinduraDisplay
                      ? [`Tel: ${contact.phoneBinduraDisplay}`]
                      : []),
                  ]}
                />
              )}
            </div>

            {/* Direct contacts */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Direct contacts
              </h3>

              {contact?.salesEmail && (
                <ContactRow
                  label="Sales"
                  value={contact.salesEmail}
                  href={`mailto:${contact.salesEmail}`}
                />
              )}
              {contact?.adminEmail && (
                <ContactRow
                  label="Admin"
                  value={contact.adminEmail}
                  href={`mailto:${contact.adminEmail}`}
                />
              )}
              {contact?.salesPhone && (
                <ContactRow
                  label="Harare"
                  value={contact.salesPhone}
                  href={contact.salesPhoneTel ? `tel:${contact.salesPhoneTel.replace(/\s/g, '')}` : undefined}
                />
              )}
              {contact?.phoneBinduraDisplay && (
                <ContactRow
                  label="Bindura"
                  value={contact.phoneBinduraDisplay}
                  href={contact.phoneBinduraTel ? `tel:${contact.phoneBinduraTel.replace(/\s/g, '')}` : undefined}
                />
              )}
              {contact?.whatsappNumber && (
                <ContactRow
                  label="WhatsApp"
                  value={`+${contact.whatsappNumber}`}
                  href={`https://wa.me/${contact.whatsappNumber}${contact.whatsappPrefillMessage ? '?text=' + encodeURIComponent(contact.whatsappPrefillMessage) : ''}`}
                  external
                />
              )}
              {contact?.whatsappNumberSecondary && (
                <ContactRow
                  label="WhatsApp"
                  value={`+${contact.whatsappNumberSecondary}`}
                  href={`https://wa.me/${contact.whatsappNumberSecondary}${contact.whatsappPrefillMessage ? '?text=' + encodeURIComponent(contact.whatsappPrefillMessage) : ''}`}
                  external
                />
              )}
            </div>
          </div>

          {/* Right: form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Plant map */}
      <section className="container px-4 pb-16">
        <p className="text-center text-sm text-muted-foreground">
          <Link
            className="font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
            href="/bindura-map"
          >
            View Bindura manufacturing plant on map →
          </Link>
        </p>
      </section>
    </article>
  )
}

/* ── Sub-components ──────────────────────────────────────────────────── */

function ContactCard({
  title,
  lines,
}: {
  title: string
  lines: string[]
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div>
        <h4 className="font-semibold">{title}</h4>
        {lines.map((line, i) => (
          <p key={i} className="mt-0.5 text-sm text-muted-foreground">
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

function ContactRow({
  label,
  value,
  href,
  external,
}: {
  label: string
  value: string
  href?: string
  external?: boolean
}) {
  const content = (
    <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted">
      <span className="shrink-0 font-medium text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  )

  if (href) {
    return (
      <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {content}
      </a>
    )
  }
  return content
}
