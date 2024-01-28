ALTER TABLE "session_table" ALTER COLUMN "visibility" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "session_table" ALTER COLUMN "visibility" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "session_table" ALTER COLUMN "image_link" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "session_table" ADD COLUMN "tags" text[];--> statement-breakpoint
ALTER TABLE "session_table" ADD COLUMN "theme" text NOT NULL;