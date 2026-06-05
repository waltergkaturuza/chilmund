import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { HOME_HERO_INTRO } from '@/content/homeHero'
import type { Page } from '@/payload-types'

const PREVIOUS_HOME_HERO_INTRO =
  'Chilmund Chemicals is a trailblazer in the water treatment industry. Our state-of-the-art alum manufacturing plant in Bindura, Zimbabwe- 86 km from Harare- is the only one in Africa and the fifth of its kind globally. Experience the unmatched performance and reliability of our world-class products. We are dedicated to making clean, safe water accessible to all, driving sustainable development, and building a brighter future for Africa.'

type LexNode = Record<string, unknown>

function patchFirstParagraphText(richText: unknown, paragraphText: string): boolean {
  if (!richText || typeof richText !== 'object') return false
  const root = richText as { root?: { children?: LexNode[] } }
  const children = root.root?.children
  if (!Array.isArray(children)) return false

  for (const node of children) {
    if (!node || typeof node !== 'object') continue
    if (node.type !== 'paragraph') continue
    const pChildren = node.children
    if (!Array.isArray(pChildren)) continue
    const firstText = pChildren.find(
      (c) => c && typeof c === 'object' && (c as LexNode).type === 'text',
    ) as LexNode | undefined
    if (!firstText) continue
    firstText.text = paragraphText
    return true
  }

  return false
}

async function patchHomeHeroIntro(
  payload: MigrateUpArgs['payload'],
  req: MigrateUpArgs['req'],
  intro: string,
) {
  const { docs } = await payload.find({
    collection: 'pages',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    req,
    where: { slug: { equals: 'home' } },
  })
  const page = docs[0]
  if (!page?.hero || typeof page.hero !== 'object') return

  const hero = page.hero as Record<string, unknown>
  if (hero.richText == null) return

  const richText = structuredClone(hero.richText) as unknown
  if (!patchFirstParagraphText(richText, intro)) return

  await payload.update({
    collection: 'pages',
    data: {
      hero: {
        ...hero,
        richText: richText as Page['hero']['richText'],
      },
    },
    id: page.id,
    overrideAccess: true,
    req,
  })
}

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await patchHomeHeroIntro(payload, req, HOME_HERO_INTRO)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await patchHomeHeroIntro(payload, req, PREVIOUS_HOME_HERO_INTRO)
}
