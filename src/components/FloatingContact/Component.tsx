import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { CompanyContact } from '@/payload-types'

import { FloatingContactClient } from './Component.client'

export async function FloatingContact() {
  const data: CompanyContact = await getCachedGlobal('company-contact', 0)()

  return (
    <FloatingContactClient
      enableFloatingActions={Boolean(data?.enableFloatingActions)}
      quotePagePath={data?.quotePagePath}
      salesEmail={data?.salesEmail}
      salesPhone={data?.salesPhone}
      salesPhoneTel={data?.salesPhoneTel}
      whatsappNumber={data?.whatsappNumber}
      whatsappPrefillMessage={data?.whatsappPrefillMessage}
    />
  )
}
