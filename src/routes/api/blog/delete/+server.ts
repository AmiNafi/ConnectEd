import type { RequestHandler } from "@sveltejs/kit";
import {deleteBlog} from "$lib/server/queries"
import type {blog} from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const blog = await event.request.json() as blog
    await deleteBlog(blog)

    return new Response(
         
    )
}