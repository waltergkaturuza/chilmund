import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React from 'react'

import type { TeamMember } from '@/payload-types'

import {
  normalizeTeamName,
  teamPhotoSrc,
  teamProfilesByNormalizedName,
  teamProfilesFromPdf,
} from '@/content/teamProfilesData'

import { MeetOurTeamView } from './MeetOurTeamView'
import type { MeetOurTeamMember } from './types'

export const metadata: Metadata = {
  title: 'Meet Our Team | Chilmund Chemicals',
  description:
    "Meet the leadership team driving Chilmund Chemicals' growth as a Pan-African water treatment chemicals manufacturer.",
}

type MediaDoc = { url?: string | null; sizes?: Record<string, { url?: string | null }> | null }

function resolveImage(media: unknown): string | null {
  if (!media || typeof media !== 'object') return null
  const m = media as MediaDoc
  return m.sizes?.medium?.url || m.sizes?.small?.url || m.url || null
}

function firstCardTeaser(text: string, max = 220): string {
  const t = text.trim()
  if (t.length <= max) return t
  const cut = t.slice(0, max)
  const last = cut.lastIndexOf(' ')
  return `${(last > 40 ? cut.slice(0, last) : cut).trim()}…`
}

function staticSourceToMember(row: (typeof teamProfilesFromPdf)[number]): MeetOurTeamMember {
  return {
    id: row.id,
    name: row.name,
    jobTitle: row.jobTitle,
    department: row.department,
    photo: teamPhotoSrc(row.imageFile),
    photoObjectPosition: row.photoObjectPosition ?? null,
    bioShort: firstCardTeaser(row.fullProfile),
    credentials: row.credentials,
    fullProfile: row.fullProfile,
    email: null,
    linkedIn: null,
    featured: row.featured,
    order: row.order,
  }
}

function mergeTeamWithCms(docs: TeamMember[]): MeetOurTeamMember[] {
  const cmsByName = new Map(docs.map((d) => [normalizeTeamName(d.name), d]))
  const consumed = new Set<string>()

  const merged: MeetOurTeamMember[] = teamProfilesFromPdf.map((staticRow) => {
    const key = normalizeTeamName(staticRow.name)
    const cms = cmsByName.get(key)
    const base = staticSourceToMember(staticRow)
    if (!cms) return base
    consumed.add(key)
    return {
      ...base,
      jobTitle: cms.jobTitle?.trim() ? cms.jobTitle : base.jobTitle,
      department: cms.department != null ? cms.department : base.department,
      photo: resolveImage(cms.photo) || base.photo,
      photoObjectPosition: resolveImage(cms.photo) ? null : base.photoObjectPosition,
      bioShort: cms.bio?.trim() ? firstCardTeaser(cms.bio) : base.bioShort,
      email: cms.email?.trim() ? cms.email : null,
      linkedIn: cms.linkedIn?.trim() ? cms.linkedIn : null,
      featured: cms.featured ?? base.featured,
      order: typeof cms.order === 'number' ? cms.order : base.order,
    }
  })

  for (const doc of docs) {
    const key = normalizeTeamName(doc.name)
    if (consumed.has(key)) continue
    if (teamProfilesByNormalizedName.has(key)) continue

    const teaser = doc.bio?.trim() || null
    merged.push({
      id: `cms-${doc.id}`,
      name: doc.name,
      jobTitle: doc.jobTitle,
      department: doc.department || null,
      photo: resolveImage(doc.photo),
      photoObjectPosition: null,
      bioShort: teaser ? firstCardTeaser(teaser) : null,
      credentials: null,
      fullProfile: teaser || 'Profile details will be published soon.',
      email: doc.email?.trim() ? doc.email : null,
      linkedIn: doc.linkedIn?.trim() ? doc.linkedIn : null,
      featured: doc.featured ?? false,
      order: typeof doc.order === 'number' ? doc.order : 100,
    })
  }

  return merged.sort((a, b) => a.order - b.order)
}

export default async function MeetOurTeamPage() {
  let members: MeetOurTeamMember[] = teamProfilesFromPdf.map(staticSourceToMember)

  try {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'team-members',
      where: { _status: { equals: 'published' } },
      sort: 'order',
      limit: 100,
      depth: 1,
    })

    if (docs.length > 0) {
      members = mergeTeamWithCms(docs)
    }
  } catch {
    // Published PDF + /public portraits remain the source of truth offline.
  }

  return (
    <article className="min-h-screen">
      <MeetOurTeamView members={members} />
    </article>
  )
}
