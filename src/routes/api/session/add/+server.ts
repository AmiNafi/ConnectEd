import type { RequestHandler } from "@sveltejs/kit";
import {insertSession} from "$lib/server/queries"
import type {session} from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const newSession = await event.request.json() as session
    insertSession(newSession)

    return new Response(

    )
}