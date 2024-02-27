CREATE TABLE IF NOT EXISTS "group_chat_table" (
	"message_id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"group_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"user_name" text NOT NULL,
	"image_link" text NOT NULL,
	"message" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "blog_vote_table" ALTER COLUMN "vote" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_chat_table" ADD CONSTRAINT "group_chat_table_group_id_group_table_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "group_table"("group_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_chat_table" ADD CONSTRAINT "group_chat_table_user_id_user_table_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
