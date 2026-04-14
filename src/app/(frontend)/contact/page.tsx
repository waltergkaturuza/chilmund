import type { Metadata } from 'next'

import { getCachedGlobal } from '@/utilities/getGlobals'
import type { CompanyContact } from '@/payload-types'
import { Building2, Factory, Globe, Mail, MapPin, Phone } from 'lucide-react'
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
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]" />
        <div className="container relative z-10 px-4 py-20 text-center md:py-28">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/75 md:text-xl">
            Whether you need a quotation, technical support, or want to explore a partnership — our
            team is ready to help.
          </p>
        </div>
      </section>

      {/* Contact cards + form */}
      <section className="container px-4 py-16 md:py-20">
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
                  icon={<MapPin className="size-5" />}
                  title="Head Office — Harare"
                  lines={[
                    contact.headOfficeAddress,
                    ...(contact.salesPhone ? [`Tel: ${contact.salesPhone}`] : []),
                  ]}
                />
              )}

              {contact?.manufacturingPlantAddress && (
                <ContactCard
                  icon={<Factory className="size-5" />}
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
                  icon={<Mail className="size-4" />}
                  label="Sales"
                  value={contact.salesEmail}
                  href={`mailto:${contact.salesEmail}`}
                />
              )}
              {contact?.adminEmail && (
                <ContactRow
                  icon={<Mail className="size-4" />}
                  label="Admin"
                  value={contact.adminEmail}
                  href={`mailto:${contact.adminEmail}`}
                />
              )}
              {contact?.salesPhone && (
                <ContactRow
                  icon={<Phone className="size-4" />}
                  label="Harare"
                  value={contact.salesPhone}
                  href={contact.salesPhoneTel ? `tel:${contact.salesPhoneTel.replace(/\s/g, '')}` : undefined}
                />
              )}
              {contact?.phoneBinduraDisplay && (
                <ContactRow
                  icon={<Phone className="size-4" />}
                  label="Bindura"
                  value={contact.phoneBinduraDisplay}
                  href={contact.phoneBinduraTel ? `tel:${contact.phoneBinduraTel.replace(/\s/g, '')}` : undefined}
                />
              )}
              {contact?.whatsappNumber && (
                <ContactRow
                  icon={<Globe className="size-4" />}
                  label="WhatsApp"
                  value={`+${contact.whatsappNumber}`}
                  href={`https://wa.me/${contact.whatsappNumber}${contact.whatsappPrefillMessage ? '?text=' + encodeURIComponent(contact.whatsappPrefillMessage) : ''}`}
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

      {/* Map section */}
      {contact?.googleMapsEmbedUrl && (
        <section className="container px-4 pb-16">
          <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
            <iframe
              className="h-80 w-full border-0 md:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={contact.googleMapsEmbedUrl.trim()}
              title="Chilmund Chemicals location"
            />
          </div>
        </section>
      )}
    </article>
  )
}

/* ── Sub-components ──────────────────────────────────────────────────── */

function ContactCard({
  icon,
  title,
  lines,
}: {
  icon: React.ReactNode
  title: string
  lines: string[]
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600">
        {icon}
      </div>
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
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
  external?: boolean
}) {
  const content = (
    <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted">
      <span className="text-blue-600">{icon}</span>
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
