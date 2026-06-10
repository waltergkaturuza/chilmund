import React from 'react'

/** Persistent link from the admin sidebar back to the public site. */
export default function AdminReturnToSite() {
  return (
    <div className="chilmund-admin-return">
      <a className="chilmund-admin-return__link" href="/">
        ← Return to website
      </a>
    </div>
  )
}
