'use client'

import { cn } from '@/utilities/ui'
import { ArrowRight, Loader2, Search, X } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const BG = '#152a42'
const GOLD = '#a08442'

const STATUS_COPY: Record<string, { title: string; detail: string }> = {
  pending: {
    title: 'Received',
    detail: 'Your request is in our queue. Our team will review it shortly.',
  },
  reviewed: {
    title: 'Under review',
    detail: 'We are reviewing your requirements and preparing next steps.',
  },
  quoted: {
    title: 'Quote sent',
    detail: 'A formal quotation has been issued. Please check your email.',
  },
  accepted: {
    title: 'Accepted',
    detail: 'Thank you — your order is being processed.',
  },
  declined: {
    title: 'Closed',
    detail: 'This request has been closed. Contact sales if you need a new quote.',
  },
}

export type TrackQuotePanelProps = {
  /** When false, outer padding/min-height is minimal (e.g. inside modal). */
  variant?: 'page' | 'modal'
  /** Optional initial ID (e.g. from URL in modal) */
  initialTrackingId?: string | null
  /** Close button (modal only) */
  onClose?: () => void
}

export function TrackQuotePanel({ variant = 'page', initialTrackingId, onClose }: TrackQuotePanelProps) {
  const searchParams = useSearchParams()
  const fromQuery = searchParams.get('trackingId') || searchParams.get('id')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{
    found: boolean
    trackingId?: string
    status?: string
    submittedAt?: string
    company?: string
    products?: string
  } | null>(null)

  useEffect(() => {
    const pre =
      initialTrackingId?.trim() ||
      fromQuery?.trim() ||
      ''
    if (pre) setInput(pre)
  }, [initialTrackingId, fromQuery])

  const lookup = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setError(null)
    setResult(null)
    const id = input.trim().toUpperCase().replace(/\s+/g, '')
    if (!id) {
      setError('Enter your tracking ID.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/quote-track?trackingId=${encodeURIComponent(id)}`)
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Lookup failed.')
        return
      }
      if (data.found === false) {
        setResult({ found: false })
        return
      }
      setResult({
        found: true,
        trackingId: data.trackingId,
        status: data.status,
        submittedAt: data.submittedAt,
        company: data.company,
        products: data.products,
      })
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inner = (
    <div
      className="relative w-full max-w-xl rounded-2xl px-6 py-10 shadow-2xl sm:px-10 sm:py-12"
      style={{ backgroundColor: BG }}
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <X className="size-5" />
        </button>
      )}
      <h1 id="track-quote-title" className="text-center text-3xl font-bold text-white sm:text-4xl">
        Track your quote
      </h1>
      <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-white/75">
        Enter your quote tracking ID to see the current status of your request.
      </p>

      <form onSubmit={lookup} className="mt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-white/40"
              aria-hidden
            />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. CHM-260415-A1B2C3"
              autoComplete="off"
              spellCheck={false}
              className="w-full rounded-xl border border-white/20 bg-white/5 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/35 outline-none ring-0 transition-colors focus:border-white/40 focus:bg-white/10"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="shrink-0 rounded-xl px-6 py-3.5 text-sm font-bold text-slate-900 transition-opacity hover:opacity-90 disabled:opacity-60 sm:min-w-[7.5rem]"
            style={{ backgroundColor: GOLD }}
          >
            {loading ? <Loader2 className="mx-auto size-5 animate-spin" /> : 'Look up'}
          </button>
        </div>
        {error && <p className="mt-3 text-center text-sm text-amber-200/90">{error}</p>}
      </form>

      {result?.found === false && (
        <div className="mt-8 rounded-xl border border-white/15 bg-white/5 px-4 py-4 text-center text-sm text-white/80">
          No request found for that ID. Check the code we emailed you, or contact us below.
        </div>
      )}

      {result?.found && result.status && (
        <div className="mt-8 rounded-xl border border-white/15 bg-white/5 px-5 py-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Status</p>
          <p className="mt-1 text-lg font-bold text-white">
            {STATUS_COPY[result.status]?.title || result.status}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            {STATUS_COPY[result.status]?.detail || ''}
          </p>
          {result.trackingId && (
            <p className="mt-4 font-mono text-sm text-white/90">
              ID: <span className="font-semibold">{result.trackingId}</span>
            </p>
          )}
          {result.submittedAt && (
            <p className="mt-1 text-xs text-white/45">
              Submitted{' '}
              {new Date(result.submittedAt).toLocaleString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          )}
          {result.company && (
            <p className="mt-3 text-sm text-white/60">
              Company: <span className="text-white/85">{result.company}</span>
            </p>
          )}
        </div>
      )}

      <p className="mt-10 text-center text-sm text-white/55">
        Lost your ID? Email{' '}
        <a href="mailto:sales@chilmund.co.zw" className="font-medium underline decoration-white/30 underline-offset-2" style={{ color: GOLD }}>
          sales@chilmund.co.zw
        </a>{' '}
        with your name and company.
      </p>

      <div className="mt-6 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ color: GOLD }}
        >
          Contact us <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  )

  if (variant === 'modal') {
    return <div className="flex w-full justify-center px-4">{inner}</div>
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-[#0f1f32] px-4 py-16">
      <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center">{inner}</div>
    </div>
  )
}
