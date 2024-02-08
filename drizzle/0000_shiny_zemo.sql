CREATE TABLE IF NOT EXISTS "achievement_table" (
	"acheivement_id" serial PRIMARY KEY NOT NULL,
	"achievement_name" text NOT NULL,
	"description" text NOT NULL,
	"condition" json NOT NULL,
	"exp_reward" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blog_table" (
	"blog_id" serial PRIMARY KEY NOT NULL,
	"writer_id" integer NOT NULL,
	"blog_title" text NOT NULL,
	"blog_content" text NOT NULL,
	"tags" text[],
	"upvote" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_table" (
	"course_id" serial PRIMARY KEY NOT NULL,
	"session_id" integer NOT NULL,
	"course_name" text NOT NULL,
	"description" text,
	"is_lock" boolean DEFAULT false,
	"image_link" text,
	"tags" text[],
	"theme" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "follow_table" (
	"user_id" integer NOT NULL,
	"followee_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "follow_id" PRIMARY KEY("user_id","followee_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "friend_request_table" (
	"sender_id" integer NOT NULL,
	"receiver_id" integer NOT NULL,
	"sent_at" timestamp DEFAULT now(),
	CONSTRAINT "friend_request_id" PRIMARY KEY("sender_id","receiver_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "friend_table" (
	"user1_id" integer NOT NULL,
	"user2_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "friend_id" PRIMARY KEY("user1_id","user2_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "group_table" (
	"group_id" serial PRIMARY KEY NOT NULL,
	"creator_id" integer NOT NULL,
	"group_name" text NOT NULL,
	"description" text,
	"password" text NOT NULL,
	"image_link" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lecture_table" (
	"lecture_id" serial PRIMARY KEY NOT NULL,
	"course_id" integer NOT NULL,
	"lecture_name" text NOT NULL,
	"description" text,
	"lecture_link" text NOT NULL,
	"saved_name" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "link_table" (
	"link_id" serial PRIMARY KEY NOT NULL,
	"course_id" integer NOT NULL,
	"link_name" text NOT NULL,
	"description" text,
	"link" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "member_table" (
	"group_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"joined_at" timestamp DEFAULT now(),
	CONSTRAINT "group_member_id" PRIMARY KEY("group_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "note_table" (
	"note_id" serial PRIMARY KEY NOT NULL,
	"course_id" integer NOT NULL,
	"note_name" text NOT NULL,
	"note_content" text NOT NULL,
	"saved_name" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resource_table" (
	"resource_id" serial PRIMARY KEY NOT NULL,
	"course_id" integer NOT NULL,
	"resource_name" text NOT NULL,
	"description" text,
	"resource_link" text NOT NULL,
	"saved_name" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session_fav_table" (
	"session_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "session_fav_id" PRIMARY KEY("user_id","session_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session_table" (
	"session_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"session_name" text NOT NULL,
	"description" text,
	"visibility" text NOT NULL,
	"image_link" text,
	"tags" text[],
	"theme" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session_vote_table" (
	"session_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "session_vote_id" PRIMARY KEY("user_id","session_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task_table" (
	"task_id" serial PRIMARY KEY NOT NULL,
	"course_id" integer NOT NULL,
	"task_name" text NOT NULL,
	"description" text,
	"deadline" timestamp,
	"status" text DEFAULT 'pending',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_achievement_table" (
	"acheivement_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"completed_at" timestamp DEFAULT now(),
	CONSTRAINT "user_achievement_id" PRIMARY KEY("acheivement_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_table" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"user_name" text NOT NULL,
	"email" text NOT NULL,
	"level" integer DEFAULT 0,
	"experience" integer DEFAULT 0,
	"image_link" text NOT NULL,
	"inbox_setting" text DEFAULT 'public',
	"user_type" integer DEFAULT 0,
	"is_banned" boolean DEFAULT false,
	"social_links" json,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_table" ADD CONSTRAINT "blog_table_writer_id_user_table_user_id_fk" FOREIGN KEY ("writer_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course_table" ADD CONSTRAINT "course_table_session_id_session_table_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "session_table"("session_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "follow_table" ADD CONSTRAINT "follow_table_user_id_user_table_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "follow_table" ADD CONSTRAINT "follow_table_followee_id_user_table_user_id_fk" FOREIGN KEY ("followee_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friend_request_table" ADD CONSTRAINT "friend_request_table_sender_id_user_table_user_id_fk" FOREIGN KEY ("sender_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friend_request_table" ADD CONSTRAINT "friend_request_table_receiver_id_user_table_user_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friend_table" ADD CONSTRAINT "friend_table_user1_id_user_table_user_id_fk" FOREIGN KEY ("user1_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friend_table" ADD CONSTRAINT "friend_table_user2_id_user_table_user_id_fk" FOREIGN KEY ("user2_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_table" ADD CONSTRAINT "group_table_creator_id_user_table_user_id_fk" FOREIGN KEY ("creator_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lecture_table" ADD CONSTRAINT "lecture_table_course_id_course_table_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "course_table"("course_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "link_table" ADD CONSTRAINT "link_table_course_id_course_table_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "course_table"("course_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "member_table" ADD CONSTRAINT "member_table_group_id_group_table_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "group_table"("group_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "member_table" ADD CONSTRAINT "member_table_user_id_user_table_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "note_table" ADD CONSTRAINT "note_table_course_id_course_table_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "course_table"("course_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resource_table" ADD CONSTRAINT "resource_table_course_id_course_table_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "course_table"("course_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session_fav_table" ADD CONSTRAINT "session_fav_table_session_id_session_table_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "session_table"("session_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session_fav_table" ADD CONSTRAINT "session_fav_table_user_id_user_table_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session_table" ADD CONSTRAINT "session_table_user_id_user_table_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session_vote_table" ADD CONSTRAINT "session_vote_table_session_id_session_table_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "session_table"("session_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session_vote_table" ADD CONSTRAINT "session_vote_table_user_id_user_table_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_table" ADD CONSTRAINT "task_table_course_id_course_table_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "course_table"("course_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_achievement_table" ADD CONSTRAINT "user_achievement_table_acheivement_id_achievement_table_acheivement_id_fk" FOREIGN KEY ("acheivement_id") REFERENCES "achievement_table"("acheivement_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_achievement_table" ADD CONSTRAINT "user_achievement_table_user_id_user_table_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
