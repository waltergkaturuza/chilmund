export type MeetOurTeamMember = {
  id: string
  name: string
  jobTitle: string
  department: string | null
  photo: string | null
  /** Tailwind classes for portrait crop (object-position), e.g. object-[50%_58%] */
  photoObjectPosition: string | null
  /** Short line for cards */
  bioShort: string | null
  credentials: string | null
  /** Full biography (modal) */
  fullProfile: string
  email: string | null
  linkedIn: string | null
  featured: boolean
  order: number
}
