import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Terms of Use | Chilmund Chemicals',
  description:
    'Terms governing use of the Chilmund Chemicals website and limitations of liability for site content.',
}

export default function TermsOfUsePage() {
  return (
    <article className="container mx-auto max-w-3xl px-4 py-14 md:py-20">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Terms of Use</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-white/45">Last updated {new Date().getFullYear()}</p>

      <div className="prose prose-slate mt-10 max-w-none dark:prose-invert prose-p:text-justify prose-headings:text-slate-900 dark:prose-headings:text-white">
        <p>
          By accessing or using this website operated by Chilmund Chemicals, you agree to these terms.
          If you do not agree, please do not use the site.
        </p>

        <h2>Use of the website</h2>
        <p>
          Content is provided for general information about our company and products. It does not constitute
          professional, technical, or legal advice unless expressly stated in writing under a separate
          agreement.
        </p>

        <h2>Intellectual property</h2>
        <p>
          Unless otherwise indicated, materials on this site (including text, graphics, and logos) are owned
          by or licensed to Chilmund Chemicals and may not be copied, reproduced, or distributed beyond what
          the law permits without our prior consent.
        </p>

        <h2>No warranty</h2>
        <p>
          We aim to keep information accurate but do not guarantee that the site is error-free or available
          at all times. The site is provided &quot;as is&quot; to the fullest extent permitted by applicable
          law.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the extent permitted by law, Chilmund Chemicals and its affiliates shall not be liable for
          indirect or consequential losses arising from your use of, or reliance on, this website.
        </p>

        <h2>Privacy</h2>
        <p>
          Processing of personal data is described in our{' '}
          <a href="/privacy-policy">Privacy Policy</a>.
        </p>

        <h2>Law</h2>
        <p>
          These terms are governed by applicable law in Zimbabwe unless mandatory rules of another
          jurisdiction apply to you.
        </p>

        <h2>Contact</h2>
        <p>
          For enquiries, please use the details on our <a href="/contact">contact page</a>.
        </p>
      </div>
    </article>
  )
}
