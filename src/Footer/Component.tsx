import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { CompanyContact } from '@/payload-types'
import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

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
  return u.startsWith('https://www.google.com/maps/embed') || u.startsWith('https://maps.google.com/maps/embed')
}

export async function Footer() {
  const [footerData, contact]: [Footer, CompanyContact] = await Promise.all([
    getCachedGlobal('footer', 1)(),
    getCachedGlobal('company-contact', 0)(),
  ])

  const navItems = footerData?.navItems || []

  const xUrl = contact?.socialTwitter ? handleToXUrl(contact.socialTwitter) : null
  const igUrl = contact?.socialInstagram ? handleToInstagramUrl(contact.socialInstagram) : null

  return (
    <footer className="mt-auto border-t border-white/10 bg-[linear-gradient(180deg,oklch(16%_0.04_250deg)_0%,oklch(12%_0.035_250deg)_100%)] text-white">
      <div className="container py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link className="inline-flex" href="/">
              <Logo variant="light" />
            </Link>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">
              Trailblazing water treatment manufacturing from Bindura — up to 7,200 metric tons of aluminium
              sulphate per month. Quality, affordability, and service excellence for municipalities, industry, and
              communities across Southern Africa.
            </p>
            {(contact?.headOfficeAddress || contact?.manufacturingPlantAddress) && (
              <div className="mt-6 space-y-2 text-sm text-white/75">
                {contact.headOfficeAddress ? (
                  <p>
                    <span className="font-semibold text-amber-300/90">Head office</span>
                    <br />
                    {contact.headOfficeAddress}
                  </p>
                ) : null}
                {contact.manufacturingPlantAddress ? (
                  <p>
                    <span className="font-semibold text-amber-300/90">Manufacturing plant</span>
                    <br />
                    {contact.manufacturingPlantAddress}
                  </p>
                ) : null}
              </div>
            )}
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300/90">Contact</h3>
              <div className="mt-4 flex flex-col gap-2 text-sm text-white/75">
                {contact?.salesPhone ? (
                  <p>
                    <span className="text-white/50">Harare</span>
                    <br />
                    {contact.salesPhoneTel ? (
                      <a className="hover:text-white" href={`tel:${contact.salesPhoneTel.replace(/\s/g, '')}`}>
                        {contact.salesPhone}
                      </a>
                    ) : (
                      contact.salesPhone
                    )}
                  </p>
                ) : null}
                {contact?.phoneBinduraDisplay ? (
                  <p>
                    <span className="text-white/50">Bindura</span>
                    <br />
                    {contact.phoneBinduraTel ? (
                      <a className="hover:text-white" href={`tel:${contact.phoneBinduraTel.replace(/\s/g, '')}`}>
                        {contact.phoneBinduraDisplay}
                      </a>
                    ) : (
                      contact.phoneBinduraDisplay
                    )}
                  </p>
                ) : null}
                {contact?.salesEmail ? (
                  <a className="hover:text-white" href={`mailto:${contact.salesEmail}`}>
                    Sales: {contact.salesEmail}
                  </a>
                ) : null}
                {contact?.adminEmail ? (
                  <a className="hover:text-white" href={`mailto:${contact.adminEmail}`}>
                    Admin: {contact.adminEmail}
                  </a>
                ) : null}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300/90">Sitemap</h3>
              <nav className="mt-4 flex flex-col gap-2.5 text-sm text-white/75">
                {navItems.map(({ link }, i) => (
                  <CMSLink
                    key={i}
                    appearance="inline"
                    className="transition-colors hover:text-white"
                    {...link}
                  />
                ))}
                {navItems.length === 0 ? (
                  <>
                    <Link className="transition-colors hover:text-white" href="/contact">
                      Contact
                    </Link>
                    <Link className="transition-colors hover:text-white" href="/search">
                      Search
                    </Link>
                  </>
                ) : null}
              </nav>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 border-t border-white/10 pt-10 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300/90">Social</h3>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-white/75">
                {xUrl ? (
                  <li>
                    <a className="hover:text-white" href={xUrl} rel="noopener noreferrer" target="_blank">
                      {contact?.socialTwitter} on X
                    </a>
                  </li>
                ) : null}
                {igUrl ? (
                  <li>
                    <a className="hover:text-white" href={igUrl} rel="noopener noreferrer" target="_blank">
                      {contact?.socialInstagram} on Instagram
                    </a>
                  </li>
                ) : null}
                {contact?.linkedinUrl ? (
                  <li>
                    <a className="hover:text-white" href={contact.linkedinUrl} rel="noopener noreferrer" target="_blank">
                      {contact.socialLinkedIn || 'LinkedIn'}
                    </a>
                  </li>
                ) : contact?.socialLinkedIn ? (
                  <li>{contact.socialLinkedIn}</li>
                ) : null}
                {contact?.facebookUrl ? (
                  <li>
                    <a className="hover:text-white" href={contact.facebookUrl} rel="noopener noreferrer" target="_blank">
                      {contact.socialFacebook || 'Facebook'}
                    </a>
                  </li>
                ) : contact?.socialFacebook ? (
                  <li>{contact.socialFacebook}</li>
                ) : null}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300/90">Appearance</h3>
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

        {contact?.googleMapsEmbedUrl && isTrustedGoogleMapsEmbedUrl(contact.googleMapsEmbedUrl) ? (
          <div className="mt-14 border-t border-white/10 pt-12">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300/90">Map</h3>
            <p className="mt-2 max-w-xl text-sm text-white/65">
              Head office or plant location (embed URL from Company contact → Addresses &amp; quote).
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

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-xs text-white/45 md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} Chilmund Chemicals. All rights reserved.</p>
          <p className="max-w-md md:text-right">MSDS, COA, and company profile available on request from sales.</p>
        </div>
      </div>
    </footer>
  )
}
