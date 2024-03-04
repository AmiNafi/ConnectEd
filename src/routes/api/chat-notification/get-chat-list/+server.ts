import type { RequestHandler } from "@sveltejs/kit";
import {getChatList} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const it = await event.request.json()
    const ret = await getChatList(it)

    return new Response(
        JSON.stringify(ret)
    )
}