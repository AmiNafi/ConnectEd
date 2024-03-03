import type { RequestHandler } from "@sveltejs/kit";
import {deleteFriend} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const it = await event.request.json()
    await deleteFriend(it)

    return new Response(
        
    )
}