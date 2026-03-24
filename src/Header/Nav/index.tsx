'use client'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { SearchIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

export const HeaderNav: React.FC<{ data: HeaderType; dark?: boolean }> = ({ data, dark }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center gap-1 md:gap-2">
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            appearance="inline"
            className={cn(
              'rounded-lg px-2 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors md:px-3 md:text-sm',
              dark
                ? 'text-white/75 hover:bg-white/10 hover:text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
            )}
            {...link}
          />
        )
      })}
      <Link
        className={cn(
          'ml-1 flex size-10 items-center justify-center rounded-full border transition-colors md:ml-2',
          dark
            ? 'border-white/20 text-white hover:bg-white/10'
            : 'border-border text-slate-600 hover:bg-muted hover:text-slate-900',
        )}
        href="/search"
      >
        <span className="sr-only">Search</span>
        <SearchIcon className="size-[1.15rem]" />
      </Link>
    </nav>
  )
}
