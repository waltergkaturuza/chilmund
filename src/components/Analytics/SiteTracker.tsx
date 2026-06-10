'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { trackEvent } from './trackEvent'

/** Records a page_view on each frontend route change (excludes /admin). */
export function SiteTracker() {
  const pathname = usePathname()
  const lastPath = useRef<string | null>(null)

  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin')) return
    if (lastPath.current === pathname) return

    lastPath.current = pathname
    trackEvent({ eventType: 'page_view', path: pathname })
  }, [pathname])

  return null
}
