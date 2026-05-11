'use client'

import { ArrowRight, Download, Loader2, Search, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

/** Match server-side quote-track normalisation (Unicode dashes → ASCII hyphen). */
function normalizeTrackingIdInput(raw: string): string {
  return raw
    .trim()
    .toUpperCase()
    .replace(/[\u2010\u2011\u2012\u2013\u2014\u2212\uFE58\uFE63\uFF0D]/g, '-')
    .replace(/\s+/g, '')
}

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
  const router = useRouter()
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
    messageToClient?: string
    downloads?: { label: string; url: string }[]
  } | null>(null)

  useEffect(() => {
    const pre =
      initialTrackingId?.trim() ||
      fromQuery?.trim() ||
      ''
    if (pre) setInput(normalizeTrackingIdInput(pre))
  }, [initialTrackingId, fromQuery])

  const lookup = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setError(null)
    setResult(null)
    const id = normalizeTrackingIdInput(input)
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
        messageToClient: typeof data.messageToClient === 'string' ? data.messageToClient : '',
        downloads: Array.isArray(data.downloads) ? data.downloads : [],
      })
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inner = (
    <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 px-6 py-10 shadow-2xl sm:px-10 sm:py-12">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-blue-400/30 bg-blue-950/45 text-white transition-colors hover:bg-blue-900/70 hover:border-blue-300/45"
          aria-label="Close"
        >
          <X className="size-5" />
        </button>
      )}
      <h1 id="track-quote-title" className="text-center text-3xl font-bold text-white sm:text-4xl">
        Track your quote
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-blue-100/90">
        Enter your quote tracking ID for status updates. If we have shared a message or quotation PDF, it will
        appear here.
      </p>

      <form onSubmit={lookup} className="mt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-blue-100/50"
              aria-hidden
            />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. CHM-260415-A1B2C3"
              autoComplete="off"
              spellCheck={false}
              className="w-full rounded-xl border border-white/25 bg-white/10 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-blue-100/45 outline-none ring-0 transition-colors focus:border-white/45 focus:bg-white/15"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="shrink-0 rounded-xl border border-blue-400/40 bg-blue-500 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-blue-400 hover:border-blue-300/60 disabled:opacity-60 sm:min-w-[7.5rem]"
          >
            {loading ? <Loader2 className="mx-auto size-5 animate-spin" /> : 'Look up'}
          </button>
        </div>
        {error && <p className="mt-3 text-center text-sm text-amber-100">{error}</p>}
      </form>

      {result?.found === false && (
        <div className="mt-8 rounded-xl border border-white/20 bg-black/15 px-4 py-4 text-center text-sm text-blue-50/90">
          No request found for that ID. Check the code we emailed you, or contact us below.
        </div>
      )}

      {result?.found && result.status && (
        <div className="mt-8 rounded-xl border border-white/20 bg-black/15 px-5 py-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-100/70">Status</p>
          <p className="mt-1 text-lg font-bold text-white">
            {STATUS_COPY[result.status]?.title || result.status}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-blue-100/85">
            {(() => {
              const custom = result.messageToClient?.trim()
              if (custom)
                return <span className="block whitespace-pre-wrap text-white/[0.88]">{custom}</span>
              return STATUS_COPY[result.status]?.detail || ''
            })()}
          </p>
          {result.trackingId && (
            <p className="mt-4 font-mono text-sm text-white/90">
              ID: <span className="font-semibold">{result.trackingId}</span>
            </p>
          )}
          {result.submittedAt && (
            <p className="mt-1 text-xs text-blue-100/55">
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
            <p className="mt-3 text-sm text-blue-100/70">
              Company: <span className="text-white">{result.company}</span>
            </p>
          )}

          {result.downloads && result.downloads.length > 0 ? (
            <div className="mt-5 text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-100/70">Downloads</p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {result.downloads.map((d) => (
                  <li key={`${d.url}-${d.label}`}>
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-blue-400/35 bg-blue-600/50 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:border-blue-300/50 hover:bg-blue-500/70"
                    >
                      <Download className="size-5 shrink-0 text-white/80" aria-hidden />
                      <span className="min-w-0 flex-1 underline-offset-4 hover:underline">{d.label}</span>
                      <ArrowRight className="size-4 shrink-0 text-white/55" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}

      <p className="mt-10 text-center text-sm text-blue-100/80">
        Lost your ID? Email{' '}
        <a
          href="mailto:sales@chilmund.co.zw"
          className="font-semibold text-white underline decoration-white/40 underline-offset-2 transition-colors hover:text-blue-50"
        >
          sales@chilmund.co.zw
        </a>{' '}
        with your name and company.
      </p>

      <div className="mt-6 text-center">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/40 bg-blue-600/55 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:border-blue-300/55 hover:bg-blue-500/75"
          onClick={() => {
            onClose?.()
            router.push('/contact')
          }}
        >
          Contact us <ArrowRight className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  )

  if (variant === 'modal') {
    return <div className="flex w-full justify-center px-4">{inner}</div>
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950/40 px-4 py-16">
      <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center">{inner}</div>
    </div>
  )
}
