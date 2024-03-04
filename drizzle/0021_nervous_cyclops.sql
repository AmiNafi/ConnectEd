CREATE TABLE IF NOT EXISTS "blog_report" (
	"id" serial PRIMARY KEY NOT NULL,
	"blog_id" integer,
	"blog_title" text NOT NULL,
	"message" text NOT NULL,
	"status" text DEFAULT 'pending',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session_report" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer,
	"blog_title" text NOT NULL,
	"message" text NOT NULL,
	"status" text DEFAULT 'pending',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_report" ADD CONSTRAINT "blog_report_blog_id_blog_table_blog_id_fk" FOREIGN KEY ("blog_id") REFERENCES "blog_table"("blog_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session_report" ADD CONSTRAINT "session_report_session_id_session_table_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "session_table"("session_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
