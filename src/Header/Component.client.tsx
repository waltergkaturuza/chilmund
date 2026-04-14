'use client'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/Logo/Logo'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useTheme } from '@/providers/Theme'
import { cn } from '@/utilities/ui'
import { Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useId, useState } from 'react'

import type { Header } from '@/payload-types'

import { useQuoteModal } from '@/providers/QuoteModal'
import { LanguageSelector } from './LanguageSelector'
import {
  HeaderNavDesktopStrip,
  HeaderNavMobileButton,
  HeaderNavMobileDrawer,
  HeaderSearchTrigger,
} from './Nav'

interface HeaderClientProps {
  data: Header
}

const headerCtaClasses =
  'rounded-full border-0 bg-blue-600 px-4 font-semibold text-white shadow-sm hover:bg-blue-500 lg:px-5'

function HeaderThemeToggle({ darkHeader }: { darkHeader: boolean }) {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors',
        darkHeader
          ? 'border-white/25 text-white hover:bg-white/10'
          : 'border-border text-slate-700 hover:bg-muted',
      )}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <Sun className="size-[1.15rem]" aria-hidden /> : <Moon className="size-[1.15rem]" aria-hidden />}
    </button>
  )
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const { openQuoteModal } = useQuoteModal()
  const router = useRouter()
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault()
        router.push('/search')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [router])

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
      {/* Single row: logo | nav tabs | utilities + CTA */}
      <div className="mx-auto flex w-full max-w-[1920px] items-center px-5 py-2.5 sm:py-3">
        {/* Logo — far left */}
        <Link className="shrink-0" href="/">
          <Logo variant={isDarkHeader ? 'light' : 'default'} />
        </Link>

        {/* Desktop nav tabs — centered between logo and CTA */}
        <div className="mx-4 hidden min-w-0 flex-1 lg:block">
          <HeaderNavDesktopStrip data={data} dark={isDarkHeader} />
        </div>

        {/* Utilities + CTA — far right */}
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-2.5 lg:ml-4">
          {/* Desktop-only: search bar, language selector */}
          <HeaderSearchTrigger
            dark={isDarkHeader}
            className="hidden lg:inline-flex"
          />
          <div className="hidden sm:block">
            <LanguageSelector dark={isDarkHeader} />
          </div>
          <HeaderThemeToggle darkHeader={isDarkHeader} />
          <Button
            className={cn('hidden md:inline-flex', headerCtaClasses)}
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

      <HeaderNavMobileDrawer
        id={navDrawerId}
        data={data}
        dark={isDarkHeader}
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
        onQuote={openQuoteModal}
      />
    </header>
  )
}
