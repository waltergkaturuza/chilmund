'use client'

import Link from 'next/link'
import React, { createContext, useCallback, useContext, useState } from 'react'

type QuoteModalContextValue = {
  openQuoteModal: () => void
}

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null)

export function useQuoteModal(): QuoteModalContextValue {
  const ctx = useContext(QuoteModalContext)
  if (!ctx) {
    throw new Error('useQuoteModal must be used within QuoteModalProvider')
  }
  return ctx
}

export function useQuoteModalOptional(): QuoteModalContextValue | null {
  return useContext(QuoteModalContext)
}

export const QuoteModalProvider: React.FC<{
  quotePagePath: string
  children: React.ReactNode
}> = ({ quotePagePath, children }) => {
  const [open, setOpen] = useState(false)
  const path = quotePagePath.startsWith('/') ? quotePagePath : `/${quotePagePath}`
  const openQuoteModal = useCallback(() => setOpen(true), [])

  return (
    <QuoteModalContext.Provider value={{ openQuoteModal }}>
      {children}
      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            aria-label="Close dialog"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
            <h2 id="quote-modal-title" className="text-lg font-semibold tracking-tight">
              Request a quote
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Open the full contact form for specifications, volumes, and delivery. You can also use
              the floating WhatsApp or call buttons for a faster reply.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <Link
                href={path}
                className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                onClick={() => setOpen(false)}
              >
                Open contact form
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </QuoteModalContext.Provider>
  )
}
