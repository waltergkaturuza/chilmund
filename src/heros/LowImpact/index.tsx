import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

export type LowImpactHeroProps = Page['hero'] & {
  pageSlug?: string
  children?: React.ReactNode
}

export const LowImpactHero: React.FC<LowImpactHeroProps> = ({
  children,
  richText,
  links,
  pageSlug,
}) => {

  const summitHome = pageSlug === 'home'

  if (summitHome) {
    return (
      <section className="relative overflow-hidden bg-[linear-gradient(145deg,oklch(16%_0.045_250deg)_0%,oklch(20%_0.05_248deg)_45%,oklch(24%_0.055_245deg)_100%)] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
        <div className="container relative py-16 md:py-24 lg:py-28">
          <div className="max-w-4xl">
            {children ||
              (richText && (
                <RichText
                  className="mb-0 prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-white prose-p:text-lg prose-p:leading-relaxed prose-p:text-white/85 prose-strong:text-white prose-a:text-amber-300 prose-a:no-underline hover:prose-a:underline md:prose-p:text-xl [&_h1]:text-4xl [&_h1]:md:text-5xl [&_h1]:lg:text-6xl [&_h1]:leading-[1.08] [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:text-white/95"
                  data={richText}
                  enableGutter={false}
                />
              ))}
            {Array.isArray(links) && links.length > 0 && (
              <ul className="summit-hero-actions mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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

  return (
    <div className="container border-b border-border/80 bg-background pt-10 pb-12 md:pt-14 md:pb-16">
      <div className="max-w-[48rem]">
        {children || (richText && <RichText data={richText} enableGutter={false} />)}
        {Array.isArray(links) && links.length > 0 && (
          <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
  )
}
