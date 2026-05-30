import type { ImageSlideshowSlide } from '@/components/ImageSlideshow/ImageSlideshow'

function truckSrc(filename: string): string {
  return `/Trucks/${encodeURIComponent(filename)}`
}

function publicSrc(filename: string): string {
  return `/${encodeURIComponent(filename)}`
}

/** Home page trucking gallery — assets in `public/Trucks/` and selected fleet photos. */
export const homeTrucksHighlightSlides: ImageSlideshowSlide[] = [
  {
    src: publicSrc('20260519_121531.jpg (1).jpeg'),
    alt: 'Chilmund fleet trucks lined up for dispatch.',
  },
  {
    src: truckSrc('Trucks1.jpeg'),
    alt: 'Chilmund Chemicals delivery truck at the plant.',
  },
  {
    src: truckSrc('Trucks2.jpeg'),
    alt: 'Chilmund fleet vehicle loaded for regional dispatch.',
  },
  {
    src: truckSrc('Trucks3.jpg'),
    alt: 'Chilmund trucking and logistics operations.',
  },
  {
    src: truckSrc('Acid trucks 3.jpg'),
    alt: 'Specialist acid transport trucks in the Chilmund fleet.',
  },
]
