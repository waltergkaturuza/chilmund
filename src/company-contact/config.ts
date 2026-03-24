import type { GlobalConfig } from 'payload'

import { companyContactDefaultData } from './defaultData'

import { revalidateCompanyContact } from './hooks/revalidateCompanyContact'

const D = companyContactDefaultData

export const CompanyContact: GlobalConfig = {
  slug: 'company-contact',
  label: 'Company contact & CTAs',
  admin: {
    group: 'Site & navigation',
    description:
      'Phones, emails, addresses, and social links used in the footer, floating actions, and structured data.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            {
              name: 'enableFloatingActions',
              type: 'checkbox',
              label: 'Show floating contact actions on the public site',
              defaultValue: D.enableFloatingActions,
            },
          ],
        },
        {
          label: 'Phones & email',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'salesPhone',
                  type: 'text',
                  label: 'Sales phone (display)',
                  defaultValue: D.salesPhone,
                  admin: {
                    width: '50%',
                    description: 'Primary sales line shown to visitors (e.g. Harare)',
                  },
                },
                {
                  name: 'salesPhoneTel',
                  type: 'text',
                  label: 'Sales phone (tel: link)',
                  defaultValue: D.salesPhoneTel,
                  admin: {
                    width: '50%',
                    description: 'E.164 for click-to-call',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'phoneBinduraDisplay',
                  type: 'text',
                  label: 'Bindura plant (display)',
                  defaultValue: D.phoneBinduraDisplay,
                  admin: { width: '50%' },
                },
                {
                  name: 'phoneBinduraTel',
                  type: 'text',
                  label: 'Bindura plant (tel: link)',
                  defaultValue: D.phoneBinduraTel,
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'salesEmail',
              type: 'email',
              label: 'Sales email',
              defaultValue: D.salesEmail,
            },
            {
              name: 'adminEmail',
              type: 'email',
              label: 'Admin email',
              defaultValue: D.adminEmail,
            },
            {
              name: 'whatsappNumber',
              type: 'text',
              label: 'WhatsApp number',
              defaultValue: D.whatsappNumber,
              admin: {
                description: 'Digits only, country code, no + (e.g. 263783184726)',
              },
            },
            {
              name: 'whatsappPrefillMessage',
              type: 'textarea',
              label: 'WhatsApp default message',
              defaultValue: D.whatsappPrefillMessage,
            },
          ],
        },
        {
          label: 'Addresses & quote',
          fields: [
            {
              name: 'headOfficeAddress',
              type: 'text',
              label: 'Head office address',
              defaultValue: D.headOfficeAddress,
            },
            {
              name: 'manufacturingPlantAddress',
              type: 'text',
              label: 'Manufacturing plant address',
              defaultValue: D.manufacturingPlantAddress,
            },
            {
              name: 'quotePagePath',
              type: 'text',
              label: 'Quote / contact page path',
              defaultValue: D.quotePagePath,
              admin: {
                description: 'Path for “Request a quote” (e.g. /contact).',
              },
            },
            {
              name: 'googleMapsEmbedUrl',
              type: 'text',
              label: 'Google Maps embed URL',
              defaultValue: D.googleMapsEmbedUrl,
              admin: {
                description:
                  'Google Maps → Share → Embed a map → copy only the URL inside src="..." (HTTPS). Shown in the footer when set.',
              },
            },
          ],
        },
        {
          label: 'Social',
          fields: [
            {
              name: 'socialTwitter',
              type: 'text',
              label: 'Twitter / X handle',
              defaultValue: D.socialTwitter,
            },
            {
              name: 'socialInstagram',
              type: 'text',
              label: 'Instagram handle',
              defaultValue: D.socialInstagram,
            },
            {
              name: 'socialLinkedIn',
              type: 'text',
              label: 'LinkedIn (label)',
              defaultValue: D.socialLinkedIn,
            },
            {
              name: 'linkedinUrl',
              type: 'text',
              label: 'LinkedIn URL (optional)',
              defaultValue: D.linkedinUrl,
            },
            {
              name: 'socialFacebook',
              type: 'text',
              label: 'Facebook (page name)',
              defaultValue: D.socialFacebook,
            },
            {
              name: 'facebookUrl',
              type: 'text',
              label: 'Facebook URL (optional)',
              defaultValue: D.facebookUrl,
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateCompanyContact],
  },
}
