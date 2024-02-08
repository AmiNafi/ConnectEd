import type { RequestHandler } from "@sveltejs/kit";
import {insertLink} from "$lib/server/queries"
import type {link} from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const newLink = await event.request.json() as link
    insertLink(newLink)

    return new Response(

    )
}