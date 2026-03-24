import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

export const beforeSyncWithSearch: BeforeSync = async ({ req, originalDoc, searchDoc }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc

  const { slug, id, title, meta, categories, shortDescription } = originalDoc as {
    slug?: string
    id?: string | number
    title?: string
    meta?: { title?: string; description?: string; image?: unknown }
    categories?: unknown
    shortDescription?: string
  }

  if (collection === 'products') {
    const img = meta?.image
    const imageRef =
      img && typeof img === 'object' && img !== null && 'id' in img
        ? (img as { id: unknown }).id
        : img
    const modifiedDoc: DocToSync = {
      ...searchDoc,
      slug,
      meta: {
        ...meta,
        title: meta?.title || title,
        image: imageRef,
        description: meta?.description || shortDescription,
      },
      categories: [],
    }
    return modifiedDoc
  }

  const postImage = meta?.image
  const postImageRef =
    postImage && typeof postImage === 'object' && postImage !== null && 'id' in postImage
      ? (postImage as { id: unknown }).id
      : postImage

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    slug,
    id,
    meta: {
      ...meta,
      title: meta?.title || title,
      image: postImageRef,
      description: meta?.description,
    },
    categories: [],
  }

  if (categories && Array.isArray(categories) && categories.length > 0) {
    const populatedCategories: { id: string | number; title: string }[] = []
    for (const category of categories) {
      if (!category) {
        continue
      }

      if (typeof category === 'object' && category !== null && 'title' in category) {
        populatedCategories.push(category as { id: string | number; title: string })
        continue
      }

      const doc = await req.payload.findByID({
        collection: 'categories',
        id: category as string | number,
        disableErrors: true,
        depth: 0,
        select: { title: true },
        req,
      })

      if (doc !== null) {
        populatedCategories.push(doc)
      } else {
        console.error(
          `Failed. Category not found when syncing collection '${collection}' with id: '${id}' to search.`,
        )
      }
    }

    modifiedDoc.categories = populatedCategories.map((each) => ({
      relationTo: 'categories',
      categoryID: String(each.id),
      title: each.title,
    }))
  }

  return modifiedDoc
}
