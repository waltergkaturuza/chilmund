import type { ImageSlideshowSlide } from '@/components/ImageSlideshow/ImageSlideshow'

function publicSrc(path: string): string {
  return `/${path.split('/').map((segment) => encodeURIComponent(segment)).join('/')}`
}

/** Home page product gallery — high-resolution assets from `public/`. */
export const homeProductHighlightSlides: ImageSlideshowSlide[] = [
  {
    src: publicSrc('Liquid Product.jpg'),
    alt: 'Liquid aluminium sulphate storage and handling at Chilmund Chemicals.',
  },
  {
    src: publicSrc('chilmund-products-warehouse.png'),
    alt: 'Chilmund Chemicals product warehouse with stacked aluminium sulphate bags.',
  },
  {
    src: publicSrc('solid product.15.35.jpeg'),
    alt: 'Solid aluminium sulphate product showing crystalline granules.',
  },
  {
    src: publicSrc('manufacturing/plant-logistics.png'),
    alt: 'Chilmund manufacturing plant logistics yard with tanker and plant buildings.',
  },
]
