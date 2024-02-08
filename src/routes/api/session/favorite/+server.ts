import type { RequestHandler } from "@sveltejs/kit";
import {favoriteSession} from "$lib/server/queries"
import type {sessionFav} from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const newSessionFav = await event.request.json() as sessionFav
    favoriteSession(newSessionFav)

    return new Response(

    )
}