import type { ImageSlideshowSlide } from '@/components/ImageSlideshow/ImageSlideshow'

function awardSrc(filename: string): string {
  return `/awards/${encodeURIComponent(filename)}`
}

/**
 * Certificate imagery in `public/awards/` — Industry Awards page highlight reel with short narrations.
 * (Same assets as Partners & Certifications; copy is tuned for this page.)
 */
export const industryAwardsSlideshowSlides: ImageSlideshowSlide[] = [
  {
    src: awardSrc('National Business Award 2024 awarded to Chilmund for Best Industrial Innovations.png'),
    alt: 'National Business Award 2024 certificate for Chilmund Chemicals.',
    caption:
      'National Business Award 2024 — recognised for best industrial innovations, underscoring how we translate research, plant discipline, and quality systems into products markets trust.',
  },
  {
    src: awardSrc('Water treatment Chemicals manufacturer of the Year.png'),
    alt: 'Water treatment chemicals manufacturer of the year award certificate.',
    caption:
      'Water treatment chemicals manufacturer of the year — a sector nod to consistent quality, reliable supply, and the teams that keep treatment plants running nationwide.',
  },
  {
    src: awardSrc('Global Honorary Award Chilmund Chemicals for OutstandingServices 2025 Global ZAA Fellow.png'),
    alt: 'Global honorary award and Global ZAA Fellow recognition for Chilmund Chemicals.',
    caption:
      'Global honorary award (2025) for outstanding services and Global ZAA Fellow status — international visibility for Zimbabwean manufacturing done to world-class standards.',
  },
  {
    src: awardSrc('NSSA CERTIICATE .png'),
    alt: 'NSSA certificate for occupational safety and health.',
    caption:
      'NSSA recognition for occupational safety and health — proof that our people-first culture and documented SHEQ systems stand up to independent scrutiny.',
  },
  {
    src: awardSrc('SAZ Licence ZWS 1120 of2024.png'),
    alt: 'SAZ product mark licence ZWS 1120:2024.',
    caption:
      'SAZ product mark (ZWS 1120:2024) on our aluminium sulphate — the national quality mark customers and regulators expect when specifying Chilmund.',
  },
]
