CREATE TABLE IF NOT EXISTS "blog_fav_table" (
	"blog_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "blog_fav_id" PRIMARY KEY("user_id","blog_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blog_vote_table" (
	"blog_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "blog_vote_id" PRIMARY KEY("user_id","blog_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_fav_table" ADD CONSTRAINT "blog_fav_table_blog_id_blog_table_blog_id_fk" FOREIGN KEY ("blog_id") REFERENCES "blog_table"("blog_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_fav_table" ADD CONSTRAINT "blog_fav_table_user_id_user_table_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_vote_table" ADD CONSTRAINT "blog_vote_table_blog_id_blog_table_blog_id_fk" FOREIGN KEY ("blog_id") REFERENCES "blog_table"("blog_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_vote_table" ADD CONSTRAINT "blog_vote_table_user_id_user_table_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
