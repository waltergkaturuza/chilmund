'use client'

import React from 'react'

import type { DailyCount } from './getAnalyticsData'

type LineChartProps = {
  data: DailyCount[]
  title: string
  subtitle?: string
  fill?: boolean
}

function buildPath(data: DailyCount[], height: number, width: number, fill: boolean) {
  if (data.length === 0) return ''

  const max = Math.max(...data.map((d) => d.count), 1)
  const step = width / Math.max(data.length - 1, 1)

  const points = data.map((d, i) => {
    const x = i * step
    const y = height - (d.count / max) * (height - 8) - 4
    return `${x},${y}`
  })

  if (fill) {
    const base = `${points[0]?.split(',')[0]},${height} `
    const top = points.join(' ')
    const end = `${points[points.length - 1]?.split(',')[0]},${height}`
    return `M ${base}${top} ${end} Z`
  }

  return `M ${points.join(' L ')}`
}

export function AnalyticsLineChart({ data, title, subtitle, fill = false }: LineChartProps) {
  const width = 560
  const height = 180
  const path = buildPath(data, height, width, fill)
  const max = Math.max(...data.map((d) => d.count), 1)

  return (
    <div className="chilmund-analytics-chart">
      <div className="chilmund-analytics-chart__head">
        <div>
          <h4 className="chilmund-analytics-chart__title">{title}</h4>
          {subtitle ? <p className="chilmund-analytics-chart__subtitle">{subtitle}</p> : null}
        </div>
        <span className="chilmund-analytics-chart__peak">Peak: {max}</span>
      </div>
      <svg
        className="chilmund-analytics-chart__svg"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        role="img"
        aria-label={`${title} chart`}
      >
        <defs>
          <linearGradient id="chilmundChartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1877f2" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#1877f2" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((ratio) => (
          <line
            key={ratio}
            x1="0"
            y1={height * ratio}
            x2={width}
            y2={height * ratio}
            stroke="rgba(15,31,50,0.08)"
            strokeWidth="1"
          />
        ))}
        {fill ? (
          <path d={path} fill="url(#chilmundChartFill)" stroke="none" />
        ) : null}
        <path
          d={buildPath(data, height, width, false)}
          fill="none"
          stroke="#1877f2"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="chilmund-analytics-chart__axis">
        {data.map((d) => (
          <span key={d.date} className="chilmund-analytics-chart__tick">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  )
}
