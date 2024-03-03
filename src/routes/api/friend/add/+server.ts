import type { RequestHandler } from "@sveltejs/kit";
import {insertFriend} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const it = await event.request.json()
    await insertFriend(it)

    return new Response(
        
    )
}