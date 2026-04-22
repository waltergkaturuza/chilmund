/**
 * Team bios sourced from "Website Biographies Chilmund" PDF (April 2026).
 * Portrait files live in /public — filenames must match `imageFile` exactly.
 */

export type TeamDepartment =
  | 'management'
  | 'finance'
  | 'business'
  | 'production'
  | 'research'
  | 'engineering'
  | 'hr'
  | 'quality'
  | 'sheq'
  | 'logistics'
  | 'other'

export type TeamProfileSource = {
  /** Stable id for keys / analytics */
  id: string
  name: string
  jobTitle: string
  department: TeamDepartment
  /** Filename only, under /public */
  imageFile: string
  featured: boolean
  /** Sort order on Meet Our Team (lower first) */
  order: number
  credentials: string
  /** Full biography for profile modal (from PDF) */
  fullProfile: string
  /**
   * Optional Tailwind classes for `object-position` when using `object-cover`
   * (e.g. lots of headroom above the subject in the source file).
   */
  photoObjectPosition?: string
}

export function teamPhotoSrc(imageFile: string): string {
  return '/' + imageFile.split('/').map((seg) => encodeURIComponent(seg)).join('/')
}

export const teamProfilesFromPdf: TeamProfileSource[] = [
  {
    id: 'jeffrey-mazonde',
    name: 'Jeffrey Mazonde',
    jobTitle: 'Managing Director',
    department: 'management',
    imageFile: 'Jeffrey Mazonde \u2013 Managing Director.jpg',
    featured: true,
    order: 1,
    /* Source photo has large empty area above the subject; shift crop down */
    photoObjectPosition: 'object-[50%_58%]',
    credentials: 'MSc Strategic Management, BSc (Civ. Eng) Hons',
    fullProfile:
      'A hands-on, purpose-driven business leader, Jeffrey brings extensive experience (over 36 years) into this role. His expertise in project design and management, consultancy and leadership delivers highly competitive, tailored water treatment solutions for local and international customers.',
  },
  {
    id: 'oswell-matore',
    name: 'Oswell Matore',
    jobTitle: 'Production and Distribution Director',
    department: 'production',
    imageFile: 'Oswell Matore \u2013 Production and Distribution Director.jpg',
    featured: true,
    order: 2,
    photoObjectPosition: 'object-[50%_56%]',
    credentials: 'BCompt, CA (Z)',
    fullProfile:
      'Oswell brings more than 25 years of experience in auditing, finance and administration across the insurance, banking, aviation, energy and manufacturing sectors. He has recently been assigned to the Production and Distribution department in a drive to make the company more customer-centric.',
  },
  {
    id: 'gratitude-charis',
    name: 'Dr Gratitude Charis',
    jobTitle: 'Business Consultant in the office of the CEO',
    department: 'management',
    imageFile: 'Dr Gratitude Charis -  Business Consultant in the office of the CEO.jpg',
    featured: false,
    order: 3,
    credentials: 'PhD Chem Eng, MEng MSOM, BEng Chem Eng, Prof Eng (ECZ)',
    fullProfile:
      'Dr Charis is a versatile resource person who proffers techno-economic advice and assists in drafting, reviewing and executing reports, policies, plans and proposals. He draws on 15+ years of combined experience in R&D, innovation and commercialisation pipelines, and consultancy work.',
  },
  {
    id: 'sabina-magosvongwe',
    name: 'Sabina Magosvongwe',
    jobTitle: 'Finance Manager',
    department: 'finance',
    imageFile: 'Sabina Magosvongwe- Finance Manager.jpg',
    featured: false,
    order: 4,
    credentials:
      'CA (Z), PGD in Applied Accounting Science, PGD in Advanced Accounting Science, BCom Accounting (Hons)',
    fullProfile:
      'Sabina is a strategic chartered accountant who leads the finance function at Chilmund Chemicals, overseeing financial planning, cost management and compliance. She brings deep expertise in manufacturing finance, including costing models, budgeting and internal controls. She has 8+ years of financial leadership experience, including roles as acting FD in the FMCG sector, financial accountant in the life assurance sector, and audit manager at an international firm of chartered accountants.',
  },
  {
    id: 'nicholas-bhero',
    name: 'Nicholas Bhero',
    jobTitle: 'Business Development Manager',
    department: 'business',
    imageFile: 'Nicholas Bhero - Business Development Manager.jpg',
    featured: false,
    order: 5,
    credentials: 'MBA, BSc (Hons) Development Studies',
    fullProfile:
      'Nicholas Bhero is a dynamic business development strategist with over 20 years of experience in marketing, sales and brand positioning. He leads the marketing function, driving growth initiatives and spearheading the expansion of the Chilmund brand across Zimbabwe and into regional markets. Nicholas brings strong expertise in market development, strategic partnerships and revenue growth, underpinned by well-established relationships across both the private sector and government.',
  },
  {
    id: 'faith-mushete',
    name: 'Faith Mushete',
    jobTitle: 'Human Resources Manager',
    department: 'hr',
    imageFile: 'Faith Mushete - Human Resources Manager.jpg',
    featured: false,
    order: 6,
    credentials: 'MSc HRM, BComm HRM',
    fullProfile:
      'Faith is a strategic human resources leader with over 20 years of progressive experience across the manufacturing and apparel sectors. She specialises in aligning HR strategy with business objectives to drive performance, strengthen organisational culture and support sustainable growth. Faith has extensive experience in talent acquisition and workforce planning, training and capacity building, compensation and benefits, performance management, and employee wellbeing and culture. She is committed to building strong teams, enhancing employee engagement, and delivering HR solutions that enable both organisational success and employee wellbeing.',
  },
  {
    id: 'leo-zulu',
    name: 'Leo Zulu',
    jobTitle: 'Compliance Manager',
    department: 'research',
    imageFile: 'Leo Zulu- Compliance Manager.jpg',
    featured: false,
    order: 7,
    credentials: 'BEng Chem Eng',
    fullProfile:
      'A chemical engineer with vast experience in the mining, heavy chemical, pharmaceutical and food industries and research, Leo is currently responsible for ensuring that all company operations, products and processes adhere to stringent local and international regulations regarding health, safety, environment and chemical management.',
  },
  {
    id: 'allen-mukwasi',
    name: 'Allen Mukwasi',
    jobTitle: 'Safety, Health and Environmental (SHE) Officer',
    department: 'sheq',
    imageFile: 'Allen Mukwasi - Safety, Health and Environmental (SHE) Officer.jpg',
    featured: false,
    order: 8,
    credentials:
      'MSc in Safety, Health and Environmental Management, BSc in Geography and Environmental Studies, certificate in ISO 9001, ISO 14001 and ISO 45001 internal auditing, development and implementation, OSHEMAC certificate; additional training in root cause analysis, first aid, firefighting, and hazardous substances handling.',
    fullProfile:
      'Allen has over five years of experience in safety, health, environmental and quality (SHEQ) management within the manufacturing and construction sectors, with hands-on involvement in ISO certification processes and chemical manufacturing plant construction projects. He leads SHEQ initiatives, focusing on integrated management systems, regulatory compliance and risk management.',
  },
  {
    id: 'brenda-munyai',
    name: 'Brenda Munyai',
    jobTitle: 'Production Superintendent',
    department: 'production',
    imageFile: 'Brenda Munyai- Production Superintendent.jpg',
    featured: false,
    order: 9,
    credentials:
      'MSc Chem Eng, BSc Chem Eng, certificate in root cause analysis, Prof Eng (ECSA)',
    fullProfile:
      'Brenda Munyai brings 8+ years of experience in chemical manufacturing and process engineering, specialising in production optimisation, plant performance and continuous improvement. She is a results-driven chemical and process engineer focused on delivering efficient, reliable and sustainable manufacturing performance, with strong expertise in process design and reaction engineering. She applies a data-driven approach to process optimisation and root cause analysis, translating operational insights into practical solutions that improve efficiency and product quality.',
  },
  {
    id: 'francis-chitsika',
    name: 'Francis Chitsika',
    jobTitle: 'Procurement Officer',
    department: 'logistics',
    imageFile: 'Francis Chitsika- Procurement Officer.jpg',
    featured: false,
    order: 10,
    credentials: 'MBA, BCom Purchasing and Supply',
    fullProfile:
      'Francis is an experienced strategic supply chain leader with over seven years of expertise in diverse sectors, including FMCG, mining, chemicals manufacturing and construction. He has proven proficiency in transport and logistics management, strategic procurement, and warehouse and distribution management. In his engagements, he has fostered strong relationships with suppliers and delivered cost-containment strategies for organisations to improve their bottom line.',
  },
  {
    id: 'fungai-gavu',
    name: 'Fungai Gavu',
    jobTitle: 'Technical and Marketing Executive',
    department: 'business',
    imageFile: 'Fungai Gavu - Technical and Marketing Executive.jpg',
    featured: false,
    order: 11,
    credentials: 'Bachelor of Technology in Applied Chemistry, Chemical Processing Technology Hons',
    fullProfile:
      'Fungai brings 30+ years of experience in the industrial chemicals manufacturing and distribution industry. This extensive experience spans local and international trade, with deep expertise in industrial chemicals application and processes, industrial chemicals sales and marketing, international trade procedures and business administration.',
  },
  {
    id: 'milton-dangaiso',
    name: 'Milton Dangaiso',
    jobTitle: 'ICT Officer',
    department: 'engineering',
    imageFile: 'Milton Dangaiso - ICT Officer.jpg',
    featured: false,
    order: 12,
    credentials:
      'MSc ISM, BSc Hons IS, ND Comp. Sc, diploma in Unix administration, telecommunication systems certificate',
    fullProfile:
      'Milton is a seasoned professional with 25 years of diverse experience spanning the financial services sector, insurance, chemical manufacturing, ICT services and logistics. He has built a strong record in integrating technology with business operations, driving efficiency and supporting organisational growth. His multidisciplinary background enables him to navigate complex environments, align ICT strategies with business objectives and deliver innovative solutions across industries. Milton is recognised for his strategic thinking, problem-solving capabilities and ability to lead and support digital transformation initiatives while ensuring operational continuity and value creation.',
  },
  {
    id: 'saka-madzudzo',
    name: 'Saka Shingirai Madzudzo',
    jobTitle: 'Systems Developer / Software Engineer',
    department: 'engineering',
    imageFile: 'Saka Shingirai Madzudzo- Systems Developer  Software Engineer.jpg',
    featured: false,
    order: 13,
    credentials: 'BTech in Software Engineering, certificate in tertiary and higher education',
    fullProfile:
      'Saka is a systems developer specialising in scalable enterprise applications, ERP system design and API integrations. He combines strong backend engineering expertise with practical experience in modernising legacy systems and driving process automation. His work focuses on aligning technology with business operations to improve efficiency, data integrity and system reliability. He brings 5+ years delivering enterprise software solutions across healthcare, agro-industrial and technology sectors, with a focus on ERP systems, backend architecture and systems integration.',
  },
  {
    id: 'sikhangele-mhene',
    name: 'Ms Sikhangele Muhle E Mhene',
    jobTitle: 'Quality Control / Quality Assurance Officer (QC/QA Officer)',
    department: 'quality',
    imageFile: 'Ms Sikhangele Muhle E Mhene- Quality ControlQuality Assurance Officer (QCQA Officer).jpg',
    featured: false,
    order: 14,
    credentials:
      'MSc in Strategic Management, BSc in Chemical Technology, ISO 9001:2015 QMS lead auditor (SAATCA certified), quality assurance SAZ-UZ business studies certified',
    fullProfile:
      'Sikhangele is a seasoned quality systems professional with a decade of experience optimising chemical laboratory operations, including six years of managerial expertise. She specialises in establishing robust quality control test protocols and leading cross-functional departments to implement corrective actions that eliminate recurrence of identified nonconformities and process deviations. She has demonstrated success in spearheading ISO 9001:2008 and ISO 9001:2015 certifications and is currently architecting the transition to a comprehensive integrated management system (IMS).',
  },
]

export function normalizeTeamName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export const teamProfilesByNormalizedName = new Map(
  teamProfilesFromPdf.map((p) => [normalizeTeamName(p.name), p]),
)
