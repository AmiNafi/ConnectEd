import type { RequestHandler } from "@sveltejs/kit";
import {getFriends} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const it = await event.request.json()
    const ret = await getFriends(it.userId)

    return new Response(
        JSON.stringify(ret)
    )
}