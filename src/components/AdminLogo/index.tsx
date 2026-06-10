import React from 'react'

import { BrandLogo } from '@/components/BrandLogo/BrandLogo'
import { CHILMUND_LOGO_CONTENT } from '@/constants/brand'

const ADMIN_LOGO_WIDTH = 480

/** Height matched to cropped logo aspect ratio so Next/Image is not stretched. */
const ADMIN_LOGO_HEIGHT = Math.round(
  (ADMIN_LOGO_WIDTH * CHILMUND_LOGO_CONTENT.height) / CHILMUND_LOGO_CONTENT.width,
)

/**
 * Brand mark for Payload admin (sidebar + login). Uses the same asset as the public site.
 */
export default function AdminLogo() {
  return (
    <div className="chilmund-admin-logo">
      <BrandLogo
        width={ADMIN_LOGO_WIDTH}
        height={ADMIN_LOGO_HEIGHT}
        className="chilmund-admin-logo__img"
        priority
        variant="default"
      />
    </div>
  )
}
