'use client'

import { cn } from '@/utilities/ui'
import { isHrefActive, resolveCMSLinkHref } from '@/utilities/resolveCMSLinkHref'
import { ChevronDown, Menu, SearchIcon, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { AboutMegaMenu } from '../AboutMegaMenu'
import { TrackQuoteMenuItem } from './TrackQuoteMenuItem'

type NavItem = NonNullable<HeaderType['navItems']>[number]
type SubItem = NonNullable<NavItem['subItems']>[number]

/**
 * Desktop: full-width row of tabs that wrap naturally (no horizontal scroll).
 * Active item = solid gold pill + dark label; idle = quiet text + soft hover.
 */
const tabStripTrack =
  'flex w-full flex-wrap items-center justify-center gap-x-0.5 gap-y-1 py-0.5'

const tabStripTrackLight = ''

const tabStripItem =
  'inline-flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-1.5 text-[0.75rem] font-semibold tracking-wide transition-colors xl:px-3 xl:py-2 xl:text-[0.8125rem]'

const tabStripActive = (dark?: boolean) =>
  dark
    ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-500'
    : 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-700/30 hover:bg-blue-500'

const tabStripIdle = (dark?: boolean) =>
  dark
    ? 'text-white/85 hover:bg-white/10 hover:text-white'
    : 'text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'

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
            ? 'bg-blue-600 text-white ring-0'
            : 'bg-blue-600 text-white ring-1 ring-blue-700/25'
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

  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  useEffect(() => {
    return () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className="relative shrink-0"
      onMouseEnter={() => {
        if (leaveTimer.current) {
          clearTimeout(leaveTimer.current)
          leaveTimer.current = null
        }
        setOpen(true)
      }}
      onMouseLeave={() => {
        leaveTimer.current = setTimeout(() => setOpen(false), 160)
      }}
    >
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
            'absolute left-1/2 top-[calc(100%+0.45rem)] z-50 min-w-[14rem] -translate-x-1/2 rounded-xl border py-1.5 shadow-xl',
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
            const itemCls = cn(
              'block px-4 py-2.5 text-sm font-medium transition-colors',
              active
                ? dark
                  ? 'bg-blue-600/20 text-blue-200'
                  : 'bg-blue-100 text-blue-950'
                : dark
                  ? 'text-white/85 hover:bg-white/10'
                  : 'text-slate-700 hover:bg-slate-50',
            )
            if (href === '/track-quote') {
              return (
                <TrackQuoteMenuItem
                  key={i}
                  label={row.link?.label || 'Track your quote'}
                  className={itemCls}
                  onNavigate={() => setOpen(false)}
                />
              )
            }
            return (
              <Link
                key={i}
                href={href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={itemCls}
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
      const isAbout = (item.dropdownLabel || '').toLowerCase().includes('about')
      if (isAbout) {
        const links = (item.subItems || [])
          .map((s) => {
            const href = resolveCMSLinkHref(s.link)
            return href ? { label: s.link?.label || '', href } : null
          })
          .filter(Boolean) as { label: string; href: string }[]

        return (
          <AboutMegaMenu
            key={i}
            dark={opts.dark}
            tabStripItem={tabStripItem}
            tabStripActive={tabStripActive}
            tabStripIdle={tabStripIdle}
            pathname={opts.pathname}
            links={links}
          />
        )
      }
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
            const itemCls = cn(
              'rounded-lg px-3 py-2.5 text-sm font-medium',
              active
                ? dark
                  ? 'bg-white/10 text-blue-200'
                  : 'bg-blue-100 text-blue-950'
                : dark
                  ? 'text-white/80 hover:bg-white/10'
                  : 'text-slate-600 hover:bg-white',
            )
            if (href === '/track-quote') {
              return (
                <TrackQuoteMenuItem
                  key={j}
                  label={row.link?.label || 'Track your quote'}
                  className={itemCls}
                  onNavigate={onNavigate}
                />
              )
            }
            return (
              <Link key={j} href={href} onClick={onNavigate} className={itemCls}>
                {row.link?.label}
              </Link>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

/** Summit-style search control (separate from the pill row). */
export function HeaderSearchTrigger({
  dark,
  className,
  onNavigate,
}: {
  dark?: boolean
  className?: string
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const active = pathname.startsWith('/search')
  const [modKey, setModKey] = useState('⌘')

  useEffect(() => {
    if (typeof navigator === 'undefined') return
    const mac = /mac|iphone|ipad|ipod/i.test(navigator.userAgent)
    setModKey(mac ? '⌘' : 'Ctrl')
  }, [])

  return (
    <Link
      href="/search"
      onClick={onNavigate}
      className={cn(
        'inline-flex min-w-0 max-w-[11rem] items-center gap-2 rounded-full border px-3 py-2 text-sm transition-colors sm:max-w-[13.5rem] sm:px-3.5',
        active
          ? dark
            ? 'border-blue-600/50 bg-blue-600/15 text-white'
            : 'border-blue-600/60 bg-blue-50 text-slate-900'
          : dark
            ? 'border-white/20 bg-black/20 text-white/80 hover:border-white/30 hover:bg-white/10 hover:text-white'
            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900',
        className,
      )}
    >
      <SearchIcon className="size-4 shrink-0 opacity-70" aria-hidden />
      <span className="min-w-0 flex-1 truncate text-left font-medium opacity-90">Search</span>
      <kbd
        className={cn(
          'hidden shrink-0 rounded-md border px-1.5 py-0.5 font-sans text-[0.65rem] font-semibold sm:inline',
          dark ? 'border-white/25 bg-white/5 text-white/70' : 'border-slate-200 bg-slate-50 text-slate-500',
        )}
      >
        {modKey} K
      </kbd>
    </Link>
  )
}

/** Full-width navigation bar — tabs spread evenly, wrapping when needed. */
export function HeaderNavDesktopStrip({ data, dark }: { data: HeaderType; dark?: boolean }) {
  const pathname = usePathname()
  const navItems = data?.navItems || []

  return (
    <nav aria-label="Main" className="w-full">
      <div className={tabStripTrack}>
        {navItems.map((item, i) => renderNavItem(item, i, { dark, pathname, mode: 'desktop' }))}
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
  onQuote,
}: {
  id: string
  data: HeaderType
  dark?: boolean
  open: boolean
  onClose: () => void
  onQuote?: () => void
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
          'absolute right-0 top-0 flex h-full w-[min(100%,22rem)] flex-col border-l shadow-2xl',
          dark ? 'border-white/10 bg-slate-950 text-white' : 'border-border bg-white text-foreground',
        )}
      >
        {/* Drawer header */}
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

        {/* Search */}
        <div className="border-b border-inherit px-4 py-3">
          <HeaderSearchTrigger dark={dark} onNavigate={onClose} className="w-full max-w-none py-2.5" />
        </div>

        {/* Nav items */}
        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto p-4" aria-label="Main">
          {navItems.map((item, i) =>
            renderNavItem(item, i, {
              dark,
              pathname,
              onNavigate: onClose,
              mode: 'mobile',
            }),
          )}
        </nav>

        {/* Bottom CTA */}
        {onQuote && (
          <div className="border-t border-inherit p-4">
            <button
              type="button"
              onClick={() => { onClose(); onQuote() }}
              className="w-full rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              Request a quote
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

