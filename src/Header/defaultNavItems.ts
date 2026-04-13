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
  dropdown('About Chilmund', [
    { label: 'About Us', url: '/about-chilmund' },
    { label: 'Meet our Team', url: '/meet-our-team' },
    { label: 'Contact Us', url: '/contact' },
  ]),
  dropdown('Products & Services', [
    { label: 'Product Details', url: '/product-details' },
    { label: 'Uses of Aluminium Sulphate', url: '/uses-aluminium-sulphate' },
    { label: 'Manufacturing Plant', url: '/manufacturing-plant' },
    { label: 'Trucking & Logistics', url: '/trucking-logistics' },
  ]),
  dropdown('Partnerships & Accreditations', [
    { label: 'Partnerships & Accreditations', url: '/partnerships-accreditations' },
    { label: 'Regional Markets', url: '/regional-markets' },
  ]),
  link('SHEQ', '/sheq'),
  dropdown('News & Events', [
    { label: 'News & Events', url: '/news' },
    { label: 'Industry Awards', url: '/industry-awards' },
    { label: 'CSR', url: '/csr' },
  ]),
]
