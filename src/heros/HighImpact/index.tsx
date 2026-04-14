'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <section
      className="relative flex min-h-[min(88vh,52rem)] items-center justify-center overflow-hidden text-white"
      data-theme="dark"
    >
      <div className="absolute inset-0 bg-slate-950">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="object-cover opacity-50" priority resource={media} />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/20" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-600/40 to-transparent" />

      <div className="container relative z-10 flex justify-center px-4 py-24 md:py-28">
        <div className="max-w-4xl text-center">
          {richText && (
            <RichText
              className="mb-0 prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-white prose-p:text-lg prose-p:text-white/85 prose-strong:text-white prose-a:text-blue-500 md:prose-p:text-xl [&_h1]:text-4xl [&_h1]:md:text-5xl [&_h1]:lg:text-6xl [&_h1]:leading-[1.08]"
              data={richText}
              enableGutter={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="summit-hero-actions mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap">
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
    </section>
  )
}
