import type { RequestHandler } from "@sveltejs/kit";
import {favoriteBlog} from "$lib/server/queries"
import type {blogFav} from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const newBlogFav = await event.request.json() as blogFav
    favoriteBlog(newBlogFav)

    return new Response(

    )
}