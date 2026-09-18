import type { Metadata } from 'next'

import { AdminBar } from '@/components/AdminBar'
import { FloatingContact } from '@/components/FloatingContact/Component'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { cn } from '@/utilities/ui'
import { getServerSideURL } from '@/utilities/getURL'
import { GeistMono } from 'geist/font/mono'
import { draftMode } from 'next/headers'
import { Plus_Jakarta_Sans } from 'next/font/google'
import React from 'react'

import { GoogleAnalytics } from '@/components/Analytics/GoogleAnalytics'
import { SiteTracker } from '@/components/Analytics/SiteTracker'
import { OrganizationJsonLd } from '@/components/SEO/OrganizationJsonLd'
import { CHILMUND_DEFAULT_DESCRIPTION, CHILMUND_SITE_NAME } from '@/constants/seo'

import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const contact = await getCachedGlobal('company-contact', 0)()

  return (
    <html className={cn(plusJakarta.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <GoogleAnalytics />
        <OrganizationJsonLd />
      </head>
      <body className={cn(plusJakarta.className, 'min-h-[100vh] antialiased')}>
        <Providers quotePagePath={contact?.quotePagePath}>
          <SiteTracker />
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          <main
            id="main-content"
            className="[&_.payload-richtext_p]:text-justify [&_.prose_p]:text-justify [&_article_p]:text-justify"
          >
            {children}
          </main>
          <Footer />
          <FloatingContact />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: CHILMUND_SITE_NAME,
    template: `%s | ${CHILMUND_SITE_NAME}`,
  },
  description: CHILMUND_DEFAULT_DESCRIPTION,
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-48x48.png', type: 'image/png', sizes: '48x48' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: [{ url: '/favicon.ico' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    title: CHILMUND_SITE_NAME,
    description: CHILMUND_DEFAULT_DESCRIPTION,
  },
}
