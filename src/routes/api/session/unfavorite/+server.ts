import type { RequestHandler } from "@sveltejs/kit";
import {unfavoriteSession} from "$lib/server/queries"
import type {sessionFav} from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const newSessionFav = await event.request.json() as sessionFav
    // console.log(newSessionFav)
    unfavoriteSession(newSessionFav)

    return new Response(

    )
}