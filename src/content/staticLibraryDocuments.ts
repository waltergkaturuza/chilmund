/**
 * PDFs and other files under `public/documents/` that appear on /resources
 * alongside Payload-managed resources. Add entries here when new public docs ship.
 */
export const staticLibraryDocuments = [
  {
    slug: 'ims-policy-rev1-september-2025',
    title: 'Integrated Management System policy',
    description:
      'Rev 1 (September 2025). Controlled IMS policy for Chilmund Chemicals — downloadable PDF.',
    href: '/documents/chilmund-integrated-management-policy-rev1-september-2025.pdf',
    resourceType: 'document' as const,
    /** Shown next to download when set */
    fileSize: null as string | null,
    featured: true,
  },
] as const

export type StaticLibraryDocument = (typeof staticLibraryDocuments)[number]

export function hrefForStaticLibraryDocument(slug: StaticLibraryDocument['slug']): string {
  const doc = staticLibraryDocuments.find((d) => d.slug === slug)
  if (!doc) throw new Error(`Unknown static library document: ${slug}`)
  return doc.href
}
