import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="container my-16 md:my-20">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,oklch(18%_0.045_250deg)_0%,oklch(22%_0.05_248deg)_100%)] px-6 py-10 text-white shadow-xl md:px-12 md:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-blue-600/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -left-16 size-48 rounded-full bg-white/5 blur-2xl"
        />
        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl flex-1">
            {richText && (
              <RichText
                className="mb-0 prose-headings:font-extrabold prose-headings:text-white prose-p:text-lg prose-p:text-white/80 prose-strong:text-white"
                data={richText}
                enableGutter={false}
              />
            )}
          </div>
          <div className="cta-summit-actions flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col lg:items-stretch xl:flex-row">
            {(links || []).map(({ link }, i) => {
              return <CMSLink key={i} className="min-w-[12rem] justify-center lg:min-w-0" size="lg" {...link} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
