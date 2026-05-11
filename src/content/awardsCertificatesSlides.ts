import type { ImageSlideshowSlide } from '@/components/ImageSlideshow/ImageSlideshow'

function awardSrc(filename: string): string {
  return `/awards/${encodeURIComponent(filename)}`
}

/** Certificates and awards in `public/awards/` — Partners & Certifications page gallery. */
export const awardsCertificatesSlides: ImageSlideshowSlide[] = [
  {
    src: awardSrc('SAZ Licence ZWS 1120 of2024.png'),
    alt: 'SAZ product mark licence certificate ZWS 1120:2024 for Chilmund Chemicals aluminium sulphate.',
    caption: 'SAZ product mark licence (ZWS 1120:2024) for our aluminium sulphate.',
  },
  {
    src: awardSrc('NSSA CERTIICATE .png'),
    alt: 'National Social Security Authority certificate recognising Chilmund Chemicals for workplace safety and health.',
    caption: 'NSSA recognition for occupational safety and health management.',
  },
  {
    src: awardSrc('National Business Award 2024 awarded to Chilmund for Best Industrial Innovations.png'),
    alt: 'National Business Award 2024 certificate for Chilmund Chemicals as best industrial innovations.',
    caption: 'National Business Award 2024 — best industrial innovations.',
  },
  {
    src: awardSrc('Water treatment Chemicals manufacturer of the Year.png'),
    alt: 'Award certificate naming Chilmund Chemicals water treatment chemicals manufacturer of the year.',
    caption: 'Water treatment chemicals manufacturer of the year.',
  },
  {
    src: awardSrc('Global Honorary Award Chilmund Chemicals for OutstandingServices 2025 Global ZAA Fellow.png'),
    alt: 'Global honorary award certificate for outstanding services and Global ZAA Fellow recognition in 2025.',
    caption: 'Global honorary award (2025) for outstanding services; Global ZAA Fellow.',
  },
]
