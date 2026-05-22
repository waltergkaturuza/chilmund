import type { RequiredDataFromCollectionSlug } from 'payload'

import { HOME_HERO_H1, HOME_HERO_INTRO } from '@/content/homeHero'
import { heading, line, richRoot } from '@/content/lexicalBuilders'

/** Fallback home when no `home` page exists in the database — from client “Chilmund website content” PDF */
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  hero: {
    type: 'lowImpact',
    links: [
      {
        id: 'hero-cta-1',
        link: {
          type: 'custom',
          url: '/contact',
          label: 'Request a quote',
          appearance: 'default',
        },
      },
      {
        id: 'hero-cta-2',
        link: {
          type: 'custom',
          url: '/contact',
          label: 'Contact sales',
          appearance: 'outline',
        },
      },
    ],
    richText: richRoot([
      heading('h1', HOME_HERO_H1),
      line(HOME_HERO_INTRO),
    ]),
  },
  meta: {
    description:
      'Chilmund Chemicals — aluminium sulphate and water treatment chemicals from Bindura, Zimbabwe. 7,200 tonnes/month capacity. SAZ certified. Sales: sales@chilmund.co.zw',
    title: 'Chilmund Chemicals | Water treatment chemicals — Bindura, Zimbabwe',
  },
  title: 'Home',
  /** Rich home body is `HomeContentSections` (see `src/app/(frontend)/home`). */
  layout: [],
}
