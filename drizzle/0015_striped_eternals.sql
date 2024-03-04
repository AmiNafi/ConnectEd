CREATE TABLE IF NOT EXISTS "chat_table" (
	"message_id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"other_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"user_name" text NOT NULL,
	"image_link" text NOT NULL,
	"message" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chat_table" ADD CONSTRAINT "chat_table_other_id_user_table_user_id_fk" FOREIGN KEY ("other_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chat_table" ADD CONSTRAINT "chat_table_user_id_user_table_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
