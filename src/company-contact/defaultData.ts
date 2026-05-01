/** Official contact & social — from Chilmund website content PDF */
export const companyContactDefaultData = {
  enableFloatingActions: true,
  salesPhone: '+263 242 312 235 / 236',
  salesPhoneTel: '+263242312235',
  salesEmail: 'sales@chilmund.co.zw',
  whatsappNumber: '263783184726',
  whatsappPrefillMessage:
    'Hello, I would like to enquire about aluminium sulphate supply from Chilmund Chemicals.',
  quotePagePath: '/contact',
  /**
   * Bindura plant — Google Maps pin (decimal -17.323036, 31.323233; ~M8GF+Q7Q).
   * Classic embed: `.../maps?q=lat,lng&z=…&output=embed` — also allowed by our iframe allowlist.
   */
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=-17.323036,31.323233&z=17&hl=en&output=embed',
  headOfficeAddress: '114 Harare Drive, Marlborough, Harare',
  manufacturingPlantAddress: '914/15 Kingston Road, Bindura, Zimbabwe',
  phoneBinduraDisplay: '+263 66 2107 155 / 57',
  phoneBinduraTel: '+263662107155',
  adminEmail: 'admin@chilmund.co.zw',
  socialTwitter: '@chilmundchem',
  socialLinkedIn: 'Chilmund Chemicals Official',
  socialFacebook: 'Chilmund Chemicals',
  socialInstagram: '@chilmundchemicals',
  linkedinUrl: '',
  facebookUrl: '',
} as const
