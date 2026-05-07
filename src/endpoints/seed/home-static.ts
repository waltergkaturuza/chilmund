import type { RequiredDataFromCollectionSlug } from 'payload'

import { HOME_HERO_H1 } from '@/content/homeHero'
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
      line(
        'Chilmund Chemicals is a trailblazer in the water treatment industry. Our state-of-the-art manufacturing plant in Bindura, Zimbabwe — 86 km from Harare — is the fifth of its kind globally and the only one in Africa. Since transitioning from trading to manufacturing in July 2023, we have built capacity for up to 7,200 metric tons of aluminium sulphate per month.',
      ),
      line(
        'Experience the unmatched performance and reliability of our world-class products. We are dedicated to making clean, safe water accessible to all, driving sustainable development, and building a brighter future for Africa.',
      ),
    ]),
  },
  meta: {
    description:
      'Chilmund Chemicals — aluminium sulphate and water treatment chemicals from Bindura, Zimbabwe. 7,200 MT/month capacity. SAZ certified. Sales: sales@chilmund.co.zw',
    title: 'Chilmund Chemicals | Water treatment chemicals — Bindura, Zimbabwe',
  },
  title: 'Home',
  /** Rich home body is `HomeContentSections` (see `src/app/(frontend)/home`). Keep CTA block for bottom strip. */
  layout: [
    {
      id: 'home-cta-footer',
      blockName: 'Supply CTA',
      blockType: 'cta',
      richText: richRoot([
        heading('h2', 'Ready to secure your chemical supply?'),
        line('Speak to our sales team for quotations, specifications, logistics across Zimbabwe and the region.'),
      ]),
      links: [
        {
          id: 'cta-contact',
          link: {
            type: 'custom',
            url: '/contact',
            label: 'Contact us',
            appearance: 'default',
          },
        },
        {
          id: 'cta-quote',
          link: {
            type: 'custom',
            url: '/contact',
            label: 'Request a quote',
            appearance: 'outline',
          },
        },
      ],
    },
  ],
}
