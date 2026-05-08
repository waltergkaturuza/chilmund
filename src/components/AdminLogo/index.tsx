import Image from 'next/image'
import React from 'react'

/**
 * Brand mark for Payload admin (sidebar + login). Uses the same asset as the public site.
 */
export default function AdminLogo() {
  return (
    <div className="chilmund-admin-logo">
      <Image
        src="/logo-new.svg"
        alt="Chilmund Chemicals"
        width={220}
        height={66}
        className="chilmund-admin-logo__img"
        priority
      />
    </div>
  )
}
