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
    { label: 'Meet our Team', url: '/meet-our-team' },
    { label: 'Contact Us', url: '/contact' },
  ]),
  dropdown('Products', [
    { label: 'Product details', url: '/product-details' },
    { label: 'Aluminium sulphate uses', url: '/uses-aluminium-sulphate' },
    { label: 'Manufacturing plant', url: '/manufacturing-plant' },
    { label: 'Logistics', url: '/trucking-logistics' },
  ]),
  dropdown('Partners', [
    { label: 'Partnerships & accreditations', url: '/partnerships-accreditations' },
    { label: 'Regional markets', url: '/regional-markets' },
  ]),
  link('SHEQ', '/sheq'),
  dropdown('Updates', [
    { label: 'News & events', url: '/news' },
    { label: 'Industry awards', url: '/industry-awards' },
    { label: 'CSR', url: '/csr' },
  ]),
  dropdown('Resources', [
    { label: 'Library', url: '/resources' },
    { label: 'Track quote', url: '/track-quote' },
  ]),
]
