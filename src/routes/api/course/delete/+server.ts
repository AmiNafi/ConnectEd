import type { RequestHandler } from "@sveltejs/kit";
import {deleteCourse} from "$lib/server/queries"
import type {group} from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const it = await event.request.json()
    await deleteCourse(it)

    return new Response(
         
    )
}