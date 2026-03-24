import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateProduct: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc.published) {
      payload.logger.info(`Revalidating product /products/${doc.slug}`)
      revalidatePath(`/products/${doc.slug}`)
      revalidatePath('/products')
      revalidateTag('products-list', 'max')
    }
    if (previousDoc?.published && !doc.published) {
      revalidatePath(`/products/${previousDoc.slug}`)
      revalidatePath('/products')
      revalidateTag('products-list', 'max')
    }
    if (doc.published && previousDoc?.slug && previousDoc.slug !== doc.slug) {
      revalidatePath(`/products/${previousDoc.slug}`)
    }
  }
  return doc
}

export const revalidateProductDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate && doc?.slug) {
    revalidatePath(`/products/${doc.slug}`)
    revalidatePath('/products')
    revalidateTag('products-list', 'max')
  }
  return doc
}
