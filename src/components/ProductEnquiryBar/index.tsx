'use client'

import { Button } from '@/components/ui/button'
import { useQuoteModalOptional } from '@/providers/QuoteModal'
import Link from 'next/link'
import React from 'react'

type Props = {
  productTitle: string
  salesEmail: string | null | undefined
}

export function ProductEnquiryBar({ productTitle, salesEmail }: Props) {
  const quoteModal = useQuoteModalOptional()
  const subject = encodeURIComponent(`Product enquiry: ${productTitle}`)
  const mailto = salesEmail?.trim()
    ? `mailto:${salesEmail.trim()}?subject=${subject}`
    : null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/90 bg-white/95 px-4 py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur-md">
      <div className="container flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-800">
          Enquire about <span className="text-blue-900">{productTitle}</span>
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {mailto ? (
            <Button asChild className="rounded-full" size="sm" variant="outline">
              <a href={mailto}>Email sales</a>
            </Button>
          ) : null}
          {quoteModal ? (
            <Button className="rounded-full" size="sm" type="button" onClick={() => quoteModal.openQuoteModal()}>
              Quick quote
            </Button>
          ) : (
            <Button asChild className="rounded-full" size="sm">
              <Link href="/contact">Request a quote</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
