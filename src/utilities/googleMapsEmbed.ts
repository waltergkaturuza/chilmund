/** Allow only Google Maps HTTPS iframe URLs that embed a map view. */
export function isTrustedGoogleMapsEmbedUrl(raw: string): boolean {
  const u = raw.trim()

  if (u.startsWith('https://www.google.com/maps/embed')) return true
  if (u.startsWith('https://maps.google.com/maps/embed')) return true

  try {
    const parsed = new URL(u)
    if (parsed.protocol !== 'https:') return false
    if (parsed.hostname !== 'maps.google.com') return false
    if (parsed.pathname !== '/maps' && !parsed.pathname.startsWith('/maps/')) return false

    const q = parsed.searchParams.get('q')
    const output = parsed.searchParams.get('output')

    if (!q?.trim() || output !== 'embed') return false
    return !/<|>|javascript:|data:/i.test(q)
  } catch {
    return false
  }
}
