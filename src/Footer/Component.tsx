import { getCachedGlobal } from '@/utilities/getGlobals'
import { MapPin, Phone, Mail, Factory } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { CompanyContact } from '@/payload-types'
import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

/* ── Brand SVG icons (not in lucide) ────────────────────────────────── */

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

/* ── Helpers ─────────────────────────────────────────────────────────── */

function handleToXUrl(handle: string | null | undefined): string | null {
  if (!handle?.trim()) return null
  const h = handle.trim().replace(/^@/, '')
  return `https://x.com/${h}`
}

function handleToInstagramUrl(handle: string | null | undefined): string | null {
  if (!handle?.trim()) return null
  const h = handle.trim().replace(/^@/, '')
  return `https://www.instagram.com/${h}/`
}

function isTrustedGoogleMapsEmbedUrl(url: string): boolean {
  const u = url.trim()
  return (
    u.startsWith('https://www.google.com/maps/embed') ||
    u.startsWith('https://maps.google.com/maps/embed')
  )
}

const iconLink =
  'group inline-flex items-center gap-2.5 transition-colors hover:text-white'
const iconClass = 'size-4 shrink-0 text-amber-400/80 transition-colors group-hover:text-amber-300'
const socialIconBtn =
  'flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-white'

/* ── Component ──────────────────────────────────────────────────────── */

export async function Footer() {
  const [footerData, contact]: [Footer, CompanyContact] = await Promise.all([
    getCachedGlobal('footer', 1)(),
    getCachedGlobal('company-contact', 0)(),
  ])

  const navItems = footerData?.navItems || []

  const xUrl = contact?.socialTwitter ? handleToXUrl(contact.socialTwitter) : null
  const igUrl = contact?.socialInstagram ? handleToInstagramUrl(contact.socialInstagram) : null

  const socialLinks = [
    xUrl && { href: xUrl, label: `${contact?.socialTwitter} on X`, Icon: XIcon },
    igUrl && {
      href: igUrl,
      label: `${contact?.socialInstagram} on Instagram`,
      Icon: InstagramIcon,
    },
    (contact?.linkedinUrl || contact?.socialLinkedIn) && {
      href: contact?.linkedinUrl || '#',
      label: contact?.socialLinkedIn || 'LinkedIn',
      Icon: LinkedInIcon,
      external: !!contact?.linkedinUrl,
    },
    (contact?.facebookUrl || contact?.socialFacebook) && {
      href: contact?.facebookUrl || '#',
      label: contact?.socialFacebook || 'Facebook',
      Icon: FacebookIcon,
      external: !!contact?.facebookUrl,
    },
  ].filter(Boolean) as {
    href: string
    label: string
    Icon: React.FC<{ className?: string }>
    external?: boolean
  }[]

  return (
    <footer className="mt-auto border-t border-white/10 bg-[linear-gradient(180deg,oklch(16%_0.04_250deg)_0%,oklch(12%_0.035_250deg)_100%)] text-white">
      <div className="container py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* ── Column 1: brand + addresses ──────────────────────── */}
          <div className="lg:col-span-4">
            <Link className="inline-flex" href="/">
              <Logo variant="light" />
            </Link>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">
              Trailblazing water treatment manufacturing from Bindura — up to 7,200 metric tons of
              aluminium sulphate per month. Quality, affordability, and service excellence for
              municipalities, industry, and communities across Southern Africa.
            </p>

            {(contact?.headOfficeAddress || contact?.manufacturingPlantAddress) && (
              <div className="mt-6 space-y-3 text-sm text-white/75">
                {contact.headOfficeAddress && (
                  <div className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-amber-400/80" />
                    <div>
                      <span className="font-semibold text-amber-300/90">Head office</span>
                      <br />
                      {contact.headOfficeAddress}
                    </div>
                  </div>
                )}
                {contact.manufacturingPlantAddress && (
                  <div className="flex items-start gap-2.5">
                    <Factory className="mt-0.5 size-4 shrink-0 text-amber-400/80" />
                    <div>
                      <span className="font-semibold text-amber-300/90">Manufacturing plant</span>
                      <br />
                      {contact.manufacturingPlantAddress}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Column 2: contact + sitemap ──────────────────────── */}
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300/90">
                Contact
              </h3>
              <div className="mt-4 flex flex-col gap-3 text-sm text-white/75">
                {contact?.salesPhone && (
                  <div className="flex items-start gap-2.5">
                    <Phone className="mt-0.5 size-4 shrink-0 text-amber-400/80" />
                    <div>
                      <span className="text-white/50">Harare</span>
                      <br />
                      {contact.salesPhoneTel ? (
                        <a
                          className="hover:text-white"
                          href={`tel:${contact.salesPhoneTel.replace(/\s/g, '')}`}
                        >
                          {contact.salesPhone}
                        </a>
                      ) : (
                        contact.salesPhone
                      )}
                    </div>
                  </div>
                )}
                {contact?.phoneBinduraDisplay && (
                  <div className="flex items-start gap-2.5">
                    <Phone className="mt-0.5 size-4 shrink-0 text-amber-400/80" />
                    <div>
                      <span className="text-white/50">Bindura</span>
                      <br />
                      {contact.phoneBinduraTel ? (
                        <a
                          className="hover:text-white"
                          href={`tel:${contact.phoneBinduraTel.replace(/\s/g, '')}`}
                        >
                          {contact.phoneBinduraDisplay}
                        </a>
                      ) : (
                        contact.phoneBinduraDisplay
                      )}
                    </div>
                  </div>
                )}
                {contact?.salesEmail && (
                  <a className={iconLink} href={`mailto:${contact.salesEmail}`}>
                    <Mail className={iconClass} />
                    <span>{contact.salesEmail}</span>
                  </a>
                )}
                {contact?.adminEmail && (
                  <a className={iconLink} href={`mailto:${contact.adminEmail}`}>
                    <Mail className={iconClass} />
                    <span>{contact.adminEmail}</span>
                  </a>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300/90">
                Sitemap
              </h3>
              <nav className="mt-4 flex flex-col gap-2.5 text-sm text-white/75">
                {navItems.map(({ link }, i) => (
                  <CMSLink
                    key={i}
                    appearance="inline"
                    className="transition-colors hover:text-white"
                    {...link}
                  />
                ))}
                {navItems.length === 0 && (
                  <>
                    <Link className="transition-colors hover:text-white" href="/contact">
                      Contact
                    </Link>
                    <Link className="transition-colors hover:text-white" href="/search">
                      Search
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </div>

          {/* ── Column 3: social + appearance ────────────────────── */}
          <div className="flex flex-col justify-between gap-8 border-t border-white/10 pt-10 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300/90">
                Social
              </h3>

              {/* Icon row */}
              <div className="mt-5 flex flex-wrap gap-3">
                {socialLinks.map(({ href, label, Icon, external }) =>
                  external !== false ? (
                    <a
                      key={label}
                      className={socialIconBtn}
                      href={href}
                      rel="noopener noreferrer"
                      target="_blank"
                      aria-label={label}
                      title={label}
                    >
                      <Icon className="size-[18px]" />
                    </a>
                  ) : (
                    <span key={label} className={socialIconBtn} title={label}>
                      <Icon className="size-[18px]" />
                    </span>
                  ),
                )}
              </div>

              {/* Labelled list below icons */}
              <ul className="mt-4 flex flex-col gap-2 text-sm text-white/75">
                {socialLinks.map(({ href, label, Icon, external }) =>
                  external !== false ? (
                    <li key={label}>
                      <a className={iconLink} href={href} rel="noopener noreferrer" target="_blank">
                        <Icon className={iconClass} />
                        <span>{label}</span>
                      </a>
                    </li>
                  ) : (
                    <li key={label} className="flex items-center gap-2.5">
                      <Icon className={iconClass} />
                      <span>{label}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300/90">
                Appearance
              </h3>
              <div className="mt-4 text-white/80 [&_button]:border-white/20 [&_button]:text-white">
                <ThemeSelector />
              </div>
              <Link
                className="mt-6 inline-flex rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-300"
                href="/contact"
              >
                Request a quote
              </Link>
            </div>
          </div>
        </div>

        {/* ── Map embed ──────────────────────────────────────────── */}
        {contact?.googleMapsEmbedUrl &&
        isTrustedGoogleMapsEmbedUrl(contact.googleMapsEmbedUrl) ? (
          <div className="mt-14 border-t border-white/10 pt-12">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300/90">
              Map
            </h3>
            <p className="mt-2 max-w-xl text-sm text-white/65">
              Head office or plant location (embed URL from Company contact → Addresses &amp;
              quote).
            </p>
            <div className="mt-4 aspect-[21/9] min-h-[200px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/25 md:min-h-[260px]">
              <iframe
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={contact.googleMapsEmbedUrl.trim()}
                title="Chilmund location map"
              />
            </div>
          </div>
        ) : null}

        {/* ── Copyright ──────────────────────────────────────────── */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-xs text-white/45 md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} Chilmund Chemicals. All rights reserved.</p>
          <p className="max-w-md md:text-right">
            MSDS, COA, and company profile available on request from sales.
          </p>
        </div>
      </div>
    </footer>
  )
}
