import type { Header } from '@/payload-types'

type NavItems = NonNullable<Header['navItems']>

function link(label: string, url: string): NavItems[number] {
  return {
    style: 'link',
    link: { type: 'custom', url, label, newTab: false },
  }
}

function dropdown(
  dropdownLabel: string,
  subs: { label: string; url: string }[],
): NavItems[number] {
  return {
    style: 'dropdown',
    dropdownLabel,
    subItems: subs.map((s) => ({
      link: { type: 'custom', url: s.url, label: s.label, newTab: false },
    })),
  }
}

export const defaultNavItems: NavItems = [
  link('Home', '/'),
  link('About Chilmund', '/about-chilmund'),
  dropdown('Products & Services', [
    { label: 'Product Details', url: '/product-details' },
    { label: 'Uses of Aluminium Sulphate', url: '/uses-aluminium-sulphate' },
    { label: 'Manufacturing Plant', url: '/manufacturing-plant' },
  ]),
  link('Trucking & Logistics', '/trucking-logistics'),
  link('Regional Markets', '/regional-markets'),
  link('Partnerships & Accreditations', '/partnerships-accreditations'),
  link('SHEQ', '/sheq'),
  dropdown('News & Events', [
    { label: 'Industry Awards', url: '/industry-awards' },
  ]),
  link('Contact Us', '/contact'),
  dropdown('Quote Request', [
    { label: 'CSR', url: '/csr' },
    { label: 'Track Your Request', url: '/track-request' },
  ]),
]
