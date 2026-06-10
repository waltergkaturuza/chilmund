import canUseDOM from './canUseDOM'

function stripTrailingSlash(url: string): string {
  return url.replace(/\/$/, '')
}

/**
 * Canonical site base URL for SSR, Payload, and Open Graph.
 * Never returns an empty string on Vercel — falls back through known deployment hosts.
 */
export function resolveSiteURL(): string {
  const explicit = process.env.NEXT_PUBLIC_SERVER_URL?.trim()
  if (explicit) {
    return stripTrailingSlash(explicit.startsWith('http') ? explicit : `https://${explicit}`)
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

  add(process.env.NEXT_PUBLIC_SERVER_URL)
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
