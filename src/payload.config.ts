import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { CompanyContact } from './company-contact/config'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/** Isolated Postgres schema — never uses `public`. Create in Supabase before first run (see supabase/sql/). */
const payloadDatabaseSchema = process.env.PAYLOAD_DATABASE_SCHEMA || 'chilmund_payload'
const migrationsDir = path.resolve(dirname, '..', 'migrations')

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    /**
     * All Payload tables + enums live only in this schema, so existing `public` (and other) schemas stay untouched.
     * @see https://payloadcms.com/docs/database/postgres (schemaName — experimental; fine for greenfield Chilmund tables)
     */
    schemaName: payloadDatabaseSchema,
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      max: Number(process.env.PAYLOAD_PG_POOL_MAX || 10),
      idleTimeoutMillis: Number(process.env.PAYLOAD_PG_IDLE_TIMEOUT_MS || 30_000),
    },
    migrationDir: migrationsDir,
    /** Supabase always has a database; do not let Payload try CREATE DATABASE. */
    disableCreateDatabase: true,
    /**
     * Dev: Payload pushes schema when NODE_ENV !== 'production' (unless PAYLOAD_MIGRATING=true).
     * Production (Vercel): run `payload migrate` before `next build` / on deploy after committing migrations.
     */
  }),
  collections: [Pages, Posts, Media, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, CompanyContact],
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
