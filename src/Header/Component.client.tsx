'use client'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/Logo/Logo'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useTheme } from '@/providers/Theme'
import { cn } from '@/utilities/ui'
import { Moon, SearchIcon, Sun } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useId, useState } from 'react'

import type { Header } from '@/payload-types'

import { useQuoteModal } from '@/providers/QuoteModal'
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
  'rounded-full border-0 bg-amber-400 px-4 font-semibold text-slate-900 shadow-sm hover:bg-amber-300 lg:px-5'

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

        <div className="col-start-2 row-start-1 flex shrink-0 items-center justify-end gap-2 justify-self-end sm:gap-2.5 lg:col-start-3">
          <HeaderSearchTrigger
            dark={isDarkHeader}
            className="hidden lg:inline-flex"
          />
          <Link
            href="/search"
            className={cn(
              'flex size-10 items-center justify-center rounded-full border lg:hidden',
              isDarkHeader
                ? 'border-white/25 text-white hover:bg-white/10'
                : 'border-border text-slate-700 hover:bg-muted',
            )}
            aria-label="Search"
          >
            <SearchIcon className="size-5" aria-hidden />
          </Link>
          <HeaderThemeToggle darkHeader={isDarkHeader} />
          <Button
            className={cn('hidden sm:inline-flex', headerCtaClasses)}
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
        <Button className={headerCtaClasses} size="sm" type="button" onClick={openQuoteModal}>
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
