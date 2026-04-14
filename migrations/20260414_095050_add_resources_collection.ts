import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "chilmund_payload"."enum_resources_resource_type" AS ENUM('certificate', 'document', 'infographic', 'video', 'image', 'brochure', 'datasheet', 'presentation', 'other');
  CREATE TYPE "chilmund_payload"."enum_resources_status" AS ENUM('draft', 'published');
  CREATE TYPE "chilmund_payload"."enum__resources_v_version_resource_type" AS ENUM('certificate', 'document', 'infographic', 'video', 'image', 'brochure', 'datasheet', 'presentation', 'other');
  CREATE TYPE "chilmund_payload"."enum__resources_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "chilmund_payload"."resources" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"resource_type" "chilmund_payload"."enum_resources_resource_type",
  	"description" varchar,
  	"file_id" integer,
  	"thumbnail_id" integer,
  	"video_url" varchar,
  	"file_size" varchar,
  	"featured" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "chilmund_payload"."enum_resources_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "chilmund_payload"."_resources_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_resource_type" "chilmund_payload"."enum__resources_v_version_resource_type",
  	"version_description" varchar,
  	"version_file_id" integer,
  	"version_thumbnail_id" integer,
  	"version_video_url" varchar,
  	"version_file_size" varchar,
  	"version_featured" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "chilmund_payload"."enum__resources_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" ADD COLUMN "resources_id" integer;
  ALTER TABLE "chilmund_payload"."resources" ADD CONSTRAINT "resources_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "chilmund_payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "chilmund_payload"."resources" ADD CONSTRAINT "resources_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "chilmund_payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "chilmund_payload"."_resources_v" ADD CONSTRAINT "_resources_v_parent_id_resources_id_fk" FOREIGN KEY ("parent_id") REFERENCES "chilmund_payload"."resources"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "chilmund_payload"."_resources_v" ADD CONSTRAINT "_resources_v_version_file_id_media_id_fk" FOREIGN KEY ("version_file_id") REFERENCES "chilmund_payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "chilmund_payload"."_resources_v" ADD CONSTRAINT "_resources_v_version_thumbnail_id_media_id_fk" FOREIGN KEY ("version_thumbnail_id") REFERENCES "chilmund_payload"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "resources_file_idx" ON "chilmund_payload"."resources" USING btree ("file_id");
  CREATE INDEX "resources_thumbnail_idx" ON "chilmund_payload"."resources" USING btree ("thumbnail_id");
  CREATE INDEX "resources_updated_at_idx" ON "chilmund_payload"."resources" USING btree ("updated_at");
  CREATE INDEX "resources_created_at_idx" ON "chilmund_payload"."resources" USING btree ("created_at");
  CREATE INDEX "resources__status_idx" ON "chilmund_payload"."resources" USING btree ("_status");
  CREATE INDEX "_resources_v_parent_idx" ON "chilmund_payload"."_resources_v" USING btree ("parent_id");
  CREATE INDEX "_resources_v_version_version_file_idx" ON "chilmund_payload"."_resources_v" USING btree ("version_file_id");
  CREATE INDEX "_resources_v_version_version_thumbnail_idx" ON "chilmund_payload"."_resources_v" USING btree ("version_thumbnail_id");
  CREATE INDEX "_resources_v_version_version_updated_at_idx" ON "chilmund_payload"."_resources_v" USING btree ("version_updated_at");
  CREATE INDEX "_resources_v_version_version_created_at_idx" ON "chilmund_payload"."_resources_v" USING btree ("version_created_at");
  CREATE INDEX "_resources_v_version_version__status_idx" ON "chilmund_payload"."_resources_v" USING btree ("version__status");
  CREATE INDEX "_resources_v_created_at_idx" ON "chilmund_payload"."_resources_v" USING btree ("created_at");
  CREATE INDEX "_resources_v_updated_at_idx" ON "chilmund_payload"."_resources_v" USING btree ("updated_at");
  CREATE INDEX "_resources_v_latest_idx" ON "chilmund_payload"."_resources_v" USING btree ("latest");
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "chilmund_payload"."resources"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_resources_id_idx" ON "chilmund_payload"."payload_locked_documents_rels" USING btree ("resources_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "chilmund_payload"."resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "chilmund_payload"."_resources_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "chilmund_payload"."resources" CASCADE;
  DROP TABLE "chilmund_payload"."_resources_v" CASCADE;
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_resources_fk";
  
  DROP INDEX "chilmund_payload"."payload_locked_documents_rels_resources_id_idx";
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" DROP COLUMN "resources_id";
  DROP TYPE "chilmund_payload"."enum_resources_resource_type";
  DROP TYPE "chilmund_payload"."enum_resources_status";
  DROP TYPE "chilmund_payload"."enum__resources_v_version_resource_type";
  DROP TYPE "chilmund_payload"."enum__resources_v_version_status";`)
}
