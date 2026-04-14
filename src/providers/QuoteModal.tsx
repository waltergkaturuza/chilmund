'use client'

import { cn } from '@/utilities/ui'
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  Loader2,
  MapPin,
  Package,
  Send,
  User,
  X,
} from 'lucide-react'
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

/* ── Context ─────────────────────────────────────────────────────────── */

type QuoteModalContextValue = { openQuoteModal: () => void }

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null)

export function useQuoteModal(): QuoteModalContextValue {
  const ctx = useContext(QuoteModalContext)
  if (!ctx) throw new Error('useQuoteModal must be used within QuoteModalProvider')
  return ctx
}

export function useQuoteModalOptional(): QuoteModalContextValue | null {
  return useContext(QuoteModalContext)
}

/* ── Form data ───────────────────────────────────────────────────────── */

const PRODUCTS = [
  'Granular Aluminium Sulphate',
  'Liquid Aluminium Sulphate',
  'Kibbled Aluminium Sulphate',
  'Coagulants & Flocculants',
  'Disinfectants',
  'Other (specify below)',
] as const

const INDUSTRIES = [
  'Municipal water treatment',
  'Industrial processing',
  'Agriculture',
  'Mining',
  'Paper & textiles',
  'Other',
] as const

const VOLUMES = [
  'Sample / trial (<1 ton)',
  '1–10 metric tons',
  '10–50 metric tons',
  '50–200 metric tons',
  '200+ metric tons',
  'Ongoing contract (monthly)',
] as const

const DELIVERY = [
  'Chilmund arranges delivery',
  'Own collection from plant (Bindura)',
  'Own collection from depot (Harare)',
  'Need logistics quote',
] as const

type FormData = {
  fullName: string
  email: string
  phone: string
  company: string
  jobTitle: string
  country: string
  city: string
  products: string[]
  otherProduct: string
  industry: string
  volume: string
  delivery: string
  deliveryAddress: string
  urgency: string
  message: string
}

const emptyForm: FormData = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  jobTitle: '',
  country: '',
  city: '',
  products: [],
  otherProduct: '',
  industry: '',
  volume: '',
  delivery: '',
  deliveryAddress: '',
  urgency: '',
  message: '',
}

/* ── Stepper ─────────────────────────────────────────────────────────── */

const STEPS = [
  { id: 'contact', label: 'Contact', icon: User },
  { id: 'company', label: 'Company', icon: Building2 },
  { id: 'product', label: 'Product', icon: Package },
  { id: 'delivery', label: 'Delivery', icon: MapPin },
  { id: 'review', label: 'Review', icon: Send },
] as const

/* ── Shared styles ───────────────────────────────────────────────────── */

const inputCls =
  'w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/25'
const labelCls = 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground'
const checkCls =
  'size-4 shrink-0 appearance-none rounded border border-border bg-background checked:border-amber-400 checked:bg-amber-400 transition-colors cursor-pointer relative after:absolute after:inset-0 after:flex after:items-center after:justify-center checked:after:content-["✓"] after:text-[0.6rem] after:font-bold after:text-white'
const radioCls =
  'size-4 shrink-0 appearance-none rounded-full border border-border bg-background checked:border-amber-400 checked:bg-amber-400 transition-colors cursor-pointer relative after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:content-[""] checked:after:block checked:after:size-1.5 checked:after:rounded-full checked:after:bg-white'

/* ── Provider + Modal ────────────────────────────────────────────────── */

export const QuoteModalProvider: React.FC<{
  quotePagePath: string
  children: React.ReactNode
}> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const openQuoteModal = useCallback(() => setOpen(true), [])

  return (
    <QuoteModalContext.Provider value={{ openQuoteModal }}>
      {children}
      {open && <QuoteFormModal onClose={() => setOpen(false)} />}
    </QuoteModalContext.Provider>
  )
}

/* ── Modal ───────────────────────────────────────────────────────────── */

function QuoteFormModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  const set = <K extends keyof FormData>(key: K, val: FormData[K]) =>
    setForm((f) => ({ ...f, [key]: val }))

  const toggleProduct = (p: string) =>
    setForm((f) => ({
      ...f,
      products: f.products.includes(p) ? f.products.filter((x) => x !== p) : [...f.products, p],
    }))

  const canNext = (): boolean => {
    if (step === 0) return !!(form.fullName.trim() && form.email.trim() && form.phone.trim())
    if (step === 1) return !!form.company.trim()
    if (step === 2) return form.products.length > 0 && !!form.volume
    if (step === 3) return !!form.delivery
    return true
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError(null)
    try {
      const body = {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        company: form.company,
        jobTitle: form.jobTitle,
        country: form.country,
        city: form.city,
        products: form.products.join(', '),
        otherProduct: form.otherProduct,
        industry: form.industry,
        volume: form.volume,
        delivery: form.delivery,
        deliveryAddress: form.deliveryAddress,
        urgency: form.urgency,
        message: form.message,
      }

      const res = await fetch('/api/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(text || `Server error ${res.status}`)
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center" role="dialog" aria-modal="true">
        <button type="button" className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-label="Close" onClick={onClose} />
        <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card p-8 text-center shadow-2xl">
          <CheckCircle2 className="mx-auto size-14 text-emerald-500" />
          <h2 className="mt-4 text-xl font-bold tracking-tight">Quote request sent!</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Thank you, {form.fullName.split(' ')[0]}. Our sales team will get back to you within 24 hours with a
            detailed quotation. Check your email at <strong>{form.email}</strong>.
          </p>
          <button
            type="button"
            className="mt-6 inline-flex rounded-full bg-amber-400 px-6 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-300"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title">
      <button type="button" className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-label="Close" onClick={onClose} />

      <div className="relative z-10 flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl" style={{ maxHeight: 'min(92vh, 720px)' }}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 id="quote-modal-title" className="text-lg font-bold tracking-tight">Request a Quote</h2>
          <button type="button" onClick={onClose} className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted" aria-label="Close">
            <X className="size-4.5" />
          </button>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-1 border-b border-border px-5 py-3">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            const done = i < step
            const active = i === step
            return (
              <React.Fragment key={s.id}>
                {i > 0 && <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/40" aria-hidden />}
                <button
                  type="button"
                  onClick={() => i <= step && setStep(i)}
                  disabled={i > step}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors',
                    active && 'bg-amber-400 text-slate-900',
                    done && 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
                    !active && !done && 'text-muted-foreground/50',
                    i <= step && 'cursor-pointer',
                  )}
                >
                  <Icon className="size-3.5" aria-hidden />
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              </React.Fragment>
            )
          })}
        </div>

        {/* Body */}
        <div ref={panelRef} className="flex-1 overflow-y-auto px-5 py-5">
          {step === 0 && <StepContact form={form} set={set} />}
          {step === 1 && <StepCompany form={form} set={set} />}
          {step === 2 && <StepProduct form={form} set={set} toggleProduct={toggleProduct} />}
          {step === 3 && <StepDelivery form={form} set={set} />}
          {step === 4 && <StepReview form={form} />}
          {error && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-400">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-5 py-3.5">
          <button
            type="button"
            onClick={() => (step === 0 ? onClose() : setStep((s) => s - 1))}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            {step === 0 ? 'Cancel' : 'Back'}
          </button>
          {step < 4 ? (
            <button
              type="button"
              disabled={!canNext()}
              onClick={() => setStep((s) => s + 1)}
              className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next <ChevronRight className="size-3.5" aria-hidden />
            </button>
          ) : (
            <button
              type="button"
              disabled={submitting}
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-300 disabled:opacity-60"
            >
              {submitting ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
              {submitting ? 'Sending…' : 'Submit Quote Request'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Step 1: Contact ─────────────────────────────────────────────────── */

function StepContact({ form, set }: { form: FormData; set: <K extends keyof FormData>(k: K, v: FormData[K]) => void }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Who should we contact about your quotation?</p>
      <div>
        <label className={labelCls}>Full name *</label>
        <input className={inputCls} placeholder="e.g. John Moyo" value={form.fullName} onChange={(e) => set('fullName', e.target.value)} autoFocus />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Email address *</label>
          <input className={inputCls} type="email" placeholder="john@company.co.zw" value={form.email} onChange={(e) => set('email', e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Phone number *</label>
          <input className={inputCls} type="tel" placeholder="+263 7X XXX XXXX" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
        </div>
      </div>
    </div>
  )
}

/* ── Step 2: Company ─────────────────────────────────────────────────── */

function StepCompany({ form, set }: { form: FormData; set: <K extends keyof FormData>(k: K, v: FormData[K]) => void }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Tell us about your organisation.</p>
      <div>
        <label className={labelCls}>Company / organisation *</label>
        <input className={inputCls} placeholder="e.g. Harare Municipality" value={form.company} onChange={(e) => set('company', e.target.value)} autoFocus />
      </div>
      <div>
        <label className={labelCls}>Your role / job title</label>
        <input className={inputCls} placeholder="e.g. Procurement Manager" value={form.jobTitle} onChange={(e) => set('jobTitle', e.target.value)} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Country</label>
          <input className={inputCls} placeholder="e.g. Zimbabwe" value={form.country} onChange={(e) => set('country', e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>City / town</label>
          <input className={inputCls} placeholder="e.g. Harare" value={form.city} onChange={(e) => set('city', e.target.value)} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Industry / sector</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {INDUSTRIES.map((ind) => (
            <label key={ind} className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:bg-muted">
              <input type="radio" name="industry" className={radioCls} checked={form.industry === ind} onChange={() => set('industry', ind)} />
              {ind}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Step 3: Product ─────────────────────────────────────────────────── */

function StepProduct({ form, set, toggleProduct }: { form: FormData; set: <K extends keyof FormData>(k: K, v: FormData[K]) => void; toggleProduct: (p: string) => void }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">What products do you need? Select all that apply.</p>
      <div>
        <label className={labelCls}>Products *</label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {PRODUCTS.map((p) => (
            <label key={p} className={cn('flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-colors hover:bg-muted', form.products.includes(p) ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/20' : 'border-border')}>
              <input type="checkbox" className={checkCls} checked={form.products.includes(p)} onChange={() => toggleProduct(p)} />
              {p}
            </label>
          ))}
        </div>
      </div>
      {form.products.includes('Other (specify below)') && (
        <div>
          <label className={labelCls}>Please specify</label>
          <input className={inputCls} placeholder="e.g. Ferric chloride" value={form.otherProduct} onChange={(e) => set('otherProduct', e.target.value)} />
        </div>
      )}
      <div>
        <label className={labelCls}>Estimated volume *</label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {VOLUMES.map((v) => (
            <label key={v} className={cn('flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-colors hover:bg-muted', form.volume === v ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/20' : 'border-border')}>
              <input type="radio" name="volume" className={radioCls} checked={form.volume === v} onChange={() => set('volume', v)} />
              {v}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Step 4: Delivery ────────────────────────────────────────────────── */

function StepDelivery({ form, set }: { form: FormData; set: <K extends keyof FormData>(k: K, v: FormData[K]) => void }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">How would you like to receive your order?</p>
      <div>
        <label className={labelCls}>Delivery preference *</label>
        <div className="space-y-2">
          {DELIVERY.map((d) => (
            <label key={d} className={cn('flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-colors hover:bg-muted', form.delivery === d ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/20' : 'border-border')}>
              <input type="radio" name="delivery" className={radioCls} checked={form.delivery === d} onChange={() => set('delivery', d)} />
              {d}
            </label>
          ))}
        </div>
      </div>
      {(form.delivery === 'Chilmund arranges delivery' || form.delivery === 'Need logistics quote') && (
        <div>
          <label className={labelCls}>Delivery address / location</label>
          <textarea className={cn(inputCls, 'min-h-[4rem] resize-y')} placeholder="Street address, city, country" value={form.deliveryAddress} onChange={(e) => set('deliveryAddress', e.target.value)} />
        </div>
      )}
      <div>
        <label className={labelCls}>Urgency</label>
        <div className="grid grid-cols-3 gap-2">
          {['Standard', 'Urgent', 'Emergency'].map((u) => (
            <label key={u} className={cn('flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted', form.urgency === u ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/20' : 'border-border')}>
              <input type="radio" name="urgency" className={radioCls} checked={form.urgency === u} onChange={() => set('urgency', u)} />
              {u}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className={labelCls}>Additional notes / message</label>
        <textarea className={cn(inputCls, 'min-h-[5rem] resize-y')} placeholder="Specific grades, packaging preferences, delivery schedule, certifications needed…" value={form.message} onChange={(e) => set('message', e.target.value)} />
      </div>
    </div>
  )
}

/* ── Step 5: Review ──────────────────────────────────────────────────── */

function StepReview({ form }: { form: FormData }) {
  const row = (label: string, value: string | undefined) =>
    value?.trim() ? (
      <div className="flex justify-between gap-4 py-1.5 text-sm">
        <span className="shrink-0 font-medium text-muted-foreground">{label}</span>
        <span className="text-right font-semibold">{value}</span>
      </div>
    ) : null

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Please review your details before submitting.</p>

      <div className="rounded-xl border border-border divide-y divide-border">
        <div className="px-4 py-3">
          <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-amber-500">Contact</h4>
          {row('Name', form.fullName)}
          {row('Email', form.email)}
          {row('Phone', form.phone)}
        </div>

        <div className="px-4 py-3">
          <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-amber-500">Company</h4>
          {row('Company', form.company)}
          {row('Role', form.jobTitle)}
          {row('Location', [form.city, form.country].filter(Boolean).join(', '))}
          {row('Industry', form.industry)}
        </div>

        <div className="px-4 py-3">
          <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-amber-500">Product</h4>
          {row('Products', form.products.join(', '))}
          {form.otherProduct && row('Other', form.otherProduct)}
          {row('Volume', form.volume)}
        </div>

        <div className="px-4 py-3">
          <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-amber-500">Delivery</h4>
          {row('Method', form.delivery)}
          {row('Address', form.deliveryAddress)}
          {row('Urgency', form.urgency)}
          {form.message && (
            <div className="mt-2">
              <span className="text-xs font-medium text-muted-foreground">Notes:</span>
              <p className="mt-1 whitespace-pre-wrap rounded-lg bg-muted/50 px-3 py-2 text-sm">{form.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
