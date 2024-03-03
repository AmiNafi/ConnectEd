import type { RequestHandler } from "@sveltejs/kit";
import {deleteFriendRequest} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const it = await event.request.json()
    await deleteFriendRequest(it)

    return new Response(
        
    )
}