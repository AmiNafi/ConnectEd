CREATE TABLE IF NOT EXISTS "chat_notification" (
	"id" serial PRIMARY KEY NOT NULL,
	"user1_id" integer NOT NULL,
	"user2_id" integer NOT NULL,
	"user1_name" text,
	"user1_image" text,
	"user2_name" text,
	"user2_image" text,
	"status" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chat_notification" ADD CONSTRAINT "chat_notification_user1_id_user_table_user_id_fk" FOREIGN KEY ("user1_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chat_notification" ADD CONSTRAINT "chat_notification_user2_id_user_table_user_id_fk" FOREIGN KEY ("user2_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
