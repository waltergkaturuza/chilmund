import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "chilmund_payload"."enum_contact_submissions_status" AS ENUM('new', 'read', 'replied', 'archived');
  CREATE TABLE "chilmund_payload"."contact_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "chilmund_payload"."enum_contact_submissions_status" DEFAULT 'new',
  	"subject" varchar NOT NULL,
  	"full_name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"company" varchar,
  	"country" varchar,
  	"message" varchar NOT NULL,
  	"admin_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" ADD COLUMN "contact_submissions_id" integer;
  CREATE INDEX "contact_submissions_updated_at_idx" ON "chilmund_payload"."contact_submissions" USING btree ("updated_at");
  CREATE INDEX "contact_submissions_created_at_idx" ON "chilmund_payload"."contact_submissions" USING btree ("created_at");
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk" FOREIGN KEY ("contact_submissions_id") REFERENCES "chilmund_payload"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_contact_submissions_id_idx" ON "chilmund_payload"."payload_locked_documents_rels" USING btree ("contact_submissions_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "chilmund_payload"."contact_submissions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "chilmund_payload"."contact_submissions" CASCADE;
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk";
  
  DROP INDEX "chilmund_payload"."payload_locked_documents_rels_contact_submissions_id_idx";
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" DROP COLUMN "contact_submissions_id";
  DROP TYPE "chilmund_payload"."enum_contact_submissions_status";`)
}
