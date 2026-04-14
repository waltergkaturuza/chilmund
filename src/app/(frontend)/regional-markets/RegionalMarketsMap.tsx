'use client'

import React, { useState } from 'react'
import { cn } from '@/utilities/ui'

type Market = {
  country: string
  flag: string
  lat: number
  lng: number
  desc: string
  highlight?: boolean
}

/**
 * SVG-based Africa map with approximate dot positions for each market.
 * No external library needed — pure SVG with interactive hover tooltips.
 */
export function RegionalMarketsMap({ markets }: { markets: Market[] }) {
  const [active, setActive] = useState<string | null>(null)

  const mapToSvg = (lat: number, lng: number) => {
    const x = ((lng - (-20)) / (55 - (-20))) * 600
    const y = (((-40) - lat) / ((-40) - 15)) * 500 + 20
    return { x, y }
  }

  return (
    <div className="relative mx-auto max-w-3xl">
      <svg viewBox="0 0 600 540" className="w-full" aria-label="Map of Chilmund regional markets in Africa">
        <rect x="0" y="0" width="600" height="540" fill="none" />

        {/* Africa simplified outline */}
        <path
          d="M280,40 C300,30 340,25 370,35 C400,45 420,60 440,90 C460,120 470,150 475,180 C480,210 485,250 480,280 C475,310 460,340 440,370 C420,390 400,410 380,430 C360,450 340,460 320,470 C300,480 280,485 260,480 C240,475 220,460 200,440 C180,420 165,400 155,370 C145,340 140,310 142,280 C145,250 150,220 160,190 C170,160 185,130 200,105 C215,80 235,60 260,45 Z"
          className="fill-muted/30 stroke-border dark:fill-muted/20"
          strokeWidth="1"
        />

        {/* Market dots */}
        {markets.map((m) => {
          const { x, y } = mapToSvg(m.lat, m.lng)
          const isActive = active === m.country
          return (
            <g
              key={m.country}
              onMouseEnter={() => setActive(m.country)}
              onMouseLeave={() => setActive(null)}
              className="cursor-pointer"
            >
              {/* Pulse ring for highlight */}
              {m.highlight && (
                <circle cx={x} cy={y} r="16" fill="none" stroke="#2563eb" strokeWidth="1.5" opacity="0.3">
                  <animate attributeName="r" from="10" to="20" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                cx={x} cy={y}
                r={m.highlight ? 8 : 6}
                className={cn(
                  'transition-all',
                  m.highlight ? 'fill-blue-600' : 'fill-blue-500',
                  isActive && 'fill-blue-400',
                )}
                stroke="white" strokeWidth="2"
              />
              {/* Label */}
              <text
                x={x}
                y={y - (m.highlight ? 14 : 12)}
                textAnchor="middle"
                className="fill-foreground text-[10px] font-semibold"
              >
                {m.flag} {m.country}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Tooltip */}
      {active && (() => {
        const m = markets.find((mk) => mk.country === active)
        if (!m) return null
        return (
          <div className="absolute bottom-4 left-1/2 z-10 w-72 -translate-x-1/2 rounded-xl border border-border bg-card p-4 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{m.flag}</span>
              <h4 className="font-bold">{m.country}</h4>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
          </div>
        )
      })()}
    </div>
  )
}
