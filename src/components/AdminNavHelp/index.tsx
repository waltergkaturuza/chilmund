'use client'

import { recommendedHeaderNavBlueprint } from '@/content/siteStructure'
import React from 'react'

/**
 * Short guidance for editors configuring the header global (Payload admin).
 */
export function AdminNavHelp() {
  return (
    <div
      className="field-type"
      style={{
        padding: 'var(--base) 0',
        maxWidth: '42rem',
        lineHeight: 1.55,
        color: 'var(--theme-elevation-800)',
      }}
    >
      <p style={{ marginBottom: 'var(--base)' }}>
        The live site follows a <strong>conference-style top bar</strong>: a row of pill tabs (gold highlight
        on the current page), <strong>dropdowns</strong> with a chevron for grouped sections, plus{' '}
        <strong>search</strong> (with ⌘/Ctrl+K), <strong>theme</strong> toggle, and <strong>Request a quote</strong>{' '}
        on the right.
      </p>
      <p style={{ marginBottom: '0.5rem' }}>
        <strong>Suggested menu structure</strong> (create matching pages or custom URLs in Payload):
      </p>
      <ul style={{ margin: '0 0 var(--base)', paddingLeft: '1.25rem' }}>
        {recommendedHeaderNavBlueprint.map((entry, i) =>
          entry.type === 'link' ? (
            <li key={i} style={{ marginBottom: '0.35rem' }}>
              <strong>Single link</strong> — {entry.label}
              {' · '}
              <code style={{ fontSize: '0.9em' }}>/{entry.pageSlug}</code>
            </li>
          ) : (
            <li key={i} style={{ marginBottom: '0.5rem' }}>
              <strong>Dropdown</strong> — {entry.label}
              <ul style={{ margin: '0.35rem 0 0', paddingLeft: '1.1rem' }}>
                {entry.sub.map((s, j) => (
                  <li key={j} style={{ marginBottom: '0.2rem' }}>
                    {s.label}
                    {' · '}
                    <code style={{ fontSize: '0.9em' }}>
                      {'href' in s ? s.href : `/${s.pageSlug}`}
                    </code>
                  </li>
                ))}
              </ul>
            </li>
          ),
        )}
      </ul>
      <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
        <li style={{ marginBottom: '0.35rem' }}>
          <strong>Single link</strong> — one destination per row.
        </li>
        <li style={{ marginBottom: '0.35rem' }}>
          <strong>Dropdown group</strong> — label on the pill; sub-links in the panel.
        </li>
        <li>Order items left → right as they should appear; the bar scrolls horizontally on smaller desktops.</li>
      </ul>
    </div>
  )
}
