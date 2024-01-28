import type { RequestHandler } from "@sveltejs/kit";
import {insertLecture} from "$lib/server/queries"
import type {lecture} from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const newLecture = await event.request.json() as lecture
    insertLecture(newLecture)

    return new Response(

    )
}