import { cookies } from 'next/headers'
import React from 'react'

import { parseAnalyticsWindowDays, ANALYTICS_WINDOW_COOKIE } from '@/constants/analytics'

import { AnalyticsLineChart } from './AnalyticsCharts.client'
import { AnalyticsWindowPicker } from './AnalyticsWindowPicker.client'
import { getAnalyticsData } from './getAnalyticsData'

function bucketSubtitle(unit: 'day' | 'week' | 'month', windowLabel: string): string {
  const unitLabel = unit === 'day' ? 'DAY' : unit === 'week' ? 'WEEK' : 'MONTH'
  return `BY ${unitLabel} (${windowLabel.toUpperCase()})`
}

function formatEventTime(iso: string): string {
  return new Date(iso).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  })
}

function interactionIcon(icon: string): string {
  switch (icon) {
    case 'quote':
      return '📋'
    case 'contact':
      return '✉️'
    case 'newsletter':
      return '📰'
    case 'form':
      return '📝'
    case 'whatsapp':
      return '💬'
    case 'call':
      return '📞'
    default:
      return '•'
  }
}

export async function AnalyticsDashboard() {
  const cookieStore = await cookies()
  const windowDays = parseAnalyticsWindowDays(cookieStore.get(ANALYTICS_WINDOW_COOKIE)?.value)
  const data = await getAnalyticsData(windowDays)
  const maxTopPage = data.topPages[0]?.count || 1
  const pageViewsSubtitle = bucketSubtitle(data.bucketUnit, data.windowLabel)
  const eventsSubtitle = bucketSubtitle(data.bucketUnit, data.windowLabel)

  return (
    <div className="chilmund-analytics">
      <header className="chilmund-analytics__header">
        <div>
          <h2 className="chilmund-analytics__title">Analytics</h2>
          <p className="chilmund-analytics__subtitle">Site visitors and interactions</p>
        </div>
        <AnalyticsWindowPicker selectedDays={windowDays} />
      </header>

      <div className="chilmund-analytics__grid chilmund-analytics__grid--hero">
        <div className="chilmund-analytics__card chilmund-analytics__card--compact">
          <h4 className="chilmund-analytics__card-title">Tracking</h4>
          <ul className="chilmund-analytics__meta-list">
            <li>
              <span>Window</span>
              <strong>{data.windowLabel}</strong>
            </li>
            <li>
              <span>Unique visitors</span>
              <strong>{data.uniqueVisitors.toLocaleString()}</strong>
            </li>
            <li>
              <span>Source</span>
              <strong>First-party</strong>
            </li>
          </ul>
        </div>

        <div className="chilmund-analytics__card chilmund-analytics__card--chart">
          <AnalyticsLineChart
            data={data.pageViewsByDay}
            title="Page views"
            subtitle={pageViewsSubtitle}
          />
        </div>
      </div>

      <div className="chilmund-analytics__grid chilmund-analytics__grid--stats">
        <div className="chilmund-analytics__stat">
          <span className="chilmund-analytics__stat-label">Unique visitors</span>
          <span className="chilmund-analytics__stat-sub">{data.windowLabel}</span>
          <span className="chilmund-analytics__stat-value">{data.uniqueVisitors.toLocaleString()}</span>
        </div>
        <div className="chilmund-analytics__stat">
          <span className="chilmund-analytics__stat-label">Total page views</span>
          <span className="chilmund-analytics__stat-sub">All time</span>
          <span className="chilmund-analytics__stat-value">
            {data.totalPageViews.toLocaleString()}
          </span>
        </div>
        <div className="chilmund-analytics__stat">
          <span className="chilmund-analytics__stat-label">Views today</span>
          <span className="chilmund-analytics__stat-sub">Count</span>
          <span className="chilmund-analytics__stat-value">{data.viewsToday.toLocaleString()}</span>
        </div>
      </div>

      <div className="chilmund-analytics__grid chilmund-analytics__grid--split">
        <div className="chilmund-analytics__card chilmund-analytics__card--chart">
          <AnalyticsLineChart
            data={data.eventsByDay}
            title="Events"
            subtitle={eventsSubtitle}
            fill
          />
          {data.eventsByType.length > 0 ? (
            <ul className="chilmund-analytics__legend">
              {data.eventsByType.slice(0, 6).map((e) => (
                <li key={e.type}>
                  <span className="chilmund-analytics__legend-dot" />
                  {e.label} ({e.count})
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="chilmund-analytics__card">
          <h4 className="chilmund-analytics__card-title">Top pages</h4>
          <p className="chilmund-analytics__card-sub">{data.windowLabel}</p>
          {data.topPages.length === 0 ? (
            <p className="chilmund-analytics__empty">No page views recorded yet.</p>
          ) : (
            <ol className="chilmund-analytics__top-pages">
              {data.topPages.map((page, index) => (
                <li key={page.path}>
                  <span className="chilmund-analytics__rank">{index + 1}</span>
                  <span className="chilmund-analytics__path">{page.path}</span>
                  <span className="chilmund-analytics__bar-wrap">
                    <span
                      className="chilmund-analytics__bar"
                      style={{ width: `${(page.count / maxTopPage) * 100}%` }}
                    />
                  </span>
                  <span className="chilmund-analytics__count">{page.count}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      <div className="chilmund-analytics__interactions">
        <h4 className="chilmund-analytics__section-title">Key interactions</h4>
        <div className="chilmund-analytics__interaction-grid">
          {data.keyInteractions.map((item) => (
            <div key={item.label} className="chilmund-analytics__interaction">
              <span className="chilmund-analytics__interaction-icon" aria-hidden>
                {interactionIcon(item.icon)}
              </span>
              <span className="chilmund-analytics__interaction-count">
                {item.periodCount.toLocaleString()}
              </span>
              <span className="chilmund-analytics__interaction-label">{item.label}</span>
              <span className="chilmund-analytics__interaction-all">
                {item.count.toLocaleString()} all time
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="chilmund-analytics__card chilmund-analytics__card--table">
        <h4 className="chilmund-analytics__card-title">Recent events</h4>
        {data.recentEvents.length === 0 ? (
          <p className="chilmund-analytics__empty">Events will appear here once tracking is active.</p>
        ) : (
          <table className="chilmund-analytics__table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Path</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {data.recentEvents.map((event) => (
                <tr key={event.id}>
                  <td>
                    <span className="chilmund-analytics__event-pill">{event.eventLabel}</span>
                  </td>
                  <td>{event.path}</td>
                  <td>{formatEventTime(event.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
