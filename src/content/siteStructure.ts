/**
 * Recommended corporate sitemap (Payload `pages` + `posts` + `products`).
 * Create each as a Page with slug matching `suggestedSlug`, or use `/products` for catalog items.
 */
export const recommendedCorporatePages = [
  { suggestedSlug: 'home', label: 'Home', notes: 'Use existing home page (slug often `home`).' },
  { suggestedSlug: 'about-chilmund', label: 'About Chilmund' },
  { suggestedSlug: 'products-services', label: 'Products & Services', notes: 'Overview; link to /products for catalog.' },
  { suggestedSlug: 'product-details', label: 'Product Details', notes: 'Detailed specifications; or use /products catalog.' },
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
  { suggestedSlug: 'quote', label: 'Quote Request', notes: 'Dedicated page; or uses the quick-quote modal.' },
  { suggestedSlug: 'track-request', label: 'Track Your Request', notes: 'Order / quote tracking page.' },
] as const

/** Product detail URLs are always `/products/[slug]` from the Products collection. */
export const productCatalogPath = '/products'

/**
 * Suggested top bar (Payload admin → SITE → Header & main menu).
 * Mirrors the exact tab list from the client brief.
 */
export const recommendedHeaderNavBlueprint = [
  {
    type: 'link' as const,
    label: 'Home',
    pageSlug: 'home',
  },
  {
    type: 'link' as const,
    label: 'About Chilmund',
    pageSlug: 'about-chilmund',
  },
  {
    type: 'dropdown' as const,
    label: 'Products & Services',
    sub: [
      { label: 'Product Details', pageSlug: 'product-details' },
      { label: 'Uses of Aluminium Sulphate', pageSlug: 'uses-aluminium-sulphate' },
      { label: 'Manufacturing Plant', pageSlug: 'manufacturing-plant' },
    ],
  },
  {
    type: 'link' as const,
    label: 'Trucking & Logistics',
    pageSlug: 'trucking-logistics',
  },
  {
    type: 'link' as const,
    label: 'Regional Markets',
    pageSlug: 'regional-markets',
  },
  {
    type: 'link' as const,
    label: 'Partnerships & Accreditations',
    pageSlug: 'partnerships-accreditations',
  },
  {
    type: 'link' as const,
    label: 'SHEQ',
    pageSlug: 'sheq',
  },
  {
    type: 'dropdown' as const,
    label: 'News & Events',
    sub: [{ label: 'Industry Awards', pageSlug: 'industry-awards' }],
  },
  {
    type: 'link' as const,
    label: 'Contact Us',
    pageSlug: 'contact',
  },
  {
    type: 'dropdown' as const,
    label: 'Quote Request',
    sub: [
      { label: 'CSR', pageSlug: 'csr' },
      { label: 'Track Your Request', pageSlug: 'track-request' },
    ],
  },
] as const
