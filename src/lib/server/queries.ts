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
	blogVoteTable
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
	blogVote
} from './schema';
import { eq, lt, gte, ne, inArray, and, or, sql } from 'drizzle-orm';

//User
export async function insertUser(newUser: user) {
	await db.insert(userTable).values(newUser);
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

//Session
export async function insertSession(newSession: session) {
	await db.insert(sessionTable).values(newSession);
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
			description: newLecture.description
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
			description: newResource.description
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

//Blogs
export async function insertBlog(newBlog: blog) {
	await db.insert(blogTable).values(newBlog);
}

export async function deleteBlog(newBlog: blog) {
	await db.delete(blogTable).where(eq(blogTable.blogId, newBlog.blogId!));
}

export async function updateBlog(newBlog: blog){
	await db.update(blogTable)
	.set({
		blogContent: newBlog.blogContent,
		blogTitle: newBlog.blogTitle,
		tags: newBlog.tags
	})
	.where(eq(blogTable.blogId, newBlog.blogId!))
}

export async function searchBlog(name: string, tag: string, userId: number) {
	if (name && tag) {
		const ret = await db.query.blogTable.findMany({
			where: sql`
			LOWER(${blogTable.blogTitle}) LIKE LOWER('%'||${name}||'%') and
			${tag}=ANY(${blogTable.tags})
			`,
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
			LOWER(${blogTable.blogTitle}) LIKE LOWER('%'||${name}||'%') and

			`,
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
			session:{
				with:{
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
			blog:{
				with:{
					writer: true
				}
			}
		}
	});
}