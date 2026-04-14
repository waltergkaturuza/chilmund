import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "chilmund_payload"."enum_team_members_department" AS ENUM('management', 'finance', 'business', 'production', 'research', 'engineering', 'hr', 'quality', 'sheq', 'logistics', 'other');
  CREATE TYPE "chilmund_payload"."enum_team_members_status" AS ENUM('draft', 'published');
  CREATE TYPE "chilmund_payload"."enum__team_members_v_version_department" AS ENUM('management', 'finance', 'business', 'production', 'research', 'engineering', 'hr', 'quality', 'sheq', 'logistics', 'other');
  CREATE TYPE "chilmund_payload"."enum__team_members_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "chilmund_payload"."team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"job_title" varchar,
  	"department" "chilmund_payload"."enum_team_members_department",
  	"photo_id" integer,
  	"bio" varchar,
  	"email" varchar,
  	"linked_in" varchar,
  	"order" numeric DEFAULT 50,
  	"featured" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "chilmund_payload"."enum_team_members_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "chilmund_payload"."_team_members_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_job_title" varchar,
  	"version_department" "chilmund_payload"."enum__team_members_v_version_department",
  	"version_photo_id" integer,
  	"version_bio" varchar,
  	"version_email" varchar,
  	"version_linked_in" varchar,
  	"version_order" numeric DEFAULT 50,
  	"version_featured" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "chilmund_payload"."enum__team_members_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" ADD COLUMN "team_members_id" integer;
  ALTER TABLE "chilmund_payload"."team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "chilmund_payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "chilmund_payload"."_team_members_v" ADD CONSTRAINT "_team_members_v_parent_id_team_members_id_fk" FOREIGN KEY ("parent_id") REFERENCES "chilmund_payload"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "chilmund_payload"."_team_members_v" ADD CONSTRAINT "_team_members_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "chilmund_payload"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "team_members_photo_idx" ON "chilmund_payload"."team_members" USING btree ("photo_id");
  CREATE INDEX "team_members_updated_at_idx" ON "chilmund_payload"."team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "chilmund_payload"."team_members" USING btree ("created_at");
  CREATE INDEX "team_members__status_idx" ON "chilmund_payload"."team_members" USING btree ("_status");
  CREATE INDEX "_team_members_v_parent_idx" ON "chilmund_payload"."_team_members_v" USING btree ("parent_id");
  CREATE INDEX "_team_members_v_version_version_photo_idx" ON "chilmund_payload"."_team_members_v" USING btree ("version_photo_id");
  CREATE INDEX "_team_members_v_version_version_updated_at_idx" ON "chilmund_payload"."_team_members_v" USING btree ("version_updated_at");
  CREATE INDEX "_team_members_v_version_version_created_at_idx" ON "chilmund_payload"."_team_members_v" USING btree ("version_created_at");
  CREATE INDEX "_team_members_v_version_version__status_idx" ON "chilmund_payload"."_team_members_v" USING btree ("version__status");
  CREATE INDEX "_team_members_v_created_at_idx" ON "chilmund_payload"."_team_members_v" USING btree ("created_at");
  CREATE INDEX "_team_members_v_updated_at_idx" ON "chilmund_payload"."_team_members_v" USING btree ("updated_at");
  CREATE INDEX "_team_members_v_latest_idx" ON "chilmund_payload"."_team_members_v" USING btree ("latest");
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "chilmund_payload"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "chilmund_payload"."payload_locked_documents_rels" USING btree ("team_members_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "chilmund_payload"."team_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "chilmund_payload"."_team_members_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "chilmund_payload"."team_members" CASCADE;
  DROP TABLE "chilmund_payload"."_team_members_v" CASCADE;
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_team_members_fk";
  
  DROP INDEX "chilmund_payload"."payload_locked_documents_rels_team_members_id_idx";
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" DROP COLUMN "team_members_id";
  DROP TYPE "chilmund_payload"."enum_team_members_department";
  DROP TYPE "chilmund_payload"."enum_team_members_status";
  DROP TYPE "chilmund_payload"."enum__team_members_v_version_department";
  DROP TYPE "chilmund_payload"."enum__team_members_v_version_status";`)
}
