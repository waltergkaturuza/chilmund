import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "chilmund_payload"."enum_newsletter_subscribers_status" AS ENUM('active', 'unsubscribed');
  CREATE TABLE "chilmund_payload"."newsletter_subscribers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"name" varchar,
  	"status" "chilmund_payload"."enum_newsletter_subscribers_status" DEFAULT 'active' NOT NULL,
  	"source" varchar DEFAULT 'website',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" ADD COLUMN "newsletter_subscribers_id" integer;
  CREATE UNIQUE INDEX "newsletter_subscribers_email_idx" ON "chilmund_payload"."newsletter_subscribers" USING btree ("email");
  CREATE INDEX "newsletter_subscribers_updated_at_idx" ON "chilmund_payload"."newsletter_subscribers" USING btree ("updated_at");
  CREATE INDEX "newsletter_subscribers_created_at_idx" ON "chilmund_payload"."newsletter_subscribers" USING btree ("created_at");
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_newsletter_subscribers_fk" FOREIGN KEY ("newsletter_subscribers_id") REFERENCES "chilmund_payload"."newsletter_subscribers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_newsletter_subscribers_id_idx" ON "chilmund_payload"."payload_locked_documents_rels" USING btree ("newsletter_subscribers_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "chilmund_payload"."newsletter_subscribers" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "chilmund_payload"."newsletter_subscribers" CASCADE;
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_newsletter_subscribers_fk";
  
  DROP INDEX "chilmund_payload"."payload_locked_documents_rels_newsletter_subscribers_id_idx";
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" DROP COLUMN "newsletter_subscribers_id";
  DROP TYPE "chilmund_payload"."enum_newsletter_subscribers_status";`)
}
