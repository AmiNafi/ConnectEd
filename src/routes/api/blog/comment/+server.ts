import type { RequestHandler } from "@sveltejs/kit";
import {commentBlog} from "$lib/server/queries"
import type {blogComment} from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const it = await event.request.json() as blogComment
    const res = await commentBlog(it)

    return new Response(
        JSON.stringify(res)
    )
}