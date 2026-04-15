'use client'

import { useTrackQuoteModalOptional } from '@/providers/TrackQuoteModal'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

const TRACK_PATH = '/track-quote'

/**
 * Opens the track-quote modal when the provider is present; otherwise links to the page.
 */
export function TrackQuoteMenuItem({
  label,
  className,
  onNavigate,
}: {
  label: string
  className: string
  onNavigate?: () => void
}) {
  const ctx = useTrackQuoteModalOptional()

  if (ctx) {
    return (
      <button
        type="button"
        role="menuitem"
        className={cn(className, 'w-full text-left')}
        onClick={() => {
          ctx.openTrackQuoteModal()
          onNavigate?.()
        }}
      >
        {label}
      </button>
    )
  }

  return (
    <Link href={TRACK_PATH} role="menuitem" className={className} onClick={onNavigate}>
      {label}
    </Link>
  )
}
