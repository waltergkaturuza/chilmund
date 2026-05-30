import { HOME_HERO_INTRO } from '@/content/homeHero'

export const CHILMUND_SITE_NAME = 'Chilmund Chemicals'

/** Default meta / Open Graph description when a page has no CMS SEO fields. */
export const CHILMUND_DEFAULT_DESCRIPTION =
  'Chilmund Chemicals manufactures aluminium sulphate for water treatment across Africa — quality, affordability, and service excellence from our Bindura plant in Zimbabwe.'

/** Shorter OG-friendly variant (first sentence of hero intro). */
export const CHILMUND_DEFAULT_OG_DESCRIPTION = HOME_HERO_INTRO.split('.')[0]?.trim() + '.'

/** Default share image — campus photo, stable URL without encoded characters. */
export const CHILMUND_DEFAULT_OG_IMAGE_PATH = '/chilmund-products-warehouse.png'

export const CHILMUND_DEFAULT_OG_IMAGE_ALT =
  'Chilmund Chemicals aluminium sulphate products at the manufacturing warehouse'
