CREATE TABLE IF NOT EXISTS "group_resource_table" (
	"resource_id" serial PRIMARY KEY NOT NULL,
	"group_id" integer NOT NULL,
	"resource_name" text NOT NULL,
	"description" text,
	"resource_link" text NOT NULL,
	"saved_name" text NOT NULL,
	"file_type" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_resource_table" ADD CONSTRAINT "group_resource_table_group_id_group_table_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "group_table"("group_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
