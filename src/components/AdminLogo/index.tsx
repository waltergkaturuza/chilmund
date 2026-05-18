import Image from 'next/image'
import React from 'react'

import { CHILMUND_LOGO_ALT, CHILMUND_LOGO_SRC } from '@/constants/brand'

/**
 * Brand mark for Payload admin (sidebar + login). Uses the same asset as the public site.
 */
export default function AdminLogo() {
  return (
    <div className="chilmund-admin-logo">
      <Image
        src={CHILMUND_LOGO_SRC}
        alt={CHILMUND_LOGO_ALT}
        width={220}
        height={66}
        className="chilmund-admin-logo__img"
        priority
      />
    </div>
  )
}
