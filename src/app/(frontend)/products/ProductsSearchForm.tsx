'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

export function ProductsSearchForm() {
  const router = useRouter()
  const params = useSearchParams()
  const [q, setQ] = useState(params.get('q') ?? '')

  return (
    <form
      className="flex w-full max-w-xl flex-col gap-2 sm:flex-row sm:items-center"
      onSubmit={(e) => {
        e.preventDefault()
        const next = new URLSearchParams()
        if (q.trim()) next.set('q', q.trim())
        router.push(`/products${next.toString() ? `?${next}` : ''}`)
      }}
    >
      <Input
        aria-label="Search products"
        className="h-11 flex-1 rounded-full border-slate-200 bg-white"
        placeholder="Search by name or description…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <Button className="h-11 rounded-full px-6" type="submit">
        Search
      </Button>
    </form>
  )
}
