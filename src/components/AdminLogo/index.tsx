import React from 'react'

import { BrandLogo } from '@/components/BrandLogo/BrandLogo'

/**
 * Brand mark for Payload admin (sidebar + login). Uses the same asset as the public site.
 */
export default function AdminLogo() {
  return (
    <div className="chilmund-admin-logo">
      <BrandLogo
        width={560}
        className="chilmund-admin-logo__img"
        priority
        variant="default"
      />
    </div>
  )
}
