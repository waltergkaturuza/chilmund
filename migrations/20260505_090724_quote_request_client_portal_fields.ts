import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "chilmund_payload"."quote_requests_client_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Official quotation' NOT NULL,
  	"file_id" integer NOT NULL
  );
  
  ALTER TABLE "chilmund_payload"."quote_requests" ADD COLUMN "message_to_client" varchar;
  ALTER TABLE "chilmund_payload"."quote_requests_client_downloads" ADD CONSTRAINT "quote_requests_client_downloads_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "chilmund_payload"."media"("id") ON DELETE restrict ON UPDATE no action;
  ALTER TABLE "chilmund_payload"."quote_requests_client_downloads" ADD CONSTRAINT "quote_requests_client_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "chilmund_payload"."quote_requests"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "quote_requests_client_downloads_order_idx" ON "chilmund_payload"."quote_requests_client_downloads" USING btree ("_order");
  CREATE INDEX "quote_requests_client_downloads_parent_id_idx" ON "chilmund_payload"."quote_requests_client_downloads" USING btree ("_parent_id");
  CREATE INDEX "quote_requests_client_downloads_file_idx" ON "chilmund_payload"."quote_requests_client_downloads" USING btree ("file_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "chilmund_payload"."quote_requests_client_downloads" CASCADE;
  ALTER TABLE "chilmund_payload"."quote_requests" DROP COLUMN "message_to_client";`)
}
