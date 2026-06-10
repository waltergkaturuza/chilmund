import canUseDOM from './canUseDOM'

function stripTrailingSlash(url: string): string {
  return url.replace(/\/$/, '')
}

/** `NEXT_PUBLIC_SERVER_URL` may list multiple comma-separated site URLs (primary first). */
function configuredSiteURLs(): string[] {
  const raw = process.env.NEXT_PUBLIC_SERVER_URL?.trim()
  if (!raw) return []

  return raw
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => stripTrailingSlash(part.startsWith('http') ? part : `https://${part}`))
}

/**
 * Canonical site base URL for SSR, Payload, and Open Graph.
 * Never returns an empty string on Vercel — falls back through known deployment hosts.
 */
export function resolveSiteURL(): string {
  const configured = configuredSiteURLs()
  if (configured.length > 0) {
    return configured[0]!
  }

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  if (productionHost) {
    return stripTrailingSlash(`https://${productionHost}`)
  }

  const vercelHost = process.env.VERCEL_URL?.trim()
  if (vercelHost) {
    return stripTrailingSlash(`https://${vercelHost}`)
  }

  return 'http://localhost:3000'
}

/** Hostnames the app may be served from — used for Payload CORS (custom domain + Vercel). */
export function getSiteOrigins(): string[] {
  const origins = new Set<string>()

  const add = (value?: string) => {
    if (!value?.trim()) return
    const candidate = value.startsWith('http') ? value : `https://${value}`
    try {
      origins.add(stripTrailingSlash(new URL(candidate).origin))
    } catch {
      /* ignore invalid URL */
    }
  }

  for (const url of configuredSiteURLs()) {
    add(url)
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    add(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
  }
  if (process.env.VERCEL_URL) {
    add(`https://${process.env.VERCEL_URL}`)
  }
  add('http://localhost:3000')

  return [...origins]
}

export const getServerSideURL = () => resolveSiteURL()

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return stripTrailingSlash(`${protocol}//${domain}${port ? `:${port}` : ''}`)
  }

  return resolveSiteURL()
}
