ALTER TABLE "user_table" ADD COLUMN "facebook" text;--> statement-breakpoint
ALTER TABLE "user_table" ADD COLUMN "twitter" text;--> statement-breakpoint
ALTER TABLE "user_table" ADD COLUMN "linkedin" text;--> statement-breakpoint
ALTER TABLE "user_table" ADD COLUMN "instagram" text;--> statement-breakpoint
ALTER TABLE "user_table" DROP COLUMN IF EXISTS "social_links";