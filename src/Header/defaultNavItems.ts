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
  dropdown('About', [
    { label: 'About Us', url: '/about-chilmund' },
    { label: 'Meet Our Team', url: '/meet-our-team' },
    { label: 'Site Map', url: '/sitemap' },
    { label: 'Contact Us', url: '/contact' },
  ]),
  dropdown('Products', [
    { label: 'Product Details', url: '/product-details' },
    { label: 'Uses of Aluminium Sulphate', url: '/uses-aluminium-sulphate' },
    { label: 'Logistics', url: '/trucking-logistics' },
  ]),
  dropdown('Partners', [
    { label: 'Partners and Certifications', url: '/partnerships-accreditations' },
    { label: 'Regional Markets', url: '/regional-markets' },
  ]),
  link('SHEQ', '/sheq'),
  dropdown('Updates', [
    { label: 'News & Events', url: '/news' },
    { label: 'CSR', url: '/csr' },
  ]),
  dropdown('Resources', [
    { label: 'Library', url: '/resources' },
    { label: 'Track Your Quote', url: '/track-quote' },
  ]),
]
