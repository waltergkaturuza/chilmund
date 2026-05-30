import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'
import {
  CHILMUND_DEFAULT_OG_DESCRIPTION,
  CHILMUND_DEFAULT_OG_IMAGE_ALT,
  CHILMUND_DEFAULT_OG_IMAGE_PATH,
  CHILMUND_SITE_NAME,
} from '@/constants/seo'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  locale: 'en_ZW',
  description: CHILMUND_DEFAULT_OG_DESCRIPTION,
  images: [
    {
      url: `${getServerSideURL()}${CHILMUND_DEFAULT_OG_IMAGE_PATH}`,
      alt: CHILMUND_DEFAULT_OG_IMAGE_ALT,
    },
  ],
  siteName: CHILMUND_SITE_NAME,
  title: CHILMUND_SITE_NAME,
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
