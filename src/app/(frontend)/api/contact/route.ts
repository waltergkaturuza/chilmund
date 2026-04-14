import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, email, phone, company, country, subject, message } = body

    if (!fullName?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Name, email, subject and message are required.' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config: configPromise })

    await payload.create({
      collection: 'contact-submissions',
      data: {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone?.trim() || '',
        company: company?.trim() || '',
        country: country?.trim() || '',
        subject: subject.trim(),
        message: message.trim(),
        status: 'new',
      },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact] Error:', err)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 },
    )
  }
}
