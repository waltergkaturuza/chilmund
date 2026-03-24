'use client'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/Logo/Logo'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useId, useState } from 'react'

import type { Header } from '@/payload-types'

import { useQuoteModal } from '@/providers/QuoteModal'
import {
  HeaderNavDesktopStrip,
  HeaderNavMobileButton,
  HeaderNavMobileDrawer,
} from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const { openQuoteModal } = useQuoteModal()
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navDrawerId = useId()

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), [])

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    closeMobileMenu()
  }, [pathname, closeMobileMenu])

  const isDarkHeader = theme === 'dark'

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-[background-color,box-shadow,color] duration-300',
        isDarkHeader
          ? 'border-white/10 bg-slate-950/90 text-white shadow-md backdrop-blur-md'
          : 'border-border/80 bg-white/95 text-foreground shadow-sm backdrop-blur-md',
      )}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div
        className={cn(
          'container grid items-center gap-x-4 gap-y-2 py-3 sm:gap-x-6 sm:py-4',
          'grid-cols-[1fr_auto] lg:grid-cols-[auto_minmax(0,1fr)_auto]',
        )}
      >
        <Link className="min-w-0 shrink-0 justify-self-start" href="/">
          <Logo variant={isDarkHeader ? 'light' : 'default'} />
        </Link>

        <div className="col-span-2 hidden min-w-0 justify-center px-2 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:flex">
          <HeaderNavDesktopStrip data={data} dark={isDarkHeader} />
        </div>

        <div className="col-start-2 row-start-1 flex shrink-0 items-center justify-end gap-2 justify-self-end lg:col-start-3">
          <Button
            className="hidden rounded-full px-4 sm:inline-flex lg:px-5"
            size="sm"
            type="button"
            onClick={openQuoteModal}
          >
            Request a quote
          </Button>
          <HeaderNavMobileButton
            dark={isDarkHeader}
            open={mobileMenuOpen}
            onOpenChange={setMobileMenuOpen}
            ariaControlsId={navDrawerId}
          />
        </div>
      </div>

      <div className="container flex justify-end pb-3 sm:hidden">
        <Button
          className="rounded-full px-4"
          size="sm"
          type="button"
          variant="secondary"
          onClick={openQuoteModal}
        >
          Request a quote
        </Button>
      </div>

      <HeaderNavMobileDrawer
        id={navDrawerId}
        data={data}
        dark={isDarkHeader}
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
      />
    </header>
  )
}
