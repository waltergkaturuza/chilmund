import type { RequiredDataFromCollectionSlug } from 'payload'

import { heading, line, paragraph, richRoot, textNode } from '@/content/lexicalBuilders'

/** Fallback home when no `home` page exists in the database — from client “Chilmund website content” PDF */
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  hero: {
    type: 'lowImpact',
    links: [
      {
        id: 'hero-cta-1',
        link: {
          type: 'custom',
          url: '/contact',
          label: 'Request a quote',
          appearance: 'default',
        },
      },
      {
        id: 'hero-cta-2',
        link: {
          type: 'custom',
          url: '/contact',
          label: 'Contact sales',
          appearance: 'outline',
        },
      },
    ],
    richText: richRoot([
      heading(
        'h1',
        'Trailblazing water treatment manufacturing — from Bindura, for Africa',
      ),
      line(
        'Chilmund Chemicals is a trailblazer in the water treatment industry. Our state-of-the-art manufacturing plant in Bindura, Zimbabwe — 86 km from Harare — is the fifth of its kind globally and the only one in Africa. Since transitioning from trading to manufacturing in July 2023, we have built capacity for up to 7,200 metric tons of aluminium sulphate per month.',
      ),
      line(
        'Experience the unmatched performance and reliability of our world-class products. We are dedicated to making clean, safe water accessible to all, driving sustainable development, and building a brighter future for Africa.',
      ),
    ]),
  },
  meta: {
    description:
      'Chilmund Chemicals — aluminium sulphate and water treatment chemicals from Bindura, Zimbabwe. 7,200 MT/month capacity. SAZ certified. Sales: sales@chilmund.co.zw',
    title: 'Chilmund Chemicals | Water treatment chemicals — Bindura, Zimbabwe',
  },
  title: 'Home',
  layout: [
    {
      id: 'home-pillars',
      blockName: 'Our three pillars',
      blockType: 'content',
      columns: [
        {
          id: 'col-pillars',
          size: 'full',
          enableLink: false,
          richText: richRoot([
            heading('h2', 'Our three pillars'),
            line('1. Quality: We deliver world-class products that meet the highest global standards.'),
            line('2. Affordability: We ensure our solutions are accessible to all, regardless of economic status.'),
            line(
              '3. Service Excellence: We prioritize customer satisfaction through timely delivery and exceptional support.',
            ),
          ]),
        },
      ],
    },
    {
      id: 'home-vision-mission',
      blockName: 'Vision & mission',
      blockType: 'content',
      columns: [
        {
          id: 'col-vision',
          size: 'half',
          enableLink: false,
          richText: richRoot([
            heading('h2', 'Our vision'),
            line(
              'To be the most sustainable and trusted Pan-African water treatment chemicals partner, empowering communities to thrive through clean, accessible water.',
            ),
          ]),
        },
        {
          id: 'col-mission',
          size: 'half',
          enableLink: false,
          richText: richRoot([
            heading('h2', 'Our mission'),
            line(
              'We deliver result-oriented water solutions that enhance lives and livelihoods, one drop at a time. Through responsible manufacturing and environmental stewardship, we aim to create a lasting impact on people and the planet.',
            ),
          ]),
        },
      ],
    },
    {
      id: 'home-values',
      blockName: 'Core values',
      blockType: 'content',
      columns: [
        {
          id: 'col-values',
          size: 'full',
          enableLink: false,
          richText: richRoot([
            heading('h2', 'Core values'),
            line('1. Quality: Rigorous monitoring at every stage ensures world-class products.'),
            line(
              '2. Integrity and Excellence: Transparency and commitment to the highest standards guide our actions.',
            ),
            line(
              '3. Teamwork and Innovation: Collaboration drives us to evolve and deliver superior solutions.',
            ),
            line(
              '4. Sustainable Livelihoods and Environmental Responsibility: We build a brighter future for people and the planet in harmony.',
            ),
            line(
              '5. Diversity and Inclusion: We celebrate the strengths of our talented team to drive collective success.',
            ),
            line(
              '6. Growth-Oriented Partnerships: We invest in our employees’ well-being and growth, fostering mutual success.',
            ),
            line(
              '7. Positivity and Optimism — Fostering a Culture of Empowerment: We cultivate a positive and optimistic mindset, empowering our team and partners to approach challenges with resilience, enthusiasm, and a belief in achieving success.',
            ),
          ]),
        },
      ],
    },
    {
      id: 'home-products',
      blockName: 'Product excellence',
      blockType: 'content',
      columns: [
        {
          id: 'col-products',
          size: 'full',
          enableLink: false,
          richText: richRoot([
            heading('h2', 'Product excellence'),
            paragraph([
              textNode('Core product: ', 0),
              textNode('Granular, liquid and kibbled aluminium sulphate', 1),
              textNode(
                ' — the “universal coagulant” for high-performance results in municipal water treatment, industrial processing, agriculture and mining.',
                0,
              ),
            ]),
            heading('h3', 'Applications'),
            line(
              '• Municipal water treatment: efficient removal of suspended solids and pathogens.',
            ),
            line(
              '• Industrial processing: essential for paper sizing (ink control) and textile dyeing (colour fixation).',
            ),
            line('• Agriculture & mining: soil pH adjustment and wastewater remediation.'),
            heading('h3', 'Full spectrum water solutions'),
            line('Beyond our flagship alum, we provide coagulants & flocculants and disinfectants.'),
          ]),
        },
      ],
    },
    {
      id: 'home-sheq',
      blockName: 'Operational integrity',
      blockType: 'content',
      columns: [
        {
          id: 'col-sheq',
          size: 'full',
          enableLink: false,
          richText: richRoot([
            heading('h2', 'Operational integrity (SHEQ & partnerships)'),
            line(
              'Compromise is not an option. At Chilmund, safety and quality are not departments — they are our licence to operate.',
            ),
            line(
              'We prioritize the safety of our employees, visitors, and the environment. Our fully fledged SHEQ department adheres to global best practices, ensuring responsible manufacturing and operational excellence.',
            ),
            line(
              '• SAZ certified: our products carry the Standards Association of Zimbabwe mark of quality.',
            ),
            line(
              '• R&D driven: our internal laboratory focuses on the next generation of water treatment technology.',
            ),
            line(
              'Social proof: showcase SAZ certification, PRAZ, and “Best Innovator” recognition — plus brand video (trucks, production, lab, clients) with background music as per your brief.',
            ),
          ]),
        },
      ],
    },
    {
      id: 'home-csr',
      blockName: 'CSR & accolades',
      blockType: 'content',
      columns: [
        {
          id: 'col-csr',
          size: 'full',
          enableLink: false,
          richText: richRoot([
            heading('h2', 'Impact (CSR)'),
            line(
              'Investing in the hands that feed us. We believe clean water is a human right. Our success fuels the community through education (full tuition for underprivileged students), nutrition support for vulnerable families, and future-proofing through local manufacturing and sustainable livelihoods.',
            ),
            heading('h3', 'Industry accolades'),
            line('• Best Exhibitor — SADC Industrialization Week'),
            line('• Company of the Year — Mashonaland Central'),
            line('• Best Innovator — National Business Awards'),
            line(
              '• Outstanding Investor in Manufacturing — Africa Investment Leaders Forum and Awards',
            ),
          ]),
        },
      ],
    },
    {
      id: 'home-downloads',
      blockName: 'Downloads',
      blockType: 'content',
      columns: [
        {
          id: 'col-downloads',
          size: 'full',
          enableLink: false,
          richText: richRoot([
            heading('h2', 'Downloads'),
            line('• MSDS (Material Safety Data Sheets)'),
            line('• COA (Certificates of Analysis)'),
            line('• Company profile'),
            line(
              'Request these from our sales team via the contact page or WhatsApp — we will link files here once uploaded to the CMS.',
            ),
          ]),
        },
      ],
    },
    {
      id: 'home-cta-footer',
      blockName: 'Supply CTA',
      blockType: 'cta',
      richText: richRoot([
        heading('h2', 'Ready to secure your chemical supply?'),
        line('Speak to our sales team for quotations, specifications, logistics across Zimbabwe and the region.'),
      ]),
      links: [
        {
          id: 'cta-contact',
          link: {
            type: 'custom',
            url: '/contact',
            label: 'Contact us',
            appearance: 'default',
          },
        },
        {
          id: 'cta-quote',
          link: {
            type: 'custom',
            url: '/contact',
            label: 'Request a quote',
            appearance: 'outline',
          },
        },
      ],
    },
  ],
}
