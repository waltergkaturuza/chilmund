'use client'

import { cn } from '@/utilities/ui'
import { isHrefActive, resolveCMSLinkHref } from '@/utilities/resolveCMSLinkHref'
import { ChevronDown, Menu, SearchIcon, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

type NavItem = NonNullable<HeaderType['navItems']>[number]
type SubItem = NonNullable<NavItem['subItems']>[number]

/** Desktop: segmented “tab” cells inside a bar */
const tabStripTrack =
  'inline-flex max-w-full flex-nowrap items-center gap-0.5 overflow-x-auto rounded-xl border px-1.5 py-1.5 shadow-sm [scrollbar-width:thin] sm:gap-1 sm:px-2'

const tabStripItem =
  'inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-[0.8125rem] font-semibold tracking-wide transition-colors sm:px-3.5 sm:py-2.5 sm:text-sm'

const tabStripActive = (dark?: boolean) =>
  dark
    ? 'bg-amber-500/25 text-amber-100 shadow-sm ring-1 ring-amber-400/35'
    : 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/90'

const tabStripIdle = (dark?: boolean) =>
  dark
    ? 'text-white/75 hover:bg-white/10 hover:text-white'
    : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'

/** Mobile drawer: pill chips */
const pillBase =
  'inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors md:px-3.5 md:text-[0.8rem]'

function NavLinkTabStrip({
  href,
  active,
  dark,
  children,
}: {
  href: string
  active: boolean
  dark?: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(tabStripItem, active ? tabStripActive(dark) : tabStripIdle(dark))}
    >
      {children}
    </Link>
  )
}

function NavLinkPill({
  href,
  active,
  dark,
  children,
  onNavigate,
}: {
  href: string
  active: boolean
  dark?: boolean
  children: React.ReactNode
  onNavigate?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        pillBase,
        active
          ? dark
            ? 'bg-amber-500/20 text-amber-200 ring-1 ring-amber-400/40'
            : 'bg-amber-100 text-amber-950 ring-1 ring-amber-300/80'
          : dark
            ? 'text-white/80 hover:bg-white/10 hover:text-white'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
      )}
    >
      {children}
    </Link>
  )
}

function DropdownDesktopStrip({
  item,
  dark,
  pathname,
}: {
  item: NavItem
  dark?: boolean
  pathname: string
}) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const label = item.dropdownLabel || 'Menu'
  const subs = item.subItems || []

  const anyActive = subs.some((row) => {
    const h = resolveCMSLinkHref(row.link)
    return h ? isHrefActive(pathname, h) : false
  })

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  return (
    <div ref={wrapRef} className="relative shrink-0">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          tabStripItem,
          'cursor-pointer border-0 bg-transparent',
          anyActive || open ? tabStripActive(dark) : tabStripIdle(dark),
        )}
      >
        {label}
        <ChevronDown
          className={cn('size-3.5 shrink-0 opacity-80 transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>
      {open ? (
        <div
          className={cn(
            'absolute left-1/2 top-[calc(100%+0.35rem)] z-50 min-w-[13rem] -translate-x-1/2 rounded-xl border py-1.5 shadow-xl',
            dark
              ? 'border-white/10 bg-slate-950/95 text-white backdrop-blur-md'
              : 'border-slate-200/90 bg-white text-slate-900 shadow-slate-200/50',
          )}
          role="menu"
        >
          {subs.map((row: SubItem, i: number) => {
            const href = resolveCMSLinkHref(row.link)
            if (!href) return null
            const active = isHrefActive(pathname, href)
            return (
              <Link
                key={i}
                href={href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={cn(
                  'block px-4 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? dark
                      ? 'bg-white/10 text-amber-200'
                      : 'bg-amber-50 text-amber-950'
                    : dark
                      ? 'text-white/85 hover:bg-white/10'
                      : 'text-slate-700 hover:bg-slate-50',
                )}
              >
                {row.link?.label}
              </Link>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

function renderNavItem(
  item: NavItem,
  i: number,
  opts: {
    dark?: boolean
    pathname: string
    onNavigate?: () => void
    mode: 'desktop' | 'mobile'
  },
) {
  const style = item.style || 'link'

  if (style === 'dropdown') {
    if (opts.mode === 'desktop') {
      return <DropdownDesktopStrip key={i} item={item} dark={opts.dark} pathname={opts.pathname} />
    }
    return (
      <MobileDropdownSection
        key={i}
        item={item}
        dark={opts.dark}
        pathname={opts.pathname}
        onNavigate={opts.onNavigate}
      />
    )
  }

  const href = resolveCMSLinkHref(item.link)
  if (!href || !item.link) return null
  const active = isHrefActive(opts.pathname, href)

  if (opts.mode === 'desktop') {
    return (
      <NavLinkTabStrip key={i} href={href} active={active} dark={opts.dark}>
        {item.link.label}
      </NavLinkTabStrip>
    )
  }

  return (
    <NavLinkPill
      key={i}
      href={href}
      active={active}
      dark={opts.dark}
      onNavigate={opts.onNavigate}
    >
      {item.link.label}
    </NavLinkPill>
  )
}

function MobileDropdownSection({
  item,
  dark,
  pathname,
  onNavigate,
}: {
  item: NavItem
  dark?: boolean
  pathname: string
  onNavigate?: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const subs = item.subItems || []

  return (
    <div
      className={cn(
        'rounded-xl border',
        dark ? 'border-white/15 bg-white/5' : 'border-slate-200 bg-slate-50/80',
      )}
    >
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className={cn(
          'flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider',
          dark ? 'text-white' : 'text-slate-800',
        )}
      >
        {item.dropdownLabel}
        <ChevronDown className={cn('size-4 transition-transform', expanded && 'rotate-180')} />
      </button>
      {expanded ? (
        <div className="flex flex-col gap-0 border-t border-inherit px-2 py-2">
          {subs.map((row: SubItem, j: number) => {
            const href = resolveCMSLinkHref(row.link)
            if (!href) return null
            const active = isHrefActive(pathname, href)
            return (
              <Link
                key={j}
                href={href}
                onClick={onNavigate}
                className={cn(
                  'rounded-lg px-3 py-2.5 text-sm font-medium',
                  active
                    ? dark
                      ? 'bg-white/10 text-amber-200'
                      : 'bg-amber-100 text-amber-950'
                    : dark
                      ? 'text-white/80 hover:bg-white/10'
                      : 'text-slate-600 hover:bg-white',
                )}
              >
                {row.link?.label}
              </Link>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

function SearchTabStrip({
  pathname,
  dark,
  onClick,
}: {
  pathname: string
  dark?: boolean
  onClick?: () => void
}) {
  const active = pathname.startsWith('/search')
  return (
    <Link
      href="/search"
      onClick={onClick}
      className={cn(
        tabStripItem,
        active ? tabStripActive(dark) : tabStripIdle(dark),
        'shrink-0',
      )}
    >
      <SearchIcon className="size-[1.05rem]" aria-hidden />
      <span>Search</span>
    </Link>
  )
}

/** Centered primary navigation bar — use inside grid column with minmax(0,1fr) */
export function HeaderNavDesktopStrip({ data, dark }: { data: HeaderType; dark?: boolean }) {
  const pathname = usePathname()
  const navItems = data?.navItems || []

  return (
    <nav
      aria-label="Main"
      className="flex w-full min-w-0 max-w-full justify-center lg:justify-center"
    >
      <div
        className={cn(
          tabStripTrack,
          dark
            ? 'border-white/15 bg-slate-900/55 ring-1 ring-white/5'
            : 'border-slate-200/95 bg-slate-100/90 ring-1 ring-slate-200/60',
        )}
      >
        {navItems.map((item, i) => renderNavItem(item, i, { dark, pathname, mode: 'desktop' }))}
        <SearchTabStrip pathname={pathname} dark={dark} />
      </div>
    </nav>
  )
}

export function HeaderNavMobileButton({
  dark,
  open,
  onOpenChange,
  ariaControlsId,
}: {
  dark?: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Same id as the mobile drawer root for `aria-controls`. */
  ariaControlsId: string
}) {
  return (
    <div className="flex items-center lg:hidden">
      <button
        type="button"
        className={cn(
          'flex size-10 items-center justify-center rounded-full border transition-colors',
          dark
            ? 'border-white/25 text-white hover:bg-white/10'
            : 'border-border text-slate-700 hover:bg-muted',
        )}
        aria-expanded={open}
        aria-controls={ariaControlsId}
        onClick={() => onOpenChange(!open)}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
      </button>
    </div>
  )
}

export function HeaderNavMobileDrawer({
  id,
  data,
  dark,
  open,
  onClose,
}: {
  id: string
  data: HeaderType
  dark?: boolean
  open: boolean
  onClose: () => void
}) {
  const pathname = usePathname()
  const navItems = data?.navItems || []

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const searchPill = (
    <Link
      href="/search"
      onClick={onClose}
      className={cn(
        pillBase,
        pathname.startsWith('/search')
          ? dark
            ? 'bg-amber-500/20 text-amber-200 ring-1 ring-amber-400/40'
            : 'bg-amber-100 text-amber-950 ring-1 ring-amber-300/80'
          : dark
            ? 'text-white/80 hover:bg-white/10 hover:text-white'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
      )}
    >
      <SearchIcon className="size-[1.05rem]" aria-hidden />
      <span>Search</span>
    </Link>
  )

  if (!open) return null

  return (
    <div
      id={id}
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Main navigation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div
        className={cn(
          'absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col border-l shadow-2xl',
          dark ? 'border-white/10 bg-slate-950 text-white' : 'border-border bg-white text-foreground',
        )}
      >
        <div className="flex items-center justify-between border-b border-inherit px-4 py-4">
          <span className="text-sm font-semibold uppercase tracking-wider">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className={cn(
              'flex size-9 items-center justify-center rounded-full border',
              dark ? 'border-white/20 hover:bg-white/10' : 'border-border hover:bg-muted',
            )}
          >
            <X className="size-5" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto p-4" aria-label="Main">
          {navItems.map((item, i) =>
            renderNavItem(item, i, {
              dark,
              pathname,
              onNavigate: onClose,
              mode: 'mobile',
            }),
          )}
          <div className="pt-2">{searchPill}</div>
        </nav>
      </div>
    </div>
  )
}

