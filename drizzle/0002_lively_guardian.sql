CREATE TABLE IF NOT EXISTS "blog_comment_table" (
	"comment_id" serial PRIMARY KEY NOT NULL,
	"blog_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"user_name" text NOT NULL,
	"image_link" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_comment_table" ADD CONSTRAINT "blog_comment_table_blog_id_blog_table_blog_id_fk" FOREIGN KEY ("blog_id") REFERENCES "blog_table"("blog_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_comment_table" ADD CONSTRAINT "blog_comment_table_user_id_user_table_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
