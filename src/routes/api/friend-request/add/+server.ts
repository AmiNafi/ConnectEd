import type { RequestHandler } from "@sveltejs/kit";
import {insertFriendRequest} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const it = await event.request.json()
    await insertFriendRequest(it)

    return new Response(
        
    )
}