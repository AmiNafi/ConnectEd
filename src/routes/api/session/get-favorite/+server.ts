import type { RequestHandler } from "@sveltejs/kit";
import {getFavoriteSession} from "$lib/server/queries"
import type {sessionFav} from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const res = await getFavoriteSession(data.userId)

    // console.log(res);
    return new Response(
        JSON.stringify(res)
    )
}