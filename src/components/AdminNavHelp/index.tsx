'use client'

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
        The public header uses a <strong>centered pill bar</strong> on large screens (like major event sites)
        and a <strong>slide-out menu</strong> on phones.
      </p>
      <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
        <li style={{ marginBottom: '0.35rem' }}>
          <strong>Single link</strong> — one destination (Home, News, Contact).
        </li>
        <li style={{ marginBottom: '0.35rem' }}>
          <strong>Dropdown group</strong> — a label that opens a panel of sub-links (e.g. Company → Vision,
          SHEQ, CSR).
        </li>
        <li>
          Put the most important items first; overflow scrolls horizontally on medium widths.
        </li>
      </ul>
    </div>
  )
}
