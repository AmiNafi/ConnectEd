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
	socialLinks: json('social_links'),
	createdAt: timestamp('created_at').defaultNow()
});

export const sessionTable = pgTable('session_table', {
	sessionId: serial('session_id').primaryKey(),
	userId: integer('user_id').references(() => userTable.userId, { onDelete: 'cascade' }).notNull(),
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
	sessionId: integer('session_id').references(() => sessionTable.sessionId, {
		onDelete: 'cascade'
	}).notNull(),
	courseName: text('course_name').notNull(),
	description: text('description'),
	isLock: boolean('is_lock').default(false),
	imageLink: text('image_link'),
	tags: text('tags').array(),
	theme: text('theme').notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export const lectureTable = pgTable('lecture_table', {
	lectureId: serial('lecture_id').primaryKey(),
	courseId: integer('course_id').references(() => courseTable.courseId, { onDelete: 'cascade' }).notNull(),
	lectureName: text('lecture_name').notNull(),
	description: text('description'),
	lectureLink: text('lecture_link').notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export const linkTable = pgTable('link_table', {
	linkId: serial('link_id').primaryKey(),
	courseId: integer('course_id').references(() => courseTable.courseId, { onDelete: 'cascade' }).notNull(),
	linkName: text('link_name').notNull(),
	description: text('description'),
	link: text('link').notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export const resourceTable = pgTable('resource_table', {
	resourceId: serial('resource_id').primaryKey(),
	courseId: integer('course_id').references(() => courseTable.courseId, { onDelete: 'cascade' }).notNull(),
	resourceName: text('resource_name').notNull(),
	description: text('description'),
	resourceLink: text('resource_link').notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export const noteTable = pgTable('note_table', {
	noteId: serial('note_id').primaryKey(),
	courseId: integer('course_id').references(() => courseTable.courseId, { onDelete: 'cascade' }).notNull(),
	noteName: text('note_name').notNull(),
	noteContent: text('note_content').notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export const taskTable = pgTable('task_table', {
	taskId: serial('text_id').primaryKey(),
	courseId: integer('course_id').references(() => courseTable.courseId, { onDelete: 'cascade' }).notNull(),
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
		achievementId: integer('acheivement_id').references(() => achievementTable.achievementId, {
			onDelete: 'cascade'
		}).notNull(),
		userId: integer('user_id').references(() => userTable.userId, { onDelete: 'cascade' }).notNull(),
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
	creatorId: integer('creator_id').references(() => userTable.userId, { onDelete: 'cascade' }).notNull(),
	groupName: text('group_name').notNull(),
	description: text('description'),
	password: text('password').notNull(),
	imageLink: text('image_link').notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export const memberTable = pgTable(
	'member_table',
	{
		groupId: integer('group_id').references(() => groupTable.groupId, { onDelete: 'cascade' }).notNull(),
		userId: integer('user_id').references(() => userTable.userId, { onDelete: 'cascade' }).notNull(),
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
		senderId: integer('sender_id').references(() => userTable.userId, { onDelete: 'cascade' }).notNull(),
		receiverId: integer('receiver_id').references(() => userTable.userId, { onDelete: 'cascade' }).notNull(),
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

export const friendTable = pgTable('friend_table', {
    user1Id: integer('user1_id').references(() => userTable.userId, { onDelete: 'cascade' }).notNull(),
	user2Id: integer('user2_id').references(() => userTable.userId, { onDelete: 'cascade' }).notNull(),
	createdAt: timestamp('created_at').defaultNow()
},(table) => {
    return {
        friendId: primaryKey({
            name: 'friend_id',
            columns: [table.user1Id, table.user2Id]
        })
    };
});

export const followTable = pgTable('follow_table', {
    userId: integer('user_id').references(() => userTable.userId, { onDelete: 'cascade' }).notNull(),
	followeeId: integer('followee_id').references(() => userTable.userId, { onDelete: 'cascade' }).notNull(),
	createdAt: timestamp('created_at').defaultNow()
},(table) => {
    return {
        followId: primaryKey({
            name: 'follow_id',
            columns: [table.userId, table.followeeId]
        })
    };
});


/*
	Relationships  
*/

export const userRelationships = relations(userTable, ({many})=>({
    sessions: many(sessionTable),
}))

export const sessionRelationships = relations(sessionTable, ({one, many}) =>({
    user: one(userTable,{
        fields: [sessionTable.userId],
        references: [userTable.userId]
    }),
	courses: many(courseTable)
}))

export const courseRelationships = relations(courseTable, ({one, many})=>({
	session: one(sessionTable,{
		fields: [courseTable.sessionId],
		references: [sessionTable.sessionId]
	}),
	lectures: many(lectureTable),
	resources: many(resourceTable),
	links: many(linkTable),
	notes: many(noteTable)
}))

export const lectureRelationships = relations(lectureTable, ({one})=>({
	lecture: one(courseTable,{
		fields: [lectureTable.courseId],
		references: [courseTable.courseId]
	})
}))

export const resourceRelationships = relations(resourceTable, ({one})=>({
	resources: one(courseTable,{
		fields: [resourceTable.courseId],
		references: [courseTable.courseId]
	})
}))

export const linkRelationships = relations(linkTable, ({one})=>({
	links: one(courseTable,{
		fields: [linkTable.courseId],
		references: [courseTable.courseId]
	})
}))

export const noteRelationships = relations(noteTable, ({one})=>({
	notes: one(courseTable,{
		fields: [noteTable.courseId],
		references: [courseTable.courseId]
	})
}))