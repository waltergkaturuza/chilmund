import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { HOME_HERO_H1, HOME_HERO_INTRO } from '@/content/homeHero'
import type { Page } from '@/payload-types'

const PREVIOUS_HOME_HERO_H1 =
  "Zimbabwe's Premier Water Chemicals Manufacturer, Powering Water Treatment Across Africa"

const PREVIOUS_HOME_HERO_INTRO =
  'Chilmund Chemicals is a trailblazer in the water treatment industry. Our state-of-the-art manufacturing plant in Bindura, Zimbabwe — 86 km from Harare — is the fifth of its kind globally and the only one in Africa. Since transitioning from trading to manufacturing in July 2023, we have built capacity for up to 7,200 tonnes of aluminium sulphate per month.'

type LexNode = Record<string, unknown>

function patchFirstHeadingText(richText: unknown, headingText: string): boolean {
  if (!richText || typeof richText !== 'object') return false
  const root = richText as { root?: { children?: LexNode[] } }
  const children = root.root?.children
  if (!Array.isArray(children)) return false

  for (const node of children) {
    if (!node || typeof node !== 'object') continue
    if (node.type !== 'heading' || node.tag !== 'h1') continue
    const hChildren = node.children
    if (!Array.isArray(hChildren)) continue
    const firstText = hChildren.find(
      (c) => c && typeof c === 'object' && (c as LexNode).type === 'text',
    ) as LexNode | undefined
    if (!firstText) continue
    firstText.text = headingText
    return true
  }

  return false
}

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

async function patchHomeHeroCopy(
  payload: MigrateUpArgs['payload'],
  req: MigrateUpArgs['req'],
  headline: string,
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
  const headingPatched = patchFirstHeadingText(richText, headline)
  const introPatched = patchFirstParagraphText(richText, intro)
  if (!headingPatched && !introPatched) return

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
  await patchHomeHeroCopy(payload, req, HOME_HERO_H1, HOME_HERO_INTRO)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await patchHomeHeroCopy(payload, req, PREVIOUS_HOME_HERO_H1, PREVIOUS_HOME_HERO_INTRO)
}
