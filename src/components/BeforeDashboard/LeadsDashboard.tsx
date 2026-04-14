import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function LeadsDashboard() {
  const payload = await getPayload({ config: configPromise })

  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()

  const [quotesAll, quotesRecent, quotes7d, contactsAll, contactsRecent, contacts7d] =
    await Promise.all([
      payload.count({ collection: 'quote-requests' }),
      payload.count({
        collection: 'quote-requests',
        where: { createdAt: { greater_than: thirtyDaysAgo } },
      }),
      payload.count({
        collection: 'quote-requests',
        where: { createdAt: { greater_than: sevenDaysAgo } },
      }),
      payload.count({ collection: 'contact-submissions' }),
      payload.count({
        collection: 'contact-submissions',
        where: { createdAt: { greater_than: thirtyDaysAgo } },
      }),
      payload.count({
        collection: 'contact-submissions',
        where: { createdAt: { greater_than: sevenDaysAgo } },
      }),
    ])

  const quotesPending = await payload.count({
    collection: 'quote-requests',
    where: { status: { equals: 'pending' } },
  })

  const contactsNew = await payload.count({
    collection: 'contact-submissions',
    where: { status: { equals: 'new' } },
  })

  const cards = [
    { label: 'Quote Requests', total: quotesAll.totalDocs, last30: quotesRecent.totalDocs, last7: quotes7d.totalDocs, pending: quotesPending.totalDocs, pendingLabel: 'Pending', color: '#2563eb' },
    { label: 'Contact Messages', total: contactsAll.totalDocs, last30: contactsRecent.totalDocs, last7: contacts7d.totalDocs, pending: contactsNew.totalDocs, pendingLabel: 'Unread', color: '#059669' },
  ]

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
        Leads & Enquiries Dashboard
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
        {cards.map((c) => (
          <div
            key={c.label}
            style={{
              border: '1px solid var(--theme-elevation-150)',
              borderRadius: '0.75rem',
              padding: '1.25rem',
              background: 'var(--theme-elevation-50)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600 }}>{c.label}</span>
              {c.pending > 0 && (
                <span
                  style={{
                    background: c.color,
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                  }}
                >
                  {c.pending} {c.pendingLabel}
                </span>
              )}
            </div>
            <div style={{ marginTop: '0.75rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{c.total}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--theme-elevation-400)' }}>All time</div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{c.last30}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--theme-elevation-400)' }}>Last 30 days</div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{c.last7}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--theme-elevation-400)' }}>Last 7 days</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
