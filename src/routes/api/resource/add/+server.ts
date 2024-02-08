import type { RequestHandler } from "@sveltejs/kit";
import {insertResource} from "$lib/server/queries"
import type {resource} from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const newResource = await event.request.json() as resource
    insertResource(newResource)

    return new Response(

    )
}