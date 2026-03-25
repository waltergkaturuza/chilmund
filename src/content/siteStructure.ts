/**
 * Recommended corporate sitemap (Payload `pages` + `posts` + `products`).
 * Create each as a Page with slug matching `suggestedSlug`, or use `/products` for catalog items.
 */
export const recommendedCorporatePages = [
  { suggestedSlug: 'home', label: 'Home', notes: 'Use existing home page (slug often `home`).' },
  { suggestedSlug: 'about-chilmund', label: 'About Chilmund' },
  { suggestedSlug: 'products-services', label: 'Products & Services', notes: 'Overview; link to /products for catalog.' },
  { suggestedSlug: 'uses-aluminium-sulphate', label: 'Uses of Aluminium Sulphate' },
  { suggestedSlug: 'manufacturing-plant', label: 'Manufacturing Plant' },
  { suggestedSlug: 'trucking-logistics', label: 'Trucking & Logistics' },
  { suggestedSlug: 'regional-markets', label: 'Regional Markets' },
  { suggestedSlug: 'partnerships-accreditations', label: 'Partnerships & Accreditations' },
  { suggestedSlug: 'sheq', label: 'SHEQ' },
  { suggestedSlug: 'csr', label: 'CSR' },
  { suggestedSlug: 'industry-awards', label: 'Industry Awards' },
  { suggestedSlug: 'news', label: 'News & Events', notes: 'Optional listing page; blog uses /posts.' },
  { suggestedSlug: 'contact', label: 'Contact Us' },
  { suggestedSlug: 'quote', label: 'Quote request', notes: 'Optional dedicated page; quick quote modal + /contact form.' },
] as const

/** Product detail URLs are always `/products/[slug]` from the Products collection. */
export const productCatalogPath = '/products'

/**
 * Suggested top bar (Payload → Globals → Header & main menu). Mirrors a “summit” style site:
 * a few primary pills, with deep sections grouped under dropdowns.
 */
export const recommendedHeaderNavBlueprint = [
  {
    type: 'link' as const,
    label: 'Home',
    pageSlug: 'home',
  },
  {
    type: 'dropdown' as const,
    label: 'Company',
    sub: [
      { label: 'About Chilmund', pageSlug: 'about-chilmund' },
      { label: 'Manufacturing Plant', pageSlug: 'manufacturing-plant' },
      { label: 'Trucking & Logistics', pageSlug: 'trucking-logistics' },
      { label: 'Regional Markets', pageSlug: 'regional-markets' },
      { label: 'Partnerships & Accreditations', pageSlug: 'partnerships-accreditations' },
      { label: 'SHEQ', pageSlug: 'sheq' },
      { label: 'CSR', pageSlug: 'csr' },
      { label: 'Industry Awards', pageSlug: 'industry-awards' },
    ],
  },
  {
    type: 'dropdown' as const,
    label: 'Products & services',
    sub: [
      { label: 'Overview', pageSlug: 'products-services' },
      { label: 'Uses of aluminium sulphate', pageSlug: 'uses-aluminium-sulphate' },
      { label: 'Product catalog', href: productCatalogPath },
    ],
  },
  {
    type: 'link' as const,
    label: 'News & events',
    pageSlug: 'news',
  },
  {
    type: 'link' as const,
    label: 'Contact',
    pageSlug: 'contact',
  },
] as const
