import type { ImageSlideshowSlide } from '@/components/ImageSlideshow/ImageSlideshow'

function crsSrc(filename: string): string {
  return `/CRS/${encodeURIComponent(filename)}`
}

/**
 * Photos in `public/CRS/` — shown on the CSR page as a rotating highlight above CMS initiatives.
 * Add or reorder entries here when you drop new files into `public/CRS/`.
 */
export const csrHighlightSlides: ImageSlideshowSlide[] = [
  {
    src: crsSrc('WhatsApp Image 2026-05-12 at 09.10.37.jpeg'),
    alt: 'Chilmund CSR community programme photo.',
    caption: 'Community outreach and impact on the ground.',
  },
  {
    src: crsSrc('WhatsApp Image 2026-05-12 at 09.10.37 (2).jpeg'),
    alt: 'Chilmund CSR community programme photo.',
    caption: 'Education, environment, health, and youth programmes we support.',
  },
  {
    src: crsSrc('WhatsApp Image 2026-05-12 at 09.10.38.jpeg'),
    alt: 'Chilmund CSR community programme photo.',
    caption: 'Partnerships that strengthen local communities.',
  },
  {
    src: crsSrc('WhatsApp Image 2026-05-12 at 09.10.38 (1).jpeg'),
    alt: 'Chilmund CSR community programme photo.',
    caption: 'Volunteering and engagement alongside neighbours and stakeholders.',
  },
  {
    src: crsSrc('WhatsApp Image 2026-05-12 at 09.10.38 (2).jpeg'),
    alt: 'Chilmund CSR community programme photo.',
    caption: 'Sustainable development aligned with how we operate as a manufacturer.',
  },
  {
    src: crsSrc('WhatsApp Image 2026-05-12 at 09.10.38 (3).jpeg'),
    alt: 'Chilmund CSR community programme photo.',
    caption: 'Moments from the field — dignity, safety, and opportunity.',
  },
  {
    src: crsSrc('WhatsApp Image 2026-05-12 at 09.10.39 (1).jpeg'),
    alt: 'Chilmund CSR community programme photo.',
    caption: 'Continuing investment upstream of our success.',
  },
  {
    src: crsSrc('WhatsApp Image 2026-05-12 at 09.10.39 (2).jpeg'),
    alt: 'Chilmund CSR community programme photo.',
    caption: 'Structured CSR stories from the CMS appear below when published.',
  },
]
