'use client'

import { Mail, MessageCircle, Phone, X } from 'lucide-react'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'

import { Button } from '@/components/ui/button'
import { useQuoteModalOptional } from '@/providers/QuoteModal'
import { cn } from '@/utilities/ui'

export type FloatingContactClientProps = {
  enableFloatingActions: boolean
  salesPhone: string | null | undefined
  salesPhoneTel: string | null | undefined
  salesEmail: string | null | undefined
  whatsappNumber: string | null | undefined
  whatsappPrefillMessage: string | null | undefined
  quotePagePath: string | null | undefined
}

function waUrl(number: string, text: string) {
  const digits = number.replace(/\D/g, '')
  const params = new URLSearchParams()
  if (text.trim()) params.set('text', text)
  const q = params.toString()
  return `https://wa.me/${digits}${q ? `?${q}` : ''}`
}

export function FloatingContactClient({
  enableFloatingActions,
  salesPhone,
  salesPhoneTel,
  salesEmail,
  whatsappNumber,
  whatsappPrefillMessage,
  quotePagePath,
}: FloatingContactClientProps) {
  const [open, setOpen] = useState(false)
  const quoteModal = useQuoteModalOptional()

  const track = useCallback((action: string) => {
    if (
      typeof window !== 'undefined' &&
      'gtag' in window &&
      typeof (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag === 'function'
    ) {
      ;(window as unknown as { gtag: (...a: unknown[]) => void }).gtag('event', action, {
        event_category: 'contact',
      })
    }
  }, [])

  if (!enableFloatingActions) return null

  const tel = (salesPhoneTel || salesPhone || '').replace(/\s/g, '')
  const wa = whatsappNumber?.replace(/\D/g, '')
  const prefill = whatsappPrefillMessage?.trim() || ''
  const quoteHref = quotePagePath?.startsWith('/') ? quotePagePath : `/${quotePagePath || 'contact'}`

  return (
    <div className="pointer-events-none fixed bottom-0 right-0 z-50 flex flex-col items-end gap-3 p-4 md:p-6">
      <div
        className={cn(
          'flex max-w-[min(100vw-2rem,20rem)] flex-col gap-2 rounded-2xl border border-border bg-card p-4 shadow-lg transition-all duration-200 ease-out',
          open
            ? 'pointer-events-auto visible translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none invisible translate-y-2 scale-95 opacity-0',
        )}
        aria-hidden={!open}
      >
        <p className="text-sm font-medium text-foreground">Contact Chilmund</p>
        <p className="text-xs text-muted-foreground">WhatsApp, call, email, or request a quote.</p>
        <div className="mt-1 flex flex-col gap-2">
          {wa ? (
            <Button asChild className="w-full justify-start gap-2" variant="default">
              <a
                data-contact="whatsapp"
                href={waUrl(wa, prefill)}
                rel="noopener noreferrer"
                target="_blank"
                onClick={() => track('whatsapp_click')}
              >
                <MessageCircle aria-hidden className="size-4 shrink-0" />
                WhatsApp
              </a>
            </Button>
          ) : null}
          {tel ? (
            <Button asChild className="w-full justify-start gap-2" variant="secondary">
              <a data-contact="call" href={`tel:${tel}`} onClick={() => track('call_click')}>
                <Phone aria-hidden className="size-4 shrink-0" />
                Call {salesPhone || tel}
              </a>
            </Button>
          ) : null}
          {salesEmail ? (
            <Button asChild className="w-full justify-start gap-2" variant="outline">
              <a
                data-contact="email"
                href={`mailto:${salesEmail}`}
                onClick={() => track('email_click')}
              >
                <Mail aria-hidden className="size-4 shrink-0" />
                Email sales
              </a>
            </Button>
          ) : null}
          <Button asChild className="w-full justify-start gap-2" variant="outline">
            <Link
              data-contact="quote"
              href={quoteHref}
              onClick={(e) => {
                track('quote_click')
                if (quoteModal) {
                  e.preventDefault()
                  quoteModal.openQuoteModal()
                }
              }}
            >
              Request a quote
            </Link>
          </Button>
        </div>
      </div>

      {wa ? (
        <div className="pointer-events-auto hidden gap-2 md:flex">
          <Button
            asChild
            className="h-12 rounded-full bg-[#25D366] px-5 text-white shadow-md hover:bg-[#20bd5a]"
          >
            <a
              aria-label="WhatsApp"
              href={waUrl(wa, prefill)}
              rel="noopener noreferrer"
              target="_blank"
              onClick={() => track('whatsapp_click')}
            >
              <MessageCircle aria-hidden className="mr-2 size-5" />
              WhatsApp
            </a>
          </Button>
        </div>
      ) : null}

      <div className="pointer-events-auto flex gap-2 md:hidden">
        {tel ? (
          <Button
            asChild
            className="size-14 rounded-full shadow-md"
            size="icon"
            variant="secondary"
          >
            <a aria-label="Call sales" href={`tel:${tel}`} onClick={() => track('call_click')}>
              <Phone className="size-6" />
            </a>
          </Button>
        ) : null}
        {wa ? (
          <Button
            asChild
            className="size-14 rounded-full bg-[#25D366] text-white shadow-md hover:bg-[#20bd5a]"
            size="icon"
          >
            <a
              aria-label="WhatsApp"
              href={waUrl(wa, prefill)}
              rel="noopener noreferrer"
              target="_blank"
              onClick={() => track('whatsapp_click')}
            >
              <MessageCircle className="size-6" />
            </a>
          </Button>
        ) : null}
      </div>

      <button
        aria-expanded={open}
        aria-label={open ? 'Close contact menu' : 'Open contact menu'}
        className={cn(
          'pointer-events-auto flex size-14 items-center justify-center rounded-full shadow-lg transition-transform active:scale-95',
          'bg-primary text-primary-foreground hover:opacity-90',
        )}
        type="button"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>
    </div>
  )
}
