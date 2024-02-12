import type { RequestHandler } from "@sveltejs/kit";
import {updateBlog} from "$lib/server/queries"
import type {blog} from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const newBlog = await event.request.json() as blog
    updateBlog(newBlog)

    return new Response(
         
    )
}