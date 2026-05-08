import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

import { HomeHeroSlideshow } from './HomeHeroSlideshow'
const HOME_HERO_READ_MORE_TEXT =
  'Experience the unmatched performance and reliability of our world-class products. We are dedicated to making clean, safe water accessible to all, driving sustainable development, and building a brighter future for Africa.'

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
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-600/50 to-transparent" />
        {/* Near full-bleed: avoid global .container max-width so the hero (esp. video) uses almost the viewport. */}
        <div className="relative mx-auto w-full max-w-none px-3 pb-6 pt-5 sm:px-4 sm:pt-6 md:px-5 md:pb-8 md:pt-7 lg:px-7 lg:pb-10 lg:pt-8 xl:px-10">
          {/* Slightly wider video column than copy on lg+ */}
          <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-10">
            <div className="flex max-w-3xl flex-col justify-center lg:col-span-5 xl:max-w-none">
              {children ||
                (richText && (
                  <RichText
                    className="mb-0 prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-white prose-p:text-justify prose-p:text-lg prose-p:leading-relaxed prose-p:text-white/85 prose-strong:text-white prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline md:prose-p:text-xl [&_h1]:text-justify [&_h1]:text-3xl [&_h1]:text-blue-400 [&_h1]:md:text-4xl [&_h1]:leading-tight [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:text-white/95"
                    data={richText}
                    enableGutter={false}
                  />
                ))}
              {!children && (
                <details className="mt-3">
                  <summary className="cursor-pointer text-sm font-semibold text-blue-400 underline-offset-4 transition-colors hover:text-blue-300 hover:underline">
                    Read more
                  </summary>
                  <p className="mt-2 text-justify text-base leading-relaxed text-white/78 md:text-lg">
                    {HOME_HERO_READ_MORE_TEXT}
                  </p>
                </details>
              )}
              {Array.isArray(links) && links.length > 0 && (
                <ul className="summit-hero-actions mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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
            <div className="relative flex min-h-0 flex-col lg:col-span-7 lg:min-h-[min(520px,_62vh)]">
              <div className="relative min-h-[220px] flex-1 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-[0_28px_70px_-14px_rgba(0,0,0,0.5)] ring-1 ring-white/10 sm:min-h-[280px] lg:min-h-0">
                <HomeHeroSlideshow className="absolute inset-0 size-full" />
              </div>
              <p className="mt-3 shrink-0 text-center text-[0.7rem] uppercase tracking-[0.12em] text-white/50 lg:text-right">
                Manufacturing campus — photo highlights
              </p>
            </div>
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
