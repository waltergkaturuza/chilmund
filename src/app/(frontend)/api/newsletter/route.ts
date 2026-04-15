import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name } = body

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    const existing = await payload.find({
      collection: 'newsletter-subscribers',
      where: { email: { equals: email.trim().toLowerCase() } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      const sub = existing.docs[0]!
      if (sub.status === 'unsubscribed') {
        await payload.update({
          collection: 'newsletter-subscribers',
          id: sub.id,
          data: { status: 'active' },
        })
        return NextResponse.json({ success: true, message: 'Welcome back! You have been re-subscribed.' })
      }
      return NextResponse.json({ success: true, message: 'You are already subscribed!' })
    }

    await payload.create({
      collection: 'newsletter-subscribers',
      data: {
        email: email.trim().toLowerCase(),
        name: name?.trim() || '',
        status: 'active',
        source: 'website',
      },
    })

    return NextResponse.json({ success: true, message: 'Successfully subscribed!' })
  } catch (err) {
    console.error('[newsletter] Error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
