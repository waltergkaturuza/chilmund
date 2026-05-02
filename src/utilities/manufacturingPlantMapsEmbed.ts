import { isTrustedGoogleMapsEmbedUrl } from '@/utilities/googleMapsEmbed'

/** Shown as the pin / listing title in Google Maps embed (legacy `Title@lat,lng`). */
export const CHILMUND_MANUFACTURING_PLANT_MAP_LABEL =
  'Chilmund Chemicals Manufacturing Plant'

const DEFAULT_LAT_LNG_Q = '-17.323036,31.323233'

function buildFallbackEmbedUrl(): string {
  const q = `${CHILMUND_MANUFACTURING_PLANT_MAP_LABEL}@${DEFAULT_LAT_LNG_Q}`
  const url = new URL('https://maps.google.com/maps')
  url.searchParams.set('q', q)
  url.searchParams.set('z', '17')
  url.searchParams.set('hl', 'en')
  url.searchParams.set('output', 'embed')
  return url.toString()
}

/** If `q` is only decimal coords, remap to labelled pin so Maps shows the facility name on the marker. */
function ensurePlantPinLabel(trustedHttpsUrl: string): string {
  try {
    const u = new URL(trustedHttpsUrl)
    const q = u.searchParams.get('q')?.trim()
    if (!q) return trustedHttpsUrl

    const onlyCoords = /^-?\d+(?:\.\d+)?\s*,\s*-?\d+(?:\.\d+)?$/.test(q)
    const alreadyNamed =
      /chilmund/i.test(q) && /manufacturing\s+plant/i.test(q.replace(/\+/g, ' '))

    if (!onlyCoords || alreadyNamed) return trustedHttpsUrl

    u.searchParams.set('q', `${CHILMUND_MANUFACTURING_PLANT_MAP_LABEL}@${q.replace(/\s/g, '')}`)
    return u.toString()
  } catch {
    return trustedHttpsUrl
  }
}

/** CMS iframe URL augmented for correct pin label where possible; safe fallback embed if unset. */
export function resolveManufacturingPlantMapsEmbedUrl(
  cmsGoogleMapsEmbedUrl?: string | null,
): string | null {
  const raw = cmsGoogleMapsEmbedUrl?.trim() ?? ''

  const fromCms =
    raw && isTrustedGoogleMapsEmbedUrl(raw) ? ensurePlantPinLabel(raw) : null
  const candidate =
    fromCms && isTrustedGoogleMapsEmbedUrl(fromCms) ? fromCms : buildFallbackEmbedUrl()

  return isTrustedGoogleMapsEmbedUrl(candidate) ? candidate : null
}
