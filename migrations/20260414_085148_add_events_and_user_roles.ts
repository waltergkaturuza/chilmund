import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "chilmund_payload"."enum_users_roles" AS ENUM('admin', 'editor');
  CREATE TYPE "chilmund_payload"."enum_events_event_type" AS ENUM('Conference', 'Exhibition', 'Workshop', 'Award Ceremony', 'CSR Activity', 'Other');
  CREATE TYPE "chilmund_payload"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "chilmund_payload"."enum__events_v_version_event_type" AS ENUM('Conference', 'Exhibition', 'Workshop', 'Award Ceremony', 'CSR Activity', 'Other');
  CREATE TYPE "chilmund_payload"."enum__events_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "chilmund_payload"."users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "chilmund_payload"."enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "chilmund_payload"."events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"event_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"venue" varchar,
  	"venue_address" varchar,
  	"event_type" "chilmund_payload"."enum_events_event_type",
  	"registration_url" varchar,
  	"hero_image_id" integer,
  	"summary" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "chilmund_payload"."enum_events_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "chilmund_payload"."_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_event_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_venue" varchar,
  	"version_venue_address" varchar,
  	"version_event_type" "chilmund_payload"."enum__events_v_version_event_type",
  	"version_registration_url" varchar,
  	"version_hero_image_id" integer,
  	"version_summary" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "chilmund_payload"."enum__events_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" ADD COLUMN "events_id" integer;
  ALTER TABLE "chilmund_payload"."users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "chilmund_payload"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "chilmund_payload"."events" ADD CONSTRAINT "events_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "chilmund_payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "chilmund_payload"."events" ADD CONSTRAINT "events_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "chilmund_payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "chilmund_payload"."_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "chilmund_payload"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "chilmund_payload"."_events_v" ADD CONSTRAINT "_events_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "chilmund_payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "chilmund_payload"."_events_v" ADD CONSTRAINT "_events_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "chilmund_payload"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_roles_order_idx" ON "chilmund_payload"."users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "chilmund_payload"."users_roles" USING btree ("parent_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "chilmund_payload"."events" USING btree ("slug");
  CREATE INDEX "events_hero_image_idx" ON "chilmund_payload"."events" USING btree ("hero_image_id");
  CREATE INDEX "events_meta_meta_image_idx" ON "chilmund_payload"."events" USING btree ("meta_image_id");
  CREATE INDEX "events_updated_at_idx" ON "chilmund_payload"."events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "chilmund_payload"."events" USING btree ("created_at");
  CREATE INDEX "events__status_idx" ON "chilmund_payload"."events" USING btree ("_status");
  CREATE INDEX "_events_v_parent_idx" ON "chilmund_payload"."_events_v" USING btree ("parent_id");
  CREATE INDEX "_events_v_version_version_slug_idx" ON "chilmund_payload"."_events_v" USING btree ("version_slug");
  CREATE INDEX "_events_v_version_version_hero_image_idx" ON "chilmund_payload"."_events_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_events_v_version_meta_version_meta_image_idx" ON "chilmund_payload"."_events_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_events_v_version_version_updated_at_idx" ON "chilmund_payload"."_events_v" USING btree ("version_updated_at");
  CREATE INDEX "_events_v_version_version_created_at_idx" ON "chilmund_payload"."_events_v" USING btree ("version_created_at");
  CREATE INDEX "_events_v_version_version__status_idx" ON "chilmund_payload"."_events_v" USING btree ("version__status");
  CREATE INDEX "_events_v_created_at_idx" ON "chilmund_payload"."_events_v" USING btree ("created_at");
  CREATE INDEX "_events_v_updated_at_idx" ON "chilmund_payload"."_events_v" USING btree ("updated_at");
  CREATE INDEX "_events_v_latest_idx" ON "chilmund_payload"."_events_v" USING btree ("latest");
  CREATE INDEX "_events_v_autosave_idx" ON "chilmund_payload"."_events_v" USING btree ("autosave");
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "chilmund_payload"."events"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "chilmund_payload"."payload_locked_documents_rels" USING btree ("events_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "chilmund_payload"."users_roles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "chilmund_payload"."events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "chilmund_payload"."_events_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "chilmund_payload"."users_roles" CASCADE;
  DROP TABLE "chilmund_payload"."events" CASCADE;
  DROP TABLE "chilmund_payload"."_events_v" CASCADE;
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_events_fk";
  
  DROP INDEX "chilmund_payload"."payload_locked_documents_rels_events_id_idx";
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" DROP COLUMN "events_id";
  DROP TYPE "chilmund_payload"."enum_users_roles";
  DROP TYPE "chilmund_payload"."enum_events_event_type";
  DROP TYPE "chilmund_payload"."enum_events_status";
  DROP TYPE "chilmund_payload"."enum__events_v_version_event_type";
  DROP TYPE "chilmund_payload"."enum__events_v_version_status";`)
}
