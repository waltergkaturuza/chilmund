import React from 'react'

import {
  CHILMUND_DEFAULT_DESCRIPTION,
  CHILMUND_SITE_NAME,
} from '@/constants/seo'
import { CHILMUND_LOGO_COLOUR_SRC } from '@/constants/brand'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getServerSideURL } from '@/utilities/getURL'

import type { CompanyContact } from '@/payload-types'

function handleToXUrl(handle: string | null | undefined): string | undefined {
  if (!handle?.trim()) return undefined
  const h = handle.trim().replace(/^@/, '')
  return `https://x.com/${h}`
}

function handleToInstagramUrl(handle: string | null | undefined): string | undefined {
  if (!handle?.trim()) return undefined
  const h = handle.trim().replace(/^@/, '')
  return `https://www.instagram.com/${h}/`
}

function buildSameAs(contact: CompanyContact): string[] {
  return [
    contact.linkedinUrl || undefined,
    contact.facebookUrl || undefined,
    handleToXUrl(contact.socialTwitter),
    handleToInstagramUrl(contact.socialInstagram),
  ].filter(Boolean) as string[]
}

function buildContactPoints(contact: CompanyContact) {
  const points: Array<Record<string, string>> = []

  if (contact.salesPhoneTel || contact.salesPhone) {
    const sales: Record<string, string> = {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: contact.salesPhoneTel ?? contact.salesPhone ?? '',
      areaServed: 'Africa',
      availableLanguage: 'English',
    }
    if (contact.salesEmail) sales.email = contact.salesEmail
    points.push(sales)
  }

  if (contact.phoneBinduraTel || contact.phoneBinduraDisplay) {
    points.push({
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: contact.phoneBinduraTel ?? contact.phoneBinduraDisplay ?? '',
      areaServed: 'Zimbabwe',
      availableLanguage: 'English',
    })
  }

  return points.filter((p) => p.telephone)
}

export async function OrganizationJsonLd() {
  const contact: CompanyContact = await getCachedGlobal('company-contact', 0)()
  const siteUrl = getServerSideURL()

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: CHILMUND_SITE_NAME,
    url: siteUrl,
    logo: `${siteUrl}${CHILMUND_LOGO_COLOUR_SRC}`,
    description: CHILMUND_DEFAULT_DESCRIPTION,
    ...(contact.salesEmail ? { email: contact.salesEmail } : {}),
    ...((contact.salesPhoneTel ?? contact.salesPhone)
      ? { telephone: contact.salesPhoneTel ?? contact.salesPhone }
      : {}),
    address: [
      contact.headOfficeAddress
        ? {
            '@type': 'PostalAddress',
            name: 'Head office',
            streetAddress: contact.headOfficeAddress,
            addressCountry: 'ZW',
          }
        : null,
      contact.manufacturingPlantAddress
        ? {
            '@type': 'PostalAddress',
            name: 'Manufacturing plant',
            streetAddress: contact.manufacturingPlantAddress,
            addressCountry: 'ZW',
          }
        : null,
    ].filter(Boolean),
    contactPoint: buildContactPoints(contact),
    sameAs: buildSameAs(contact),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
