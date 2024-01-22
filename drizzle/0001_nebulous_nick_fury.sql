ALTER TABLE "user_table" ALTER COLUMN "inbox_setting" SET DEFAULT 'public';--> statement-breakpoint
ALTER TABLE "user_table" ALTER COLUMN "inbox_setting" DROP NOT NULL;