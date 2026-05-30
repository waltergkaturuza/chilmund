import type { ImageSlideshowSlide } from '@/components/ImageSlideshow/ImageSlideshow'

function sheq2Src(filename: string): string {
  return `/sheq2/${encodeURIComponent(filename)}`
}

/** Operational integrity rail — assets in `public/sheq2/`. */
export const sheqOperationalIntegritySlides: ImageSlideshowSlide[] = [
  {
    src: sheq2Src('20260519_162040.jpg (2).jpeg'),
    alt: 'Chilmund Chemicals factory rules and safety board at the plant entrance.',
    caption: 'Factory rules and PPE requirements — safety expectations posted at every entry point.',
    fit: 'contain',
  },
  {
    src: sheq2Src('20260519_162017.jpg (1).jpeg'),
    alt: 'Site safety signage including speed limits, PPE, and emergency contacts.',
    caption: 'On-site safety signage, hard-hat codes, and emergency contacts reinforce daily discipline.',
    fit: 'contain',
  },
  {
    src: sheq2Src('20260519_162154.jpg (1).jpeg'),
    alt: 'Factory site map, hazard board, and safety statistics display.',
    caption: 'Site maps, hazard awareness, and safety statistics tracked in the open.',
    fit: 'contain',
  },
  {
    src: sheq2Src('IMG-20260518-WA0114.jpg (1).jpeg'),
    alt: 'Chilmund Chemicals exhibition stand promoting clean water and responsible operations.',
    caption: 'Representing our standards in public — SHEQ as a culture beyond the plant gate.',
    fit: 'cover',
    objectPosition: 'center',
  },
]
