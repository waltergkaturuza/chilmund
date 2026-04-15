import type { Metadata } from 'next'
import { Suspense } from 'react'
import { TrackQuotePanel } from '@/components/TrackQuote/TrackQuotePanel'

export const metadata: Metadata = {
  title: 'Track your quote | Chilmund Chemicals',
  description: 'Look up the status of your quote request using your tracking ID.',
}

export default function TrackQuotePage() {
  return (
    <Suspense fallback={<TrackQuoteFallback />}>
      <TrackQuotePanel variant="page" />
    </Suspense>
  )
}

function TrackQuoteFallback() {
  return (
    <div className="min-h-[50vh] bg-[#0f1f32] px-4 py-24">
      <div className="mx-auto h-48 max-w-xl animate-pulse rounded-2xl bg-white/5" />
    </div>
  )
}
