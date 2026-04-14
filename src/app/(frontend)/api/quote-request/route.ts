import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

function generateTrackingId(): string {
  const now = new Date()
  const yy = String(now.getFullYear()).slice(-2)
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return `CHM-${yy}${mm}${dd}-${code}`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      fullName, email, phone, company, jobTitle,
      country, province, city, products, otherProduct,
      industry, volume, delivery, deliveryAddress, urgency, message,
    } = body

    if (!fullName?.trim() || !email?.trim() || !phone?.trim() || !company?.trim()) {
      return NextResponse.json(
        { error: 'Name, email, phone, and company are required.' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config: configPromise })
    const trackingId = generateTrackingId()

    await payload.create({
      collection: 'quote-requests',
      data: {
        trackingId,
        fullName,
        email,
        phone,
        company,
        jobTitle: jobTitle || '',
        country: country || '',
        province: province || '',
        city: city || '',
        products: products || '',
        otherProduct: otherProduct || '',
        industry: industry || '',
        volume: volume || '',
        delivery: delivery || '',
        deliveryAddress: deliveryAddress || '',
        urgency: urgency || 'Standard',
        message: message || '',
        status: 'pending',
      },
    })

    return NextResponse.json({ success: true, trackingId })
  } catch (err) {
    console.error('[quote-request] Error:', err)
    return NextResponse.json(
      { error: 'Failed to submit quote request. Please try again.' },
      { status: 500 },
    )
  }
}
