import db from "./db";
import { userTable, sessionTable, courseTable, lectureTable} from "./schema";
import type {user, session, course, lecture} from "./schema";
import { eq, lt, gte, ne } from 'drizzle-orm';

//User
export async function insertUser(newUser: user){
    await db.insert(userTable).values(newUser)
}

export async function doesUserExist(newUser: user){
    return (await db.select().from(userTable).where(eq(userTable.email,newUser.email))).length != 0
}

export async function getUser(newUser: user){
    return await db.query.userTable.findMany({
        where: eq(userTable.email, newUser.email),
        with:{
            sessions: {
                with: {
                    courses: true
                }
            }
        }
    })
}

//Session
export async function insertSession(newSession: session){
    await db.insert(sessionTable).values(newSession)
}

export async function updateSession(newSession: session){
    await db.update(sessionTable).set({
        sessionName: newSession.sessionName,
        description: newSession.description,
        tags: newSession.tags,
        theme: newSession.theme,
        visibility: newSession.visibility
    }).where(eq(sessionTable.sessionId, newSession.sessionId!))
}

//Course
export async function insertCourse(newCourse: course){
    await db.insert(courseTable).values(newCourse)
}

export async function updateCourse(newCourse: course){
    await db.update(courseTable).set({
        courseName: newCourse.courseName,
        description: newCourse.description,
        tags: newCourse.tags,
        theme: newCourse.theme,
        isLock: newCourse.isLock
    }).where(eq(courseTable.courseId, newCourse.courseId!))
}

export async function getCourse(newCourse: course){
    return await db.query.courseTable.findMany({
        where: eq(courseTable.courseId, newCourse.courseId!),
        with:{
            lectures: true,
            resources: true,
            links: true,
            notes: true
        }
    })
}

//Lecture
export async function insertLecture(newLecture: lecture){
    await db.insert(lectureTable).values(newLecture)
}

