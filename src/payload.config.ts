import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { anyone } from './access/anyone'
import { CSRInitiatives } from './collections/CSRInitiatives'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Products } from './collections/Products'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { Events } from './collections/Events'
import { IndustryAwards } from './collections/IndustryAwards'
import { QuoteRequests } from './collections/QuoteRequests'
import { Resources } from './collections/Resources'
import { TeamMembers } from './collections/TeamMembers'
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

const databaseUrl = process.env.DATABASE_URL?.trim()
if (!databaseUrl) {
  throw new Error(
    '[Chilmund] DATABASE_URL is missing or empty. Copy .env.example to .env, then paste your full Supabase Postgres URI from Dashboard → Settings → Database (URI format). ' +
      'The password must appear in the URI; if it contains @ # / etc., use URL-encoded characters. ' +
      'Example: postgresql://postgres.[ref]:YOUR_PASSWORD@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require',
  )
}

/** The project-only host (ref.supabase.co) is API traffic, not Postgres; TCP to :5432 there often hits Cloudflare and times out. */
function assertPostgresHostNotSupabaseProjectApi(url: string): void {
  let host: string
  try {
    host = new URL(url.replace(/^postgresql:/i, 'http:')).hostname
  } catch {
    return
  }
  if (/^[a-z0-9]{8,40}\.supabase\.co$/i.test(host)) {
    throw new Error(
      `[Chilmund] DATABASE_URL host "${host}" is the Supabase project (API) hostname, not Postgres. ` +
        'Dashboard → Project Settings → Database → Connection string → URI. Use db.PROJECT_REF.supabase.co (direct) or aws-0-REGION.pooler.supabase.com (pooler), not PROJECT_REF.supabase.co. ' +
        'Wrong host causes ETIMEDOUT (e.g. to Cloudflare IPs) on port 5432.',
    )
  }
}
assertPostgresHostNotSupabaseProjectApi(databaseUrl)

/** Supabase + Node on Windows often hits "self-signed certificate in certificate chain"; TLS is still on, we only skip CA verification. */
const isSupabaseHost = /supabase\.(com|co)/i.test(databaseUrl)
const forceStrictSsl = process.env.DATABASE_SSL_STRICT === 'true'
const relaxSslVerify =
  process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === 'false' ||
  process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === '0'
const poolSsl =
  !forceStrictSsl && (isSupabaseHost || relaxSslVerify)
    ? { rejectUnauthorized: false as const }
    : undefined

/**
 * `pg` merges `parse(connectionString)` over pool options, so `sslmode=require` becomes `ssl: {}` and
 * overrides our `ssl: { rejectUnauthorized: false }`, causing SELF_SIGNED_CERT_IN_CHAIN on Vercel/Supabase.
 * Drop SSL query params when we supply explicit relaxed TLS below.
 */
function connectionStringWithoutSslQueryParams(rawUrl: string): string {
  try {
    const schemeMatch = rawUrl.match(/^(postgres(?:ql)?):\/\//i)
    const scheme = schemeMatch ? schemeMatch[1].toLowerCase() : 'postgresql'
    const u = new URL(rawUrl.replace(/^postgres(?:ql)?:\/\//i, 'http://'))
    for (const key of [
      'sslmode',
      'ssl',
      'sslrootcert',
      'sslcert',
      'sslkey',
      'uselibpqcompat',
    ]) {
      u.searchParams.delete(key)
    }
    return u.toString().replace(/^http:\/\//i, `${scheme}://`)
  } catch {
    return rawUrl
  }
}

const poolConnectionString = poolSsl
  ? connectionStringWithoutSslQueryParams(databaseUrl)
  : databaseUrl

export default buildConfig({
  admin: {
    meta: {
      titleSuffix: '— Chilmund CMS',
    },
    components: {
      graphics: {
        Logo: '@/components/AdminLogo',
      },
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
  /**
   * Media uses `folders: true`. Payload injects `payload-folders` with read access = authenticated only.
   * The admin UI loads `/api/media` while browsing uploads; that flow can 403 on production if folder reads
   * are denied. Media already uses `read: anyone`; align folder document read the same way (names/structure only).
   */
  folders: {
    collectionOverrides: [
      ({ collection }) => ({
        ...collection,
        access: {
          ...collection.access,
          read: anyone,
        },
      }),
    ],
  },
  db: postgresAdapter({
    /**
     * All Payload tables + enums live only in this schema, so existing `public` (and other) schemas stay untouched.
     * @see https://payloadcms.com/docs/database/postgres (schemaName — experimental; fine for greenfield Chilmund tables)
     */
    schemaName: payloadDatabaseSchema,
    pool: {
      connectionString: poolConnectionString,
      max: Number(process.env.PAYLOAD_PG_POOL_MAX || 3),
      idleTimeoutMillis: Number(process.env.PAYLOAD_PG_IDLE_TIMEOUT_MS || 10_000),
      ...(poolSsl ? { ssl: poolSsl } : {}),
    },
    migrationDir: migrationsDir,
    /** Supabase always has a database; do not let Payload try CREATE DATABASE. */
    disableCreateDatabase: true,
    /**
     * Dev: Payload pushes schema when NODE_ENV !== 'production' (unless PAYLOAD_MIGRATING=true).
     * Production (Vercel): run `payload migrate` before `next build` / on deploy after committing migrations.
     */
  }),
  collections: [Pages, Posts, Products, Media, Categories, Users, QuoteRequests, ContactSubmissions, Events, Resources, IndustryAwards, CSRInitiatives, TeamMembers],
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
