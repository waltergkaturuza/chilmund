import React from 'react'

/**
 * Wordmark shown in the Payload admin sidebar (replaces default Payload logo).
 */
export default function AdminLogo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
      <span style={{ fontSize: 15, fontWeight: 600 }}>Chilmund</span>
      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', opacity: 0.7 }}>CHEMICALS</span>
    </div>
  )
}
