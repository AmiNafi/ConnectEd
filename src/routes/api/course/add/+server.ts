import type { RequestHandler } from "@sveltejs/kit";
import {insertCourse} from "$lib/server/queries"
import type {course} from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const newSession = await event.request.json() as course
    insertCourse(newSession)

    return new Response(

    )
}