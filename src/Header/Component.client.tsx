'use client'
import { Button } from '@/components/ui/button'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const isDarkHeader = theme === 'dark'

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-[background-color,box-shadow,color] duration-300',
        isDarkHeader
          ? 'border-white/10 bg-slate-950/85 text-white shadow-md backdrop-blur-md'
          : 'border-border/80 bg-white/90 text-foreground shadow-sm backdrop-blur-md',
      )}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container flex items-center justify-between gap-4 py-4 md:py-5">
        <Link className="shrink-0" href="/">
          <Logo variant={isDarkHeader ? 'light' : 'default'} />
        </Link>
        <div className="flex items-center gap-3 md:gap-6">
          <HeaderNav dark={isDarkHeader} data={data} />
          <Button asChild className="hidden sm:inline-flex" size="sm">
            <Link href="/contact">Request a quote</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
