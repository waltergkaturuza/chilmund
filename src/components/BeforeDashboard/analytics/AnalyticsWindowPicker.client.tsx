'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import {
  ANALYTICS_WINDOW_COOKIE,
  ANALYTICS_WINDOW_OPTIONS,
} from '@/constants/analytics'

type AnalyticsWindowPickerProps = {
  selectedDays: number
}

export function AnalyticsWindowPicker({ selectedDays }: AnalyticsWindowPickerProps) {
  const router = useRouter()

  const onSelect = (days: number) => {
    if (days === selectedDays) return

    document.cookie = `${ANALYTICS_WINDOW_COOKIE}=${days}; path=/admin; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
    router.refresh()
  }

  return (
    <div className="chilmund-analytics__window-picker" role="group" aria-label="Analytics date range">
      {ANALYTICS_WINDOW_OPTIONS.map((option) => (
        <button
          key={option.days}
          type="button"
          className={`chilmund-analytics__window-option${
            selectedDays === option.days ? ' chilmund-analytics__window-option--active' : ''
          }`}
          aria-pressed={selectedDays === option.days}
          onClick={() => onSelect(option.days)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
