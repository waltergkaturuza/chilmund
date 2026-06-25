import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "chilmund_payload"."company_contact" ADD COLUMN IF NOT EXISTS "whatsapp_number_secondary" varchar DEFAULT '263774440304';`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "chilmund_payload"."company_contact" DROP COLUMN IF EXISTS "whatsapp_number_secondary";`)
}
