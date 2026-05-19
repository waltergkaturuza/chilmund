import React from 'react'

import { BrandLogo } from '@/components/BrandLogo/BrandLogo'

/**
 * Brand mark for Payload admin (sidebar + login). Uses the same asset as the public site.
 */
export default function AdminLogo() {
  return (
    <div className="chilmund-admin-logo">
      <BrandLogo
        width={220}
        height={156}
        className="chilmund-admin-logo__img h-auto w-full max-w-[220px]"
        priority
      />
    </div>
  )
}
