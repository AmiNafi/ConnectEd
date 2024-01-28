ALTER TABLE "course_table" ALTER COLUMN "session_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "follow_table" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "follow_table" ALTER COLUMN "followee_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "friend_request_table" ALTER COLUMN "sender_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "friend_request_table" ALTER COLUMN "receiver_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "friend_table" ALTER COLUMN "user1_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "friend_table" ALTER COLUMN "user2_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "group_table" ALTER COLUMN "creator_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "lecture_table" ALTER COLUMN "course_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "link_table" ALTER COLUMN "course_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "member_table" ALTER COLUMN "group_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "member_table" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "note_table" ALTER COLUMN "course_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "resource_table" ALTER COLUMN "course_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "session_table" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "task_table" ALTER COLUMN "course_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_achievement_table" ALTER COLUMN "acheivement_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_achievement_table" ALTER COLUMN "user_id" SET NOT NULL;