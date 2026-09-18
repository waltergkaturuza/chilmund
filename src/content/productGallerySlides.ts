import type { ImageSlideshowSlide } from '@/components/ImageSlideshow/ImageSlideshow'

function publicSrc(path: string): string {
  return `/${path.split('/').map((segment) => encodeURIComponent(segment)).join('/')}`
}

/** Product gallery below “product at a glance” — column one slideshow. */
export const productGallerySlides: ImageSlideshowSlide[] = [
  {
    src: publicSrc('Liquid Product.jpg'),
    alt: 'Liquid aluminium sulphate at Chilmund Chemicals.',
    caption: 'Liquid aluminium sulphate supply.',
  },
  {
    src: publicSrc('chilmund-products-warehouse.png'),
    alt: 'Chilmund products stored in the warehouse.',
    caption: 'Warehouse storage of finished product.',
  },
  {
    src: publicSrc('solid product.15.35.jpeg'),
    alt: 'Solid aluminium sulphate product at Chilmund Chemicals.',
    caption: 'Solid aluminium sulphate — granular and packaged forms.',
  },
  {
    src: publicSrc('manufacturing/plant-logistics.png'),
    alt: 'Plant logistics and distribution at the Bindura manufacturing site.',
    caption: 'Plant logistics and fulfilment capability.',
  },
]
