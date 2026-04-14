import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      fullName,
      email,
      phone,
      company,
      jobTitle,
      country,
      city,
      products,
      otherProduct,
      industry,
      volume,
      delivery,
      deliveryAddress,
      urgency,
      message,
    } = body

    if (!fullName?.trim() || !email?.trim() || !phone?.trim() || !company?.trim()) {
      return NextResponse.json(
        { error: 'Name, email, phone, and company are required.' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config: configPromise })

    const submissionData = [
      { field: 'fullName', value: fullName },
      { field: 'email', value: email },
      { field: 'phone', value: phone },
      { field: 'company', value: company },
      { field: 'jobTitle', value: jobTitle || '' },
      { field: 'country', value: country || '' },
      { field: 'city', value: city || '' },
      { field: 'products', value: products || '' },
      { field: 'otherProduct', value: otherProduct || '' },
      { field: 'industry', value: industry || '' },
      { field: 'volume', value: volume || '' },
      { field: 'delivery', value: delivery || '' },
      { field: 'deliveryAddress', value: deliveryAddress || '' },
      { field: 'urgency', value: urgency || 'Standard' },
      { field: 'message', value: message || '' },
    ]

    // Store in form-submissions if a "Quote Request" form exists
    const { docs: forms } = await payload.find({
      collection: 'forms',
      where: { title: { like: 'quote' } },
      limit: 1,
    })

    if (forms.length > 0) {
      await payload.create({
        collection: 'form-submissions',
        data: {
          form: forms[0]!.id,
          submissionData,
        },
      })
    } else {
      // Fallback: store as a generic form submission by creating the form first
      const quoteForm = await payload.create({
        collection: 'forms',
        data: {
          title: 'Quote Request',
          fields: [
            { blockType: 'text', name: 'fullName', label: 'Full Name', required: true },
            { blockType: 'email', name: 'email', label: 'Email', required: true },
            { blockType: 'text', name: 'phone', label: 'Phone', required: true },
            { blockType: 'text', name: 'company', label: 'Company', required: true },
            { blockType: 'text', name: 'jobTitle', label: 'Job Title' },
            { blockType: 'text', name: 'country', label: 'Country' },
            { blockType: 'text', name: 'city', label: 'City' },
            { blockType: 'text', name: 'products', label: 'Products' },
            { blockType: 'text', name: 'otherProduct', label: 'Other Product' },
            { blockType: 'text', name: 'industry', label: 'Industry' },
            { blockType: 'text', name: 'volume', label: 'Volume' },
            { blockType: 'text', name: 'delivery', label: 'Delivery' },
            { blockType: 'text', name: 'deliveryAddress', label: 'Delivery Address' },
            { blockType: 'text', name: 'urgency', label: 'Urgency' },
            { blockType: 'textarea', name: 'message', label: 'Message' },
          ],
          confirmationType: 'message',
        },
      })

      await payload.create({
        collection: 'form-submissions',
        data: {
          form: quoteForm.id,
          submissionData,
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[quote-request] Error:', err)
    return NextResponse.json(
      { error: 'Failed to submit quote request. Please try again.' },
      { status: 500 },
    )
  }
}
