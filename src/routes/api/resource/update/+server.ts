import type { RequestHandler } from "@sveltejs/kit";
import {updateResource} from "$lib/server/queries"
import type {resource} from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const newResource = await event.request.json() as resource
    updateResource(newResource)

    return new Response(

    )
}