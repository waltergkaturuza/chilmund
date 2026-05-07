import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { HOME_HERO_H1 } from '@/content/homeHero'
import type { Page } from '@/payload-types'

const PREVIOUS_HOME_HERO_H1 =
  'Trailblazing water treatment manufacturing — from Bindura, for Africa'

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

async function patchHomeHeroHeadline(payload: MigrateUpArgs['payload'], req: MigrateUpArgs['req'], headline: string) {
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
  if (!patchFirstHeadingText(richText, headline)) return

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
  await patchHomeHeroHeadline(payload, req, HOME_HERO_H1)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await patchHomeHeroHeadline(payload, req, PREVIOUS_HOME_HERO_H1)
}
