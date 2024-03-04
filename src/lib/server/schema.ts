import {
	pgTable,
	serial,
	text,
	boolean,
	integer,
	json,
	timestamp,
	primaryKey
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { number } from 'zod';

/*
Tables
----------------
1. userTable
2. sessionTable
3. courseTable
4. lectureTable
5. linkTable
6. resourceTable
7. noteTable
8. taskTable
9. achievementTable
10. userAchievementTable
11. groupTable
12. memberTable
13. friendRequestTable
14. friendTable
15. followTable
16. blogTable
17. sessionVoteTable
18. sessionFavTable
19. sessionVoteTable
20. sessionFavTable
*/

export type user = typeof userTable.$inferInsert;
export type session = typeof sessionTable.$inferInsert;
export type course = typeof courseTable.$inferInsert;
export type lecture = typeof lectureTable.$inferInsert;
export type link = typeof linkTable.$inferInsert;
export type resource = typeof resourceTable.$inferInsert;
export type note = typeof noteTable.$inferInsert;
export type task = typeof taskTable.$inferInsert;
export type achievement = typeof achievementTable.$inferInsert;
export type userAchievement = typeof userAchievementTable.$inferInsert;
export type group = typeof groupTable.$inferInsert;
export type member = typeof memberTable.$inferInsert;
export type friendRequest = typeof friendRequestTable.$inferInsert;
export type friend = typeof friendTable.$inferInsert;
export type follow = typeof followTable.$inferInsert;
export type blog = typeof blogTable.$inferInsert;
export type sessionVote = typeof sessionVoteTable.$inferInsert;
export type sessionFav = typeof sessionFavTable.$inferInsert;
export type blogVote = typeof blogVoteTable.$inferInsert;
export type blogFav = typeof blogFavTable.$inferInsert;
export type blogComment = typeof blogCommentTable.$inferInsert;
export type request = typeof requestTable.$inferInsert;
export type CN = typeof chatNotification.$inferInsert
export type groupResource = typeof groupResourceTable.$inferInsert;
export type bg = typeof blogReportTable.$inferInsert
export type sg = typeof sessionReportTable.$inferInsert

export const userTable = pgTable('user_table', {
	userId: serial('user_id').primaryKey(),
	userName: text('user_name').notNull(),
	email: text('email').notNull(),
	level: integer('level').default(0),
	experience: integer('experience').default(0),
	imageLink: text('image_link').notNull(),
	inboxSetting: text('inbox_setting').default('public'),
	userType: integer('user_type').default(0),
	isBanned: boolean('is_banned').default(false),
	facebook: text('facebook'),
	twitter: text('twitter'),
	linkedin: text('linkedin'),
	github: text('github'),
	createdAt: timestamp('created_at').defaultNow()
});

export const sessionTable = pgTable('session_table', {
	sessionId: serial('session_id').primaryKey(),
	userId: integer('user_id')
		.references(() => userTable.userId, { onDelete: 'cascade' })
		.notNull(),
	sessionName: text('session_name').notNull(),
	description: text('description'),
	visibility: text('visibility').notNull(),
	imageLink: text('image_link'),
	tags: text('tags').array(),
	theme: text('theme').notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export const courseTable = pgTable('course_table', {
	courseId: serial('course_id').primaryKey(),
	sessionId: integer('session_id')
		.references(() => sessionTable.sessionId, {
			onDelete: 'cascade'
		})
		.notNull(),
	courseName: text('course_name').notNull(),
	description: text('description'),
	isLock: boolean('is_lock').default(false),
	imageLink: text('image_link'),
	tags: text('tags').array(),
	theme: text('theme').notNull(),
	instructor: text('instructor'),
	createdAt: timestamp('created_at').defaultNow()
});

export const lectureTable = pgTable('lecture_table', {
	lectureId: serial('lecture_id').primaryKey(),
	courseId: integer('course_id')
		.references(() => courseTable.courseId, { onDelete: 'cascade' })
		.notNull(),
	lectureName: text('lecture_name').notNull(),
	description: text('description'),
	lectureLink: text('lecture_link').notNull(),
	savedName: text('saved_name').notNull(),
	fileType: text('file_type').notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export const linkTable = pgTable('link_table', {
	linkId: serial('link_id').primaryKey(),
	courseId: integer('course_id')
		.references(() => courseTable.courseId, { onDelete: 'cascade' })
		.notNull(),
	linkName: text('link_name').notNull(),
	description: text('description'),
	link: text('link').notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export const resourceTable = pgTable('resource_table', {
	resourceId: serial('resource_id').primaryKey(),
	courseId: integer('course_id')
		.references(() => courseTable.courseId, { onDelete: 'cascade' })
		.notNull(),
	resourceName: text('resource_name').notNull(),
	description: text('description'),
	resourceLink: text('resource_link').notNull(),
	savedName: text('saved_name').notNull(),
	fileType: text('file_type').notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export const groupResourceTable = pgTable('group_resource_table', {
	resourceId: serial('resource_id').primaryKey(),
	groupId: integer('group_id')
		.references(() => groupTable.groupId, { onDelete: 'cascade' })
		.notNull(),
	resourceName: text('resource_name').notNull(),
	description: text('description'),
	resourceLink: text('resource_link').notNull(),
	savedName: text('saved_name').notNull(),
	fileType: text('file_type').notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export const noteTable = pgTable('note_table', {
	noteId: serial('note_id').primaryKey(),
	courseId: integer('course_id')
		.references(() => courseTable.courseId, { onDelete: 'cascade' })
		.notNull(),
	noteName: text('note_name').notNull(),
	noteContent: text('note_content').notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export const taskTable = pgTable('task_table', {
	taskId: serial('task_id').primaryKey(),
	courseId: integer('course_id')
		.references(() => courseTable.courseId, { onDelete: 'cascade' })
		.notNull(),
	taskName: text('task_name').notNull(),
	description: text('description'),
	deadline: timestamp('deadline').notNull(),
	reminder: timestamp('deadline'),
	status: text('status').default('pending'),
	createdAt: timestamp('created_at').defaultNow()
});

export const achievementTable = pgTable('achievement_table', {
	achievementId: serial('acheivement_id').primaryKey(),
	achievementName: text('achievement_name').notNull(),
	description: text('description').notNull(),
	condition: json('condition').notNull(),
	expReward: integer('exp_reward').notNull()
});

export const userAchievementTable = pgTable(
	'user_achievement_table',
	{
		achievementId: integer('acheivement_id')
			.references(() => achievementTable.achievementId, {
				onDelete: 'cascade'
			})
			.notNull(),
		userId: integer('user_id')
			.references(() => userTable.userId, { onDelete: 'cascade' })
			.notNull(),
		completedAt: timestamp('completed_at').defaultNow()
	},
	(table) => {
		return {
			// pk: primaryKey({ columns: [table.achievementId, table.userId] }),
			userAchievementId: primaryKey({
				name: 'user_achievement_id',
				columns: [table.achievementId, table.userId]
			})
		};
	}
);

export const groupTable = pgTable('group_table', {
	groupId: serial('group_id').primaryKey(),
	creatorId: integer('creator_id')
		.references(() => userTable.userId, { onDelete: 'cascade' })
		.notNull(),
	groupName: text('group_name').notNull(),
	description: text('description'),
	password: text('password').notNull(),
	imageLink: text('image_link').notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export const memberTable = pgTable(
	'member_table',
	{
		groupId: integer('group_id')
			.references(() => groupTable.groupId, { onDelete: 'cascade' })
			.notNull(),
		userId: integer('user_id')
			.references(() => userTable.userId, { onDelete: 'cascade' })
			.notNull(),
		joinedAt: timestamp('joined_at').defaultNow()
	},
	(table) => {
		return {
			// pk: primaryKey({columns: [table.groupId, table.userId] }),
			groupMemberId: primaryKey({
				name: 'group_member_id',
				columns: [table.groupId, table.userId]
			})
		};
	}
);

export const friendRequestTable = pgTable(
	'friend_request_table',
	{
		senderId: integer('sender_id')
			.references(() => userTable.userId, { onDelete: 'cascade' })
			.notNull(),
		receiverId: integer('receiver_id')
			.references(() => userTable.userId, { onDelete: 'cascade' })
			.notNull(),
		senderName: text('sender_name'),
		senderImage: text('sender_image'),
		receiverName: text('receiver_name'),
		receiverImage: text('receiver_image'),
		sentAt: timestamp('sent_at').defaultNow()
	},
	(table) => {
		return {
			// pk: primaryKey({columns: [table.senderId, table.receiverId]}),
			friendRequestId: primaryKey({
				name: 'friend_request_id',
				columns: [table.senderId, table.receiverId]
			})
		};
	}
);

export const friendTable = pgTable(
	'friend_table',
	{
		user1Id: integer('user1_id')
			.references(() => userTable.userId, { onDelete: 'cascade' })
			.notNull(),
		user2Id: integer('user2_id')
			.references(() => userTable.userId, { onDelete: 'cascade' })
			.notNull(),
		user1Name: text('user1_name'),
		user1Image: text('user1_image'),
		user2Name: text('user2_name'),
		user2Image: text('user2_image'),
		createdAt: timestamp('created_at').defaultNow()
	},
	(table) => {
		return {
			friendId: primaryKey({
				name: 'friend_id',
				columns: [table.user1Id, table.user2Id]
			})
		};
	}
);

export const followTable = pgTable(
	'follow_table',
	{
		userId: integer('user_id')
			.references(() => userTable.userId, { onDelete: 'cascade' })
			.notNull(),
		followeeId: integer('followee_id')
			.references(() => userTable.userId, { onDelete: 'cascade' })
			.notNull(),
		createdAt: timestamp('created_at').defaultNow()
	},
	(table) => {
		return {
			followId: primaryKey({
				name: 'follow_id',
				columns: [table.userId, table.followeeId]
			})
		};
	}
);

export const blogTable = pgTable('blog_table', {
	blogId: serial('blog_id').primaryKey(),
	writerId: integer('writer_id')
		.references(() => userTable.userId, { onDelete: 'cascade' })
		.notNull(),
	blogTitle: text('blog_title').notNull(),
	blogContent: text('blog_content').notNull(),
	tags: text('tags').array(),
	upvote: integer('upvote').default(0),
	createdAt: timestamp('created_at').defaultNow()
});

export const sessionVoteTable = pgTable(
	'session_vote_table',
	{
		sessionId: integer('session_id')
			.references(() => sessionTable.sessionId, { onDelete: 'cascade' })
			.notNull(),
		userId: integer('user_id')
			.references(() => userTable.userId, { onDelete: 'cascade' })
			.notNull(),
		createdAt: timestamp('created_at').defaultNow()
	},
	(table) => {
		return {
			// pk: primaryKey({columns: [table.groupId, table.userId] }),
			sessionVoteId: primaryKey({
				name: 'session_vote_id',
				columns: [table.userId, table.sessionId]
			})
		};
	}
);

export const sessionFavTable = pgTable(
	'session_fav_table',
	{
		sessionId: integer('session_id')
			.references(() => sessionTable.sessionId, { onDelete: 'cascade' })
			.notNull(),
		userId: integer('user_id')
			.references(() => userTable.userId, { onDelete: 'cascade' })
			.notNull(),
		createdAt: timestamp('created_at').defaultNow()
	},
	(table) => {
		return {
			// pk: primaryKey({columns: [table.groupId, table.userId] }),
			sessionFavId: primaryKey({
				name: 'session_fav_id',
				columns: [table.userId, table.sessionId]
			})
		};
	}
);

export const blogVoteTable = pgTable(
	'blog_vote_table',
	{
		blogId: integer('blog_id')
			.references(() => blogTable.blogId, { onDelete: 'cascade' })
			.notNull(),
		userId: integer('user_id')
			.references(() => userTable.userId, { onDelete: 'cascade' })
			.notNull(),
		vote: integer('vote').notNull(),
		createdAt: timestamp('created_at').defaultNow()
	},
	(table) => {
		return {
			// pk: primaryKey({columns: [table.groupId, table.userId] }),
			blogVoteId: primaryKey({
				name: 'blog_vote_id',
				columns: [table.userId, table.blogId]
			})
		};
	}
);

export const blogFavTable = pgTable(
	'blog_fav_table',
	{
		blogId: integer('blog_id')
			.references(() => blogTable.blogId, { onDelete: 'cascade' })
			.notNull(),
		userId: integer('user_id')
			.references(() => userTable.userId, { onDelete: 'cascade' })
			.notNull(),
		createdAt: timestamp('created_at').defaultNow()
	},
	(table) => {
		return {
			// pk: primaryKey({columns: [table.groupId, table.userId] }),
			blogFavId: primaryKey({
				name: 'blog_fav_id',
				columns: [table.userId, table.blogId]
			})
		};
	}
);

export const blogCommentTable = pgTable('blog_comment_table', {
	commentId: serial('comment_id').primaryKey(),
	blogId: integer('blog_id')
		.references(() => blogTable.blogId, { onDelete: 'cascade' })
		.notNull(),
	userId: integer('user_id')
		.references(() => userTable.userId, { onDelete: 'cascade' })
		.notNull(),
	comment: text('comment').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	userName: text('user_name').notNull(),
	imageLink: text('image_link').notNull()
});

export const requestTable = pgTable('request_table', {
	requestId: serial('request_id').primaryKey(),
	userId: integer('user_id')
		.references(() => userTable.userId, { onDelete: 'cascade' })
		.notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	title: text('title').notNull(),
	description: text('description').notNull(),
	userName: text('user_name').notNull(),
	tags: text('tags').array(),
	date: text('data')
});

export const acceptedTable = pgTable('accepted_table', {
	acceptedId: serial('accepted_id').primaryKey(),
	from: integer('user1_id')
		.references(() => userTable.userId, { onDelete: 'cascade' })
		.notNull(),
	to: integer('user2_id')
		.references(() => userTable.userId, { onDelete: 'cascade' })
		.notNull(),
	userName: text('user_name').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	title: text('title').notNull(),
	description: text('description').notNull(),
	tags: text('tags').array(),
	date: text('data').notNull()
});

/*
	Realtime Tables
*/

export const groupChatTable = pgTable('group_chat_table', {
	messageId: serial('message_id').primaryKey(),
	createdAt: timestamp('created_at').defaultNow(),
	groupId: integer('group_id')
		.references(() => groupTable.groupId, { onDelete: 'cascade' })
		.notNull(),
	userId: integer('user_id')
		.references(() => userTable.userId, { onDelete: 'cascade' })
		.notNull(),
	userName: text('user_name').notNull(),
	imageLink: text('image_link').notNull(),
	message: text('message').notNull()
});

export const chatTable = pgTable('chat_table', {
	messageId: serial('message_id').primaryKey(),
	index: integer('index').notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	otherId: integer('other_id')
		.references(() => userTable.userId, { onDelete: 'cascade' })
		.notNull(),
	userId: integer('user_id')
		.references(() => userTable.userId, { onDelete: 'cascade' })
		.notNull(),
	userName: text('user_name').notNull(),
	imageLink: text('image_link').notNull(),
	message: text('message').notNull()
});

export const chatNotification = pgTable('chat_notification', {
	id: serial('id').primaryKey(),
	user1Id: integer('user1_id')
		.references(() => userTable.userId, { onDelete: 'cascade' })
		.notNull(),
	user2Id: integer('user2_id')
	.references(() => userTable.userId, { onDelete: 'cascade' })
	.notNull(),
	user1Name: text('user1_name'),
	user2Name: text('user2_name'),
	user1Image: text('user1_image'),
	user2Image: text('user2_image'),
	status: text('status'),
	createdAt: timestamp('created_at').defaultNow(),

})

export const blogReportTable = pgTable('blog_report',{
	reportId: serial('id').primaryKey(),
	blogId: integer('blog_id').references(()=>blogTable.blogId, {onDelete: 'cascade'}),
	blogTitle: text('blog_title').notNull(),
	message:text('message').notNull(),
	status:text('status').default("pending"),
	createdAt: timestamp('created_at').defaultNow(),
})

export const sessionReportTable = pgTable('session_report',{
	reportId: serial('id').primaryKey(),
	sessionId: integer('session_id').references(()=>sessionTable.sessionId, {onDelete: 'cascade'}),
	sessionName: text('blog_title').notNull(),
	message:text('message').notNull(),
	status:text('status').default("pending"),
	createdAt: timestamp('created_at').defaultNow(),
})

/*
	Relationships  
*/

export const userRelationships = relations(userTable, ({ many }) => ({
	sessions: many(sessionTable),
	blogs: many(blogTable),
	sessionVotes: many(sessionVoteTable),
	sessionFavs: many(sessionFavTable),
	blogVotes: many(blogVoteTable),
	blogFavs: many(blogFavTable)
	// groups: many(groupTable)
}));

export const sessionRelationships = relations(sessionTable, ({ one, many }) => ({
	user: one(userTable, {
		fields: [sessionTable.userId],
		references: [userTable.userId]
	}),
	courses: many(courseTable),
	sessionVotes: many(sessionVoteTable),
	sessionFavs: many(sessionFavTable)
}));

export const courseRelationships = relations(courseTable, ({ one, many }) => ({
	session: one(sessionTable, {
		fields: [courseTable.sessionId],
		references: [sessionTable.sessionId]
	}),
	lectures: many(lectureTable),
	resources: many(resourceTable),
	links: many(linkTable),
	notes: many(noteTable)
}));

export const lectureRelationships = relations(lectureTable, ({ one }) => ({
	course: one(courseTable, {
		fields: [lectureTable.courseId],
		references: [courseTable.courseId]
	})
}));

export const resourceRelationships = relations(resourceTable, ({ one }) => ({
	course: one(courseTable, {
		fields: [resourceTable.courseId],
		references: [courseTable.courseId]
	})
}));

export const linkRelationships = relations(linkTable, ({ one }) => ({
	course: one(courseTable, {
		fields: [linkTable.courseId],
		references: [courseTable.courseId]
	})
}));

export const noteRelationships = relations(noteTable, ({ one }) => ({
	course: one(courseTable, {
		fields: [noteTable.courseId],
		references: [courseTable.courseId]
	})
}));

export const blogRelationships = relations(blogTable, ({ many, one }) => ({
	writer: one(userTable, {
		fields: [blogTable.writerId],
		references: [userTable.userId]
	}),
	blogVotes: many(blogVoteTable),
	blogFavs: many(blogFavTable)
}));

export const sessionVoteRelationship = relations(sessionVoteTable, ({ one }) => ({
	voter: one(userTable, {
		fields: [sessionVoteTable.userId],
		references: [userTable.userId]
	}),
	session: one(sessionTable, {
		fields: [sessionVoteTable.sessionId],
		references: [sessionTable.sessionId]
	})
}));

export const sessionFavRelationship = relations(sessionFavTable, ({ one }) => ({
	faver: one(userTable, {
		fields: [sessionFavTable.userId],
		references: [userTable.userId]
	}),
	session: one(sessionTable, {
		fields: [sessionFavTable.sessionId],
		references: [sessionTable.sessionId]
	})
}));

export const blogVoteRelationship = relations(blogVoteTable, ({ one }) => ({
	voter: one(userTable, {
		fields: [blogVoteTable.userId],
		references: [userTable.userId]
	}),
	blog: one(blogTable, {
		fields: [blogVoteTable.blogId],
		references: [blogTable.blogId]
	})
}));

export const blogFavRelationship = relations(blogFavTable, ({ one }) => ({
	faver: one(userTable, {
		fields: [blogFavTable.userId],
		references: [userTable.userId]
	}),
	blog: one(blogTable, {
		fields: [blogFavTable.blogId],
		references: [blogTable.blogId]
	})
}));

export const groupRelationship = relations(groupTable, ({ many }) => ({
	// members: many(userTable)
}));

export const memberRelationship = relations(memberTable, ({ one }) => ({
	group: one(groupTable, {
		fields: [memberTable.groupId],
		references: [groupTable.groupId]
	}),
	member: one(userTable, {
		fields: [memberTable.userId],
		references: [userTable.userId]
	})
}));
