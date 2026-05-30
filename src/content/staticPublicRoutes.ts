/**
 * Public Next.js app routes (static `page.tsx` files, not CMS `/[slug]` or dynamic segments).
 * Used by the XML sitemap so crawlers discover corporate pages beyond Payload `pages`.
 */
export const staticPublicRoutes = [
  '/',
  '/about-chilmund',
  '/meet-our-team',
  '/bindura-map',
  '/contact',
  '/product-details',
  '/uses-aluminium-sulphate',
  '/trucking-logistics',
  '/regional-markets',
  '/partnerships-accreditations',
  '/sheq',
  '/csr',
  '/news',
  '/events',
  '/resources',
  '/products',
  '/posts',
  '/search',
  '/sitemap',
  '/track-quote',
  '/privacy-policy',
  '/terms-of-use',
] as const

export type StaticPublicRoute = (typeof staticPublicRoutes)[number]
