import type { RequestHandler } from "@sveltejs/kit";
import {updateSession} from "$lib/server/queries"
import type {session} from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const newSession = await event.request.json() as session
    updateSession(newSession)

    return new Response(

    )
}