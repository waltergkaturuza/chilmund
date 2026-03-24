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
