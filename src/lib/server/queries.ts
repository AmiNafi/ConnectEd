import db from "./db";
import { userTable} from "./schema";
import type {user} from "./schema";
import { eq, lt, gte, ne } from 'drizzle-orm';

export async function insertUser(newUser: user){
    await db.insert(userTable).values(newUser)
}

export async function doesUserExist(newUser: user){
    return (await db.select().from(userTable).where(eq(userTable.email,newUser.email))).length != 0
}

export async function getUser(newUser: user){
    return await db.select().from(userTable).where(eq(userTable.email,newUser.email))
}