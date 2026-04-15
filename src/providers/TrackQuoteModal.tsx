'use client'

import { TrackQuotePanel } from '@/components/TrackQuote/TrackQuotePanel'
import React, { Suspense, createContext, useCallback, useContext, useEffect, useState } from 'react'

type TrackQuoteModalContextValue = { openTrackQuoteModal: () => void }

const TrackQuoteModalContext = createContext<TrackQuoteModalContextValue | null>(null)

export function useTrackQuoteModal(): TrackQuoteModalContextValue {
  const ctx = useContext(TrackQuoteModalContext)
  if (!ctx) throw new Error('useTrackQuoteModal must be used within TrackQuoteModalProvider')
  return ctx
}

export function useTrackQuoteModalOptional(): TrackQuoteModalContextValue | null {
  return useContext(TrackQuoteModalContext)
}

export function TrackQuoteModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const openTrackQuoteModal = useCallback(() => setOpen(true), [])

  return (
    <TrackQuoteModalContext.Provider value={{ openTrackQuoteModal }}>
      {children}
      {open && <TrackQuoteModalShell onClose={() => setOpen(false)} />}
    </TrackQuoteModalContext.Provider>
  )
}

function TrackQuoteModalShell({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onEsc)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onEsc)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="track-quote-title">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[min(92vh,820px)] w-full max-w-lg overflow-y-auto rounded-2xl shadow-2xl ring-1 ring-white/10">
        <div className="bg-[#0f1f32] py-4">
          <Suspense fallback={<div className="px-8 py-16 text-center text-sm text-white/60">Loading…</div>}>
            <TrackQuotePanel variant="modal" onClose={onClose} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
