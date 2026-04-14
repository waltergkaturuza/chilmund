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
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className={cn(plusJakarta.className, 'min-h-[100vh] antialiased')}>
        <Providers quotePagePath={contact?.quotePagePath}>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
          <FloatingContact />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}
