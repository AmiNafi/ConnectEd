ALTER TABLE "request_table" ALTER COLUMN "data" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "accepted_table" ADD COLUMN "user_name" text NOT NULL;