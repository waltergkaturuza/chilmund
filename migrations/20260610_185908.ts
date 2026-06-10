import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "chilmund_payload"."enum_analytics_events_event_type" AS ENUM('page_view', 'quote_submit', 'contact_submit', 'newsletter_signup', 'form_submit', 'whatsapp_click', 'call_click', 'email_click', 'quote_click', 'download', 'other');
  CREATE TABLE "chilmund_payload"."analytics_events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"event_type" "chilmund_payload"."enum_analytics_events_event_type" NOT NULL,
  	"path" varchar NOT NULL,
  	"referrer" varchar,
  	"session_id" varchar,
  	"metadata" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" ADD COLUMN "analytics_events_id" integer;
  CREATE INDEX "analytics_events_event_type_idx" ON "chilmund_payload"."analytics_events" USING btree ("event_type");
  CREATE INDEX "analytics_events_path_idx" ON "chilmund_payload"."analytics_events" USING btree ("path");
  CREATE INDEX "analytics_events_session_id_idx" ON "chilmund_payload"."analytics_events" USING btree ("session_id");
  CREATE INDEX "analytics_events_updated_at_idx" ON "chilmund_payload"."analytics_events" USING btree ("updated_at");
  CREATE INDEX "analytics_events_created_at_idx" ON "chilmund_payload"."analytics_events" USING btree ("created_at");
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_analytics_events_fk" FOREIGN KEY ("analytics_events_id") REFERENCES "chilmund_payload"."analytics_events"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_analytics_events_id_idx" ON "chilmund_payload"."payload_locked_documents_rels" USING btree ("analytics_events_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "chilmund_payload"."analytics_events" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "chilmund_payload"."analytics_events" CASCADE;
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_analytics_events_fk";
  
  DROP INDEX "chilmund_payload"."payload_locked_documents_rels_analytics_events_id_idx";
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" DROP COLUMN "analytics_events_id";
  DROP TYPE "chilmund_payload"."enum_analytics_events_event_type";`)
}
