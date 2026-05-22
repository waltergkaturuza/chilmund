import type { ImageSlideshowSlide } from '@/components/ImageSlideshow/ImageSlideshow'

function publicSrc(path: string): string {
  return `/${path.split('/').map((segment) => encodeURIComponent(segment)).join('/')}`
}

/** Home page product gallery — high-resolution assets from `public/`. */
export const homeProductHighlightSlides: ImageSlideshowSlide[] = [
  {
    src: publicSrc('liquid storage tanks .jpeg'),
    alt: 'Liquid aluminium sulphate storage tanks at Chilmund Chemicals.',
  },
  {
    src: publicSrc('chilmund-products-warehouse.png'),
    alt: 'Chilmund Chemicals product warehouse with stacked aluminium sulphate bags.',
    objectPosition: 'top center',
    coverScale: 1.14,
  },
  {
    src: publicSrc('solid product.15.35.jpeg'),
    alt: 'Chilmund team member with aluminium sulphate product bags and usage highlights.',
    objectPosition: 'top center',
    coverScale: 1.12,
  },
  {
    src: publicSrc('manufacturing/plant-logistics.png'),
    alt: 'Chilmund manufacturing plant logistics yard with tanker and plant buildings.',
  },
]
