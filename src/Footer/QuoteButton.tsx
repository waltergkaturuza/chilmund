'use client'

import { useQuoteModal } from '@/providers/QuoteModal'
import React from 'react'

export function FooterQuoteButton() {
  const { openQuoteModal } = useQuoteModal()

  return (
    <button
      type="button"
      className="mt-6 inline-flex rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
      onClick={openQuoteModal}
    >
      Request a quote
    </button>
  )
}
