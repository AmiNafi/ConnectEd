import type { RequestHandler } from "@sveltejs/kit";
import {getBlogComment} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const res = await getBlogComment(data.blogId)

    // console.log(res);
    return new Response(
        JSON.stringify(res)
    )
}