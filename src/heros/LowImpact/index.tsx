import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

/** Public / filename with spaces — URL-encoded for `<source>` */
const HOME_HERO_DRONE_MP4_SRC = `/${encodeURIComponent('Chilmund drone mp4.mp4')}`

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
        <div className="container relative py-12 md:py-16 lg:py-20">
          {/* Stretch columns so the product image fills available height (minimal empty band on wide screens). */}
          <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-10 xl:gap-14">
            <div className="flex max-w-3xl flex-col justify-center xl:max-w-none">
              {children ||
                (richText && (
                  <RichText
                    className="mb-0 prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-white prose-p:text-justify prose-p:text-lg prose-p:leading-relaxed prose-p:text-white/85 prose-strong:text-white prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline md:prose-p:text-xl [&_h1]:text-4xl [&_h1]:md:text-5xl [&_h1]:lg:text-6xl [&_h1]:leading-[1.08] [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:text-white/95"
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
            <div className="relative flex min-h-0 flex-col lg:min-h-[min(520px,_62vh)]">
              <div className="relative min-h-[220px] flex-1 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-[0_28px_70px_-14px_rgba(0,0,0,0.5)] ring-1 ring-white/10 sm:min-h-[280px] lg:min-h-0">
                <video
                  className="absolute inset-0 size-full object-cover object-center"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label="Aerial view of Chilmund manufacturing and infrastructure"
                >
                  <source src={HOME_HERO_DRONE_MP4_SRC} type="video/mp4" />
                </video>
              </div>
              <p className="mt-3 shrink-0 text-center text-[0.7rem] uppercase tracking-[0.12em] text-white/50 lg:text-right">
                Manufacturing campus — aerial view
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
