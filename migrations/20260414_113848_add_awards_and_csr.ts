import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "chilmund_payload"."enum_industry_awards_category" AS ENUM('quality', 'safety', 'innovation', 'export', 'community', 'leadership', 'other');
  CREATE TYPE "chilmund_payload"."enum_industry_awards_status" AS ENUM('draft', 'published');
  CREATE TYPE "chilmund_payload"."enum__industry_awards_v_version_category" AS ENUM('quality', 'safety', 'innovation', 'export', 'community', 'leadership', 'other');
  CREATE TYPE "chilmund_payload"."enum__industry_awards_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "chilmund_payload"."enum_csr_initiatives_category" AS ENUM('community', 'education', 'environment', 'health', 'water', 'youth', 'employee', 'other');
  CREATE TYPE "chilmund_payload"."enum_csr_initiatives_status" AS ENUM('draft', 'published');
  CREATE TYPE "chilmund_payload"."enum__csr_initiatives_v_version_category" AS ENUM('community', 'education', 'environment', 'health', 'water', 'youth', 'employee', 'other');
  CREATE TYPE "chilmund_payload"."enum__csr_initiatives_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "chilmund_payload"."industry_awards" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"award_year" numeric,
  	"awarding_body" varchar,
  	"category" "chilmund_payload"."enum_industry_awards_category",
  	"image_id" integer,
  	"summary" varchar,
  	"content" jsonb,
  	"featured" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "chilmund_payload"."enum_industry_awards_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "chilmund_payload"."_industry_awards_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_award_year" numeric,
  	"version_awarding_body" varchar,
  	"version_category" "chilmund_payload"."enum__industry_awards_v_version_category",
  	"version_image_id" integer,
  	"version_summary" varchar,
  	"version_content" jsonb,
  	"version_featured" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "chilmund_payload"."enum__industry_awards_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "chilmund_payload"."csr_initiatives_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "chilmund_payload"."csr_initiatives" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"category" "chilmund_payload"."enum_csr_initiatives_category",
  	"date" timestamp(3) with time zone,
  	"location" varchar,
  	"hero_image_id" integer,
  	"summary" varchar,
  	"content" jsonb,
  	"impact" varchar,
  	"featured" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "chilmund_payload"."enum_csr_initiatives_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "chilmund_payload"."_csr_initiatives_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "chilmund_payload"."_csr_initiatives_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_category" "chilmund_payload"."enum__csr_initiatives_v_version_category",
  	"version_date" timestamp(3) with time zone,
  	"version_location" varchar,
  	"version_hero_image_id" integer,
  	"version_summary" varchar,
  	"version_content" jsonb,
  	"version_impact" varchar,
  	"version_featured" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "chilmund_payload"."enum__csr_initiatives_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" ADD COLUMN "industry_awards_id" integer;
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" ADD COLUMN "csr_initiatives_id" integer;
  ALTER TABLE "chilmund_payload"."industry_awards" ADD CONSTRAINT "industry_awards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "chilmund_payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "chilmund_payload"."_industry_awards_v" ADD CONSTRAINT "_industry_awards_v_parent_id_industry_awards_id_fk" FOREIGN KEY ("parent_id") REFERENCES "chilmund_payload"."industry_awards"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "chilmund_payload"."_industry_awards_v" ADD CONSTRAINT "_industry_awards_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "chilmund_payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "chilmund_payload"."csr_initiatives_gallery" ADD CONSTRAINT "csr_initiatives_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "chilmund_payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "chilmund_payload"."csr_initiatives_gallery" ADD CONSTRAINT "csr_initiatives_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "chilmund_payload"."csr_initiatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "chilmund_payload"."csr_initiatives" ADD CONSTRAINT "csr_initiatives_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "chilmund_payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "chilmund_payload"."_csr_initiatives_v_version_gallery" ADD CONSTRAINT "_csr_initiatives_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "chilmund_payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "chilmund_payload"."_csr_initiatives_v_version_gallery" ADD CONSTRAINT "_csr_initiatives_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "chilmund_payload"."_csr_initiatives_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "chilmund_payload"."_csr_initiatives_v" ADD CONSTRAINT "_csr_initiatives_v_parent_id_csr_initiatives_id_fk" FOREIGN KEY ("parent_id") REFERENCES "chilmund_payload"."csr_initiatives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "chilmund_payload"."_csr_initiatives_v" ADD CONSTRAINT "_csr_initiatives_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "chilmund_payload"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "industry_awards_slug_idx" ON "chilmund_payload"."industry_awards" USING btree ("slug");
  CREATE INDEX "industry_awards_image_idx" ON "chilmund_payload"."industry_awards" USING btree ("image_id");
  CREATE INDEX "industry_awards_updated_at_idx" ON "chilmund_payload"."industry_awards" USING btree ("updated_at");
  CREATE INDEX "industry_awards_created_at_idx" ON "chilmund_payload"."industry_awards" USING btree ("created_at");
  CREATE INDEX "industry_awards__status_idx" ON "chilmund_payload"."industry_awards" USING btree ("_status");
  CREATE INDEX "_industry_awards_v_parent_idx" ON "chilmund_payload"."_industry_awards_v" USING btree ("parent_id");
  CREATE INDEX "_industry_awards_v_version_version_slug_idx" ON "chilmund_payload"."_industry_awards_v" USING btree ("version_slug");
  CREATE INDEX "_industry_awards_v_version_version_image_idx" ON "chilmund_payload"."_industry_awards_v" USING btree ("version_image_id");
  CREATE INDEX "_industry_awards_v_version_version_updated_at_idx" ON "chilmund_payload"."_industry_awards_v" USING btree ("version_updated_at");
  CREATE INDEX "_industry_awards_v_version_version_created_at_idx" ON "chilmund_payload"."_industry_awards_v" USING btree ("version_created_at");
  CREATE INDEX "_industry_awards_v_version_version__status_idx" ON "chilmund_payload"."_industry_awards_v" USING btree ("version__status");
  CREATE INDEX "_industry_awards_v_created_at_idx" ON "chilmund_payload"."_industry_awards_v" USING btree ("created_at");
  CREATE INDEX "_industry_awards_v_updated_at_idx" ON "chilmund_payload"."_industry_awards_v" USING btree ("updated_at");
  CREATE INDEX "_industry_awards_v_latest_idx" ON "chilmund_payload"."_industry_awards_v" USING btree ("latest");
  CREATE INDEX "csr_initiatives_gallery_order_idx" ON "chilmund_payload"."csr_initiatives_gallery" USING btree ("_order");
  CREATE INDEX "csr_initiatives_gallery_parent_id_idx" ON "chilmund_payload"."csr_initiatives_gallery" USING btree ("_parent_id");
  CREATE INDEX "csr_initiatives_gallery_image_idx" ON "chilmund_payload"."csr_initiatives_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "csr_initiatives_slug_idx" ON "chilmund_payload"."csr_initiatives" USING btree ("slug");
  CREATE INDEX "csr_initiatives_hero_image_idx" ON "chilmund_payload"."csr_initiatives" USING btree ("hero_image_id");
  CREATE INDEX "csr_initiatives_updated_at_idx" ON "chilmund_payload"."csr_initiatives" USING btree ("updated_at");
  CREATE INDEX "csr_initiatives_created_at_idx" ON "chilmund_payload"."csr_initiatives" USING btree ("created_at");
  CREATE INDEX "csr_initiatives__status_idx" ON "chilmund_payload"."csr_initiatives" USING btree ("_status");
  CREATE INDEX "_csr_initiatives_v_version_gallery_order_idx" ON "chilmund_payload"."_csr_initiatives_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_csr_initiatives_v_version_gallery_parent_id_idx" ON "chilmund_payload"."_csr_initiatives_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_csr_initiatives_v_version_gallery_image_idx" ON "chilmund_payload"."_csr_initiatives_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_csr_initiatives_v_parent_idx" ON "chilmund_payload"."_csr_initiatives_v" USING btree ("parent_id");
  CREATE INDEX "_csr_initiatives_v_version_version_slug_idx" ON "chilmund_payload"."_csr_initiatives_v" USING btree ("version_slug");
  CREATE INDEX "_csr_initiatives_v_version_version_hero_image_idx" ON "chilmund_payload"."_csr_initiatives_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_csr_initiatives_v_version_version_updated_at_idx" ON "chilmund_payload"."_csr_initiatives_v" USING btree ("version_updated_at");
  CREATE INDEX "_csr_initiatives_v_version_version_created_at_idx" ON "chilmund_payload"."_csr_initiatives_v" USING btree ("version_created_at");
  CREATE INDEX "_csr_initiatives_v_version_version__status_idx" ON "chilmund_payload"."_csr_initiatives_v" USING btree ("version__status");
  CREATE INDEX "_csr_initiatives_v_created_at_idx" ON "chilmund_payload"."_csr_initiatives_v" USING btree ("created_at");
  CREATE INDEX "_csr_initiatives_v_updated_at_idx" ON "chilmund_payload"."_csr_initiatives_v" USING btree ("updated_at");
  CREATE INDEX "_csr_initiatives_v_latest_idx" ON "chilmund_payload"."_csr_initiatives_v" USING btree ("latest");
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_industry_awards_fk" FOREIGN KEY ("industry_awards_id") REFERENCES "chilmund_payload"."industry_awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_csr_initiatives_fk" FOREIGN KEY ("csr_initiatives_id") REFERENCES "chilmund_payload"."csr_initiatives"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_industry_awards_id_idx" ON "chilmund_payload"."payload_locked_documents_rels" USING btree ("industry_awards_id");
  CREATE INDEX "payload_locked_documents_rels_csr_initiatives_id_idx" ON "chilmund_payload"."payload_locked_documents_rels" USING btree ("csr_initiatives_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "chilmund_payload"."industry_awards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "chilmund_payload"."_industry_awards_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "chilmund_payload"."csr_initiatives_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "chilmund_payload"."csr_initiatives" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "chilmund_payload"."_csr_initiatives_v_version_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "chilmund_payload"."_csr_initiatives_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "chilmund_payload"."industry_awards" CASCADE;
  DROP TABLE "chilmund_payload"."_industry_awards_v" CASCADE;
  DROP TABLE "chilmund_payload"."csr_initiatives_gallery" CASCADE;
  DROP TABLE "chilmund_payload"."csr_initiatives" CASCADE;
  DROP TABLE "chilmund_payload"."_csr_initiatives_v_version_gallery" CASCADE;
  DROP TABLE "chilmund_payload"."_csr_initiatives_v" CASCADE;
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_industry_awards_fk";
  
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_csr_initiatives_fk";
  
  DROP INDEX "chilmund_payload"."payload_locked_documents_rels_industry_awards_id_idx";
  DROP INDEX "chilmund_payload"."payload_locked_documents_rels_csr_initiatives_id_idx";
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" DROP COLUMN "industry_awards_id";
  ALTER TABLE "chilmund_payload"."payload_locked_documents_rels" DROP COLUMN "csr_initiatives_id";
  DROP TYPE "chilmund_payload"."enum_industry_awards_category";
  DROP TYPE "chilmund_payload"."enum_industry_awards_status";
  DROP TYPE "chilmund_payload"."enum__industry_awards_v_version_category";
  DROP TYPE "chilmund_payload"."enum__industry_awards_v_version_status";
  DROP TYPE "chilmund_payload"."enum_csr_initiatives_category";
  DROP TYPE "chilmund_payload"."enum_csr_initiatives_status";
  DROP TYPE "chilmund_payload"."enum__csr_initiatives_v_version_category";
  DROP TYPE "chilmund_payload"."enum__csr_initiatives_v_version_status";`)
}
