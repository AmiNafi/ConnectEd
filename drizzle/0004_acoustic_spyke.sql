CREATE TABLE IF NOT EXISTS "accepted_table" (
	"accepted_id" serial PRIMARY KEY NOT NULL,
	"user1_id" integer NOT NULL,
	"user2_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"title" text NOT NULL,
	"description" text NOT NULL,
	"tags" text[],
	"data" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "request_table" (
	"request_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"title" text NOT NULL,
	"description" text NOT NULL,
	"tags" text[],
	"data" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accepted_table" ADD CONSTRAINT "accepted_table_user1_id_user_table_user_id_fk" FOREIGN KEY ("user1_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accepted_table" ADD CONSTRAINT "accepted_table_user2_id_user_table_user_id_fk" FOREIGN KEY ("user2_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "request_table" ADD CONSTRAINT "request_table_user_id_user_table_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
