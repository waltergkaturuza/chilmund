import type { Metadata } from 'next'

import type { Media, Page, Post, Product, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

const siteTitleSuffix = ' | Chilmund Chemicals'
const siteName = 'Chilmund Chemicals'

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | Partial<Product> | null
  /** When set, canonical path segment for OpenGraph url (e.g. /products/slug). */
  path?: string
}): Promise<Metadata> => {
  const { doc, path } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title ? doc.meta.title + siteTitleSuffix : siteName

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: path ?? (Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/'),
    }),
    title,
  }
}
