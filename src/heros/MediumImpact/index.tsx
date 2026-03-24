import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="border-b border-border bg-muted/40">
      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center md:text-left">
          {richText && (
            <RichText
              className="mb-6 prose-headings:font-extrabold prose-headings:tracking-tight [&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:lg:text-5xl"
              data={richText}
              enableGutter={false}
            />
          )}

          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} size="lg" />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      {media && typeof media === 'object' && (
        <div className="container pb-12">
          <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
            <Media className="w-full" imgClassName="max-h-[28rem] w-full object-cover" priority resource={media} />
            {media?.caption && (
              <div className="border-t border-border bg-card px-4 py-3">
                <RichText data={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
