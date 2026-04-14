'use client'

import { cn } from '@/utilities/ui'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import { COUNTRIES } from '@/content/geo'
import { useQuoteModalOptional } from '@/providers/QuoteModal'

const inputCls =
  'w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/25'
const labelCls = 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground'

type FormState = {
  fullName: string
  email: string
  phone: string
  company: string
  country: string
  subject: string
  message: string
}

const empty: FormState = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  country: '',
  subject: '',
  message: '',
}

const SUBJECTS = [
  'General enquiry',
  'Product information',
  'Logistics & delivery',
  'Partnership opportunity',
  'SHEQ / compliance',
  'Careers',
  'Other',
] as const

export function ContactForm() {
  const [form, setForm] = useState<FormState>(empty)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const quoteCtx = useQuoteModalOptional()

  const set = <K extends keyof FormState>(key: K, val: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: val }))

  const canSubmit = !!(form.fullName.trim() && form.email.trim() && form.subject && form.message.trim())

  const handleSubmit = useCallback(async () => {
    if (!canSubmit) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || `Error ${res.status}`)
      }
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }, [form, canSubmit])

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-lg">
        <CheckCircle2 className="mx-auto size-14 text-emerald-500" />
        <h3 className="mt-4 text-xl font-bold tracking-tight">Message sent!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you, {form.fullName.split(' ')[0]}. Our team will respond within 24 hours.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            className="inline-flex rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            onClick={() => { setSubmitted(false); setForm(empty) }}
          >
            Send another message
          </button>
          {quoteCtx && (
            <button
              type="button"
              className="inline-flex rounded-full border-2 border-blue-600 px-6 py-2.5 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50 dark:hover:bg-blue-950/20"
              onClick={quoteCtx.openQuoteModal}
            >
              Request a quote
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); handleSubmit() }}
      className="rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8"
    >
      <h3 className="text-lg font-bold tracking-tight">Send us a message</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Fill in the form below and our team will get back to you promptly.
      </p>

      <div className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Full name *</label>
            <input className={inputCls} placeholder="e.g. John Moyo" value={form.fullName} onChange={(e) => set('fullName', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Email address *</label>
            <input className={inputCls} type="email" placeholder="john@company.co.zw" value={form.email} onChange={(e) => set('email', e.target.value)} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className={labelCls}>Phone</label>
            <input className={inputCls} type="tel" placeholder="+263 7X XXX XXXX" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Company</label>
            <input className={inputCls} placeholder="e.g. Harare Municipality" value={form.company} onChange={(e) => set('company', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Country</label>
            <select className={cn(inputCls, 'cursor-pointer')} value={form.country} onChange={(e) => set('country', e.target.value)}>
              <option value="">Select country…</option>
              {(COUNTRIES as unknown as string[]).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelCls}>Subject *</label>
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => set('subject', s)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
                  form.subject === s
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-border text-muted-foreground hover:bg-muted',
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelCls}>Message *</label>
          <textarea
            className={cn(inputCls, 'min-h-[8rem] resize-y')}
            placeholder="Tell us how we can help…"
            value={form.message}
            onChange={(e) => set('message', e.target.value)}
          />
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-400">
            {error}
          </p>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">* Required fields</p>
        <button
          type="submit"
          disabled={!canSubmit || submitting}
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
          {submitting ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  )
}
