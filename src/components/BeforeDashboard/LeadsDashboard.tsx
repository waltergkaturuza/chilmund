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
    {
      label: 'Quote Requests',
      total: quotesAll.totalDocs,
      last30: quotesRecent.totalDocs,
      last7: quotes7d.totalDocs,
      pending: quotesPending.totalDocs,
      pendingLabel: 'Pending',
      pillTone: 'quotes' as const,
    },
    {
      label: 'Contact Messages',
      total: contactsAll.totalDocs,
      last30: contactsRecent.totalDocs,
      last7: contacts7d.totalDocs,
      pending: contactsNew.totalDocs,
      pendingLabel: 'Unread',
      pillTone: 'contacts' as const,
    },
  ]

  return (
    <div className="chilmund-leads-stats">
      <h3 className="chilmund-leads-stats__title">Leads & Enquiries Dashboard</h3>
      <div className="chilmund-leads-stats__grid">
        {cards.map((c) => (
          <div key={c.label} className="chilmund-leads-stats__card">
            <div className="chilmund-leads-stats__card-head">
              <span className="chilmund-leads-stats__card-label">{c.label}</span>
              {c.pending > 0 && (
                <span
                  className={`chilmund-leads-stats__pill chilmund-leads-stats__pill--${c.pillTone}`}
                >
                  {c.pending} {c.pendingLabel}
                </span>
              )}
            </div>
            <div className="chilmund-leads-stats__metrics">
              <div className="chilmund-leads-stats__metric">
                <div className="chilmund-leads-stats__metric-val">{c.total}</div>
                <div className="chilmund-leads-stats__metric-lbl">All time</div>
              </div>
              <div className="chilmund-leads-stats__metric">
                <div className="chilmund-leads-stats__metric-val">{c.last30}</div>
                <div className="chilmund-leads-stats__metric-lbl">Last 30 days</div>
              </div>
              <div className="chilmund-leads-stats__metric">
                <div className="chilmund-leads-stats__metric-val">{c.last7}</div>
                <div className="chilmund-leads-stats__metric-lbl">Last 7 days</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
