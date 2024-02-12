import type { RequestHandler } from "@sveltejs/kit";
import {searchBlog} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const query = await event.request.json()
    const ret = await searchBlog(query.name, query.tag, query.userId)
    return new Response(
        JSON.stringify(ret)
    )
}