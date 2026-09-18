import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Privacy Policy | Chilmund Chemicals',
  description:
    'How Chilmund Chemicals collects, uses, and protects personal information when you use our website and services.',
}

export default function PrivacyPolicyPage() {
  return (
    <article className="container mx-auto max-w-3xl px-4 py-10 md:py-14">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-white/45">Last updated {new Date().getFullYear()}</p>

      <div className="prose prose-slate mt-10 max-w-none dark:prose-invert prose-p:text-justify prose-headings:text-slate-900 dark:prose-headings:text-white">
        <p>
          Chilmund Chemicals (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your privacy.
          This policy describes how we may collect and use information when you visit our website or
          contact us. It is intended as a summary for visitors; definitive arrangements are governed by
          your contracts and applicable law.
        </p>

        <h2>Information we may collect</h2>
        <p>
          We may collect information you provide directly (such as name, company, email, and phone number
          when you submit forms or request quotes) and technical data typical of websites (such as browser
          type, general location, and pages visited), including through analytics tools where enabled.
        </p>

        <h2>How we use information</h2>
        <p>
          We use this information to respond to enquiries, provide products and services, improve our site,
          comply with legal obligations, and protect our legitimate business interests.
        </p>

        <h2>Retention and security</h2>
        <p>
          We retain information only as long as needed for these purposes unless a longer period is required
          by law. We apply reasonable safeguards; no transmission over the internet is completely secure.
        </p>

        <h2>Your rights</h2>
        <p>
          Depending on applicable law, you may have rights to access, correct, or object to certain
          processing of your personal data. Contact us using the details on our{' '}
          <a href="/contact">contact page</a> to make a request.
        </p>

        <h2>Changes</h2>
        <p>
          We may update this policy from time to time. Material changes may be reflected on this page or
          notified as appropriate.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about privacy may be directed to Chilmund Chemicals via the contact information published
          on this website.
        </p>
      </div>
    </article>
  )
}
