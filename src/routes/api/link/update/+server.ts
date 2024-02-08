import type { RequestHandler } from "@sveltejs/kit";
import {updateLink} from "$lib/server/queries"
import type {link} from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const link = await event.request.json() as link
    updateLink(link)

    return new Response(

    )
}