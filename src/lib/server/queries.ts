import Upvote from '$lib/components/svg/upvote.svelte';
import db from './db';
import {
	userTable,
	sessionTable,
	courseTable,
	lectureTable,
	resourceTable,
	linkTable,
	blogTable,
	sessionFavTable,
	blogFavTable,
	blogVoteTable,
	blogCommentTable,
	requestTable,
	groupTable,
	memberTable,
	noteTable,
	friendRequestTable,
	friendTable
} from './schema';
import type {
	user,
	session,
	course,
	lecture,
	resource,
	link,
	note,
	blog,
	sessionFav,
	blogFav,
	blogVote,
	blogComment,
	request,
	group,
	member,
	friendRequest,
	friend
} from './schema';
import { eq, lt, gte, ne, inArray, and, or, sql } from 'drizzle-orm';

//User
export async function insertUser(newUser: user) {
	await db.insert(userTable).values(newUser);
}

export async function updateUser(newUser: user) {
	const tmp = await db.select().from(userTable).where(eq(userTable.userName, newUser.userName));

	if (tmp.length > 0 && tmp[0].userId != newUser.userId) {
		return {
			success: false,
			message: 'User with this name already exists'
		};
	}

	await db
		.update(userTable)
		.set({
			userName: newUser.userName,
			facebook: newUser.facebook,
			twitter: newUser.twitter,
			github: newUser.github,
			linkedin: newUser.linkedin
		})
		.where(eq(userTable.userId, newUser.userId!));

	return {
		success: true,
		message: 'User profile updated'
	};
}

export async function doesUserExist(newUser: user) {
	return (await db.select().from(userTable).where(eq(userTable.email, newUser.email))).length != 0;
}

export async function getUser(newUser: user) {
	return await db.query.userTable.findMany({
		where: eq(userTable.email, newUser.email),
		with: {
			sessions: {
				with: {
					courses: true
				}
			},
			blogs: true
		}
	});
}

export async function getUserFromId(userId: number) {
	return await db.query.userTable.findMany({
		where: eq(userTable.userId, userId),
		with: {
			sessions: {
				where: (sessions, { eq }) => eq(sessions.visibility, 'publish'),
				with: {
					courses: true,
					sessionFavs: {
						where: (sessionFavs, { eq }) => eq(sessionFavs.userId, userId),
						columns: {
							userId: true
						}
					}
				}
			},
			blogs: {
				columns: {
					blogId: true,
					writerId: true,
					blogTitle: true,
					createdAt: true,
					tags: true,
					upvote: true
				},
				with: {
					blogFavs: {
						where: (blogFavs, { eq }) => eq(blogFavs.userId, userId),
						columns: {
							userId: true
						}
					}
				}
			}
		}
	});
}

export async function getUserId(email: string) {
	const ret = await db.select().from(userTable).where(eq(userTable.email, email));
	return ret[0].userId;
}

//Session
export async function insertSession(newSession: session) {
	await db.insert(sessionTable).values(newSession);
}

export async function deleteSession(newSession: session) {
	await db.delete(sessionTable).where(eq(sessionTable.sessionId, newSession.sessionId!));
}

export async function getSession(newSession: session) {
	// console.log(newSession)
	return await db.query.sessionTable.findMany({
		where: eq(sessionTable.sessionId, newSession.sessionId!),
		with: {
			courses: true
		}
	});
}

export async function updateSession(newSession: session) {
	await db
		.update(sessionTable)
		.set({
			sessionName: newSession.sessionName,
			description: newSession.description,
			tags: newSession.tags,
			theme: newSession.theme,
			visibility: newSession.visibility
		})
		.where(eq(sessionTable.sessionId, newSession.sessionId!));
}

export async function searchSession(name: string, tag: string, userId: number) {
	if (name && tag) {
		const ret = await db.query.sessionTable.findMany({
			where: sql`
			LOWER(${sessionTable.sessionName}) LIKE LOWER('%'||${name}||'%') and
			${tag}=ANY(${sessionTable.tags}) and
			${sessionTable.visibility} LIKE 'publish'
					`,
			with: {
				user: true,
				courses: true,
				sessionFavs: {
					where: (sessionFavs, { eq }) => eq(sessionFavs.userId, userId),
					columns: {
						userId: true
					}
				}
			}
		});
		return ret;
	} else if (name) {
		const ret = await db.query.sessionTable.findMany({
			where: sql`
			LOWER(${sessionTable.sessionName}) LIKE LOWER('%'||${name}||'%') and
			${sessionTable.visibility} LIKE 'publish'
					`,
			with: {
				user: true,
				courses: true,
				sessionFavs: {
					where: (sessionFavs, { eq }) => eq(sessionFavs.userId, userId),
					columns: {
						userId: true
					}
				}
			}
		});
		return ret;
	} else if (tag) {
		const ret = await db.query.sessionTable.findMany({
			where: sql`
			${tag}=ANY(${sessionTable.tags}) and
			${sessionTable.visibility} LIKE 'publish'
					`,
			with: {
				user: true,
				courses: true,
				sessionFavs: {
					where: (sessionFavs, { eq }) => eq(sessionFavs.userId, userId),
					columns: {
						userId: true
					}
				}
			}
		});
		return ret;
	} else {
		const ret = await db.query.sessionTable.findMany({
			where: sql`
					${sessionTable.visibility} LIKE 'publish'
					`,
			with: {
				user: true,
				courses: true,
				sessionFavs: {
					where: (sessionFavs, { eq }) => eq(sessionFavs.userId, userId),
					columns: {
						userId: true
					}
				}
			}
		});
		return ret;
	}
}

//Course
export async function insertCourse(newCourse: course) {
	await db.insert(courseTable).values(newCourse);
}

export async function deleteCourse(newCourse: course) {
	await db.delete(courseTable).where(eq(courseTable.courseId, newCourse.courseId!));
}

export async function updateCourse(newCourse: course) {
	await db
		.update(courseTable)
		.set({
			courseName: newCourse.courseName,
			description: newCourse.description,
			tags: newCourse.tags,
			theme: newCourse.theme,
			isLock: newCourse.isLock
		})
		.where(eq(courseTable.courseId, newCourse.courseId!));
}

export async function getCourse(newCourse: course) {
	return await db.query.courseTable.findMany({
		where: eq(courseTable.courseId, newCourse.courseId!),
		with: {
			lectures: true,
			resources: true,
			links: true,
			notes: true
		}
	});
}

//Lecture
export async function insertLecture(newLecture: lecture) {
	await db.insert(lectureTable).values(newLecture);
}

export async function deleteLecture(newLecture: lecture) {
	await db.delete(lectureTable).where(eq(lectureTable.lectureId, newLecture.lectureId!));
}

export async function updateLecture(newLecture: lecture) {
	await db
		.update(lectureTable)
		.set({
			lectureName: newLecture.lectureName,
			description: newLecture.description,
			fileType: newLecture.fileType
		})
		.where(eq(lectureTable.lectureId, newLecture.lectureId!));
}

//Resource
export async function insertResource(newResource: resource) {
	await db.insert(resourceTable).values(newResource);
}

export async function deleteResource(newResource: resource) {
	await db.delete(resourceTable).where(eq(resourceTable.resourceId, newResource.resourceId!));
}

export async function updateResource(newResource: resource) {
	await db
		.update(resourceTable)
		.set({
			resourceName: newResource.resourceName,
			description: newResource.description,
			fileType: newResource.fileType
		})
		.where(eq(resourceTable.resourceId, newResource.resourceId!));
}

//Link
export async function insertLink(newLink: link) {
	await db.insert(linkTable).values(newLink);
}

export async function deleteLink(newLink: link) {
	await db.delete(linkTable).where(eq(linkTable.linkId, newLink.linkId!));
}

export async function updateLink(newLink: link) {
	await db
		.update(linkTable)
		.set({
			linkName: newLink.linkName,
			description: newLink.description,
			link: newLink.link
		})
		.where(eq(linkTable.linkId, newLink.linkId!));
}

//Note
export async function insertNote(newNote: note) {
	await db.insert(noteTable).values(newNote);
}

export async function deleteNote(newNote: note) {
	await db.delete(noteTable).where(eq(noteTable.noteId, newNote.noteId!));
}

export async function updateNote(newNote: note) {
	await db
		.update(noteTable)
		.set({
			noteName: newNote.noteName,
			noteContent: newNote.noteContent
		})
		.where(eq(noteTable.noteId, newNote.noteId!));
}

//Blogs
export async function insertBlog(newBlog: blog) {
	await db.insert(blogTable).values(newBlog);
}

export async function deleteBlog(newBlog: blog) {
	await db.delete(blogTable).where(eq(blogTable.blogId, newBlog.blogId!));
}

export async function getBlog(blogId: number, userId: number) {
	const ret = await db.query.blogTable.findMany({
		where: eq(blogTable.blogId, blogId),
		with: {
			blogVotes: {
				where: (blogVotes, { eq }) => eq(blogVotes.userId, userId),
				columns: {
					vote: true
				}
			}
		}
	});
	return ret;
}

export async function updateBlog(newBlog: blog) {
	await db
		.update(blogTable)
		.set({
			blogContent: newBlog.blogContent,
			blogTitle: newBlog.blogTitle,
			tags: newBlog.tags
		})
		.where(eq(blogTable.blogId, newBlog.blogId!));
}

export async function updateBlogVote(blogId: number, vote: number) {
	await db
		.update(blogTable)
		.set({
			upvote: sql`${blogTable.upvote}+${vote}`
		})
		.where(eq(blogTable.blogId, blogId));
}

export async function searchBlog(name: string, tag: string, userId: number) {
	if (name && tag) {
		const ret = await db.query.blogTable.findMany({
			where: sql`
			LOWER(${blogTable.blogTitle}) LIKE LOWER('%'||${name}||'%') and
			${tag}=ANY(${blogTable.tags})
			`,
			columns: {
				blogId: true,
				writerId: true,
				blogTitle: true,
				createdAt: true,
				tags: true,
				upvote: true
			},
			with: {
				writer: true,
				blogFavs: {
					where: (blogFavs, { eq }) => eq(blogFavs.userId, userId),
					columns: {
						userId: true
					}
				}
			}
		});
		return ret;
	} else if (name) {
		const ret = await db.query.blogTable.findMany({
			where: sql`
			LOWER(${blogTable.blogTitle}) LIKE LOWER('%'||${name}||'%')

			`,
			columns: {
				blogId: true,
				writerId: true,
				blogTitle: true,
				createdAt: true,
				tags: true,
				upvote: true
			},
			with: {
				writer: true,
				blogFavs: {
					where: (blogFavs, { eq }) => eq(blogFavs.userId, userId),
					columns: {
						userId: true
					}
				}
			}
		});
		return ret;
	} else if (tag) {
		const ret = await db.query.blogTable.findMany({
			where: sql`
			${tag}=ANY(${blogTable.tags})
			`,
			columns: {
				blogId: true,
				writerId: true,
				blogTitle: true,
				createdAt: true,
				tags: true,
				upvote: true
			},
			with: {
				writer: true,
				blogFavs: {
					where: (blogFavs, { eq }) => eq(blogFavs.userId, userId),
					columns: {
						userId: true
					}
				}
			}
		});
		return ret;
	} else {
		const ret = await db.query.blogTable.findMany({
			columns: {
				blogId: true,
				writerId: true,
				blogTitle: true,
				createdAt: true,
				tags: true,
				upvote: true
			},
			with: {
				writer: true,
				blogFavs: {
					where: (blogFavs, { eq }) => eq(blogFavs.userId, userId),
					columns: {
						userId: true
					}
				}
			}
		});
		return ret;
	}
}

//SessionFav
export async function favoriteSession(newSessionFav: sessionFav) {
	await db.insert(sessionFavTable).values(newSessionFav);
}

export async function unfavoriteSession(newSessionFav: sessionFav) {
	await db.delete(sessionFavTable).where(
		sql`
		${sessionFavTable.userId} = ${newSessionFav.userId} and
		${sessionFavTable.sessionId} = ${newSessionFav.sessionId}
		`
	);
}

export async function getFavoriteSession(userId: number) {
	// console.log(userId)
	return await db.query.sessionFavTable.findMany({
		where: eq(sessionFavTable.userId, userId),
		with: {
			session: {
				with: {
					courses: true,
					user: true
				}
			}
		}
	});
}

//BlogFav
export async function favoriteBlog(newBlogFav: blogFav) {
	await db.insert(blogFavTable).values(newBlogFav);
}

export async function unfavoriteBlog(newBlogFav: blogFav) {
	await db.delete(blogFavTable).where(
		sql`
		${blogFavTable.userId} = ${newBlogFav.userId} and
		${blogFavTable.blogId} = ${newBlogFav.blogId}
		`
	);
}

export async function getFavoriteBlog(userId: number) {
	// console.log(userId)
	return await db.query.blogFavTable.findMany({
		where: eq(blogFavTable.userId, userId),
		with: {
			blog: {
				with: {
					writer: true
				},
				columns: {
					blogId: true,
					blogTitle: true,
					createdAt: true,
					tags: true,
					upvote: true,
					writerId: true
				}
			}
		}
	});
}

//BlogVote
export async function voteBlog(newBlogVote: blogVote) {
	await db.insert(blogVoteTable).values(newBlogVote);
}

export async function unvoteBlog(newBlogVote: blogVote) {
	console.log(newBlogVote);
	await db.delete(blogVoteTable).where(
		sql`
		${newBlogVote.blogId} = ${blogVoteTable.blogId} AND
		${newBlogVote.userId} = ${blogVoteTable.userId}
		`
	);
}

//Blog Comment
export async function commentBlog(newBlogComment: blogComment) {
	return await db.insert(blogCommentTable).values(newBlogComment).returning();
}

export async function getBlogComment(blogId: number) {
	return await db.select().from(blogCommentTable).where(eq(blogCommentTable.blogId, blogId));
}

//Request
export async function addRequest(newReq: request) {
	return await db.insert(requestTable).values(newReq).returning();
}

export async function getRequest(userId: number) {
	return await db.select().from(requestTable).where(eq(requestTable.userId, userId));
}

export async function searchRequest(name: string, tag: string, userId: number) {
	if (name && tag) {
		const ret = await db.query.requestTable.findMany({
			where: sql`
			LOWER(${requestTable.title}) LIKE LOWER('%'||${name}||'%') and
			${tag}=ANY(${requestTable.tags})
			`
		});
		return ret;
	} else if (name) {
		const ret = await db
			.select()
			.from(requestTable)
			.where(
				sql`
			LOWER(${requestTable.title}) LIKE LOWER('%'||${name}||'%')
			`
			);
		return ret;
	} else if (tag) {
		const ret = await db.query.requestTable.findMany({
			where: sql`
			${tag}=ANY(${requestTable.tags})
			`
		});
		return ret;
	} else {
		const ret = await db.query.requestTable.findMany({});
		return ret;
	}
}

//Group

export async function insertGroup(newGroup: group) {
	const tmp = await db
		.select()
		.from(groupTable)
		.where(eq(groupTable.groupName, newGroup.groupName));

	if (tmp.length > 0) {
		return {
			success: false,
			message: 'Group with this name already exists'
		};
	}

	const ret = await db.insert(groupTable).values(newGroup).returning();
	insertMember({ groupId: ret[0].groupId, userId: ret[0].creatorId });

	return {
		success: true,
		message: 'Group successfully created'
	};
}

export async function deleteGroup(groupId: number) {
	await db.delete(groupTable).where(eq(groupTable.groupId, groupId));
}

export async function updateGroup(newGroup: group) {
	const tmp = newGroup.groupName;

	if (tmp) {
		const tmp2 = await db
			.select()
			.from(groupTable)
			.where(eq(groupTable.groupName, newGroup.groupName));

		if (tmp2.length > 0) {
			return {
				success: false,
				message: 'Group with this name already exists'
			};
		}

		await db
			.update(groupTable)
			.set({
				groupName: newGroup.groupName,
				description: newGroup.description,
				password: newGroup.password
			})
			.where(eq(groupTable.groupId, newGroup.groupId!));
	} else {
		await db
			.update(groupTable)
			.set({
				description: newGroup.description,
				password: newGroup.password
			})
			.where(eq(groupTable.groupId, newGroup.groupId!));
	}

	return {
		success: true,
		message: 'Group successfully updated'
	};
}

export async function getMyGroups(userId: number) {
	return await db.query.memberTable.findMany({
		where: eq(memberTable.userId, userId),
		with: {
			group: true
		}
	});
}

export async function getGroupInfo(groupId: number) {
	return await db.query.groupTable.findMany({
		where: eq(groupTable.groupId, groupId)
	});
}

export async function joinGroup(groupName: string, password: string, userId: number) {
	const group = await db
		.select()
		.from(groupTable)
		.where(
			sql`
		${groupTable.groupName} =  ${groupName} AND
		${groupTable.password} = ${password}
		`
		);

	if (group.length != 0) {
		const member = await db
			.select()
			.from(memberTable)
			.where(
				sql`
			${memberTable.groupId} = ${group[0].groupId} AND
			${memberTable.userId} = ${userId}

			`
			);

		if (member.length != 0) {
			return {
				success: false,
				message: 'Already a member of this group'
			};
		} else {
			await db.insert(memberTable).values({ groupId: group[0].groupId, userId: userId });
			return {
				success: true,
				message: 'Group Joined Successfully'
			};
		}
	} else {
		return {
			success: false,
			message: 'Invalid Credentials'
		};
	}
}

export async function leaveGroup(userId: number, groupId: number) {
	await db.delete(memberTable).where(
		sql`
		${memberTable.userId} = ${userId} AND
		${memberTable.groupId} = ${groupId}
		`
	);
}

//Member

export async function getMemberInfo(groupId: number) {
	return await db.query.memberTable.findMany({
		where: eq(memberTable.groupId, groupId),
		with: {
			member: true
		}
	});
}

export async function insertMember(newMember: member) {
	await db.insert(memberTable).values(newMember);
}

export async function deleteMember(newMember: member) {
	await db.delete(memberTable).where(
		sql`
		${memberTable.groupId} = ${newMember.groupId} AND
		${memberTable.userId} = ${newMember.userId}
		`
	);
}

//Friend Request

export async function insertFriendRequest(newReq: friendRequest){
	await db.insert(friendRequestTable).values(newReq)
}

export async function deleteFriendRequest(newReq: friendRequest){
	await db.delete(friendRequestTable).where(
		sql`
		(${friendRequestTable.senderId} = ${newReq.senderId} AND ${friendRequestTable.receiverId} = ${newReq.receiverId}) OR
		(${friendRequestTable.senderId} = ${newReq.receiverId} AND ${friendRequestTable.receiverId} = ${newReq.senderId})
		`
	)
}

export async function getSentFriendRequests(userId: number){
	return await db.select().from(friendRequestTable).where(
		eq(friendRequestTable.senderId, userId)
	)
}

export async function getReceivedFriendRequests(userId: number){
	return await db.select().from(friendRequestTable).where(
		eq(friendRequestTable.receiverId, userId)
	)
}

export async function getPairStatus(viewerId: number, profileId: number){
	let ret1 = await db.select().from(friendTable).where(
		sql`
		(${friendTable.user1Id} = ${viewerId} AND ${friendTable.user2Id} = ${profileId}) OR
		(${friendTable.user1Id} = ${profileId} AND ${friendTable.user2Id} = ${viewerId})
		`
	)

	if(ret1.length>0){
		return {
			reqStatus: "friend"
		}
	}


	let ret2 = await db.select().from(friendRequestTable).where(
		sql`
		${friendRequestTable.senderId} = ${viewerId} AND
		${friendRequestTable.receiverId} = ${profileId}
		`
	)

	if(ret2.length>0){
		return {
			reqStatus: "sent"
		}
	}

	let ret3 = await db.select().from(friendRequestTable).where(
		sql`
		${friendRequestTable.senderId} = ${profileId} AND
		${friendRequestTable.receiverId} = ${viewerId}
		`
	)

	if(ret3.length>0){
		return {
			reqStatus: "received"
		}
	}

	return {
		reqStatus: "none"
	}
}

//Friend

export async function insertFriend(newFriend: friend){
	let friendReq = {
		senderId: newFriend.user1Id,
		receiverId: newFriend.user2Id
	}

	deleteFriendRequest(friendReq)

	await db.insert(friendTable).values(newFriend)
}

export async function deleteFriend(newFriend: friend){
	await db.delete(friendTable).where(
		sql`
		(${friendTable.user1Id} = ${newFriend.user1Id} AND ${friendTable.user2Id} = ${newFriend.user2Id}) OR
		(${friendTable.user1Id} = ${newFriend.user2Id} AND ${friendTable.user2Id} = ${newFriend.user1Id})
		`
	)
}

export async function getFriends(userId: number){
	return await db.select().from(friendTable).where(
		sql`
		${friendTable.user1Id} = ${userId} OR
		${friendTable.user2Id} = ${userId}
		`
	)
}