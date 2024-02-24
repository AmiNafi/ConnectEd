import type { RequestHandler } from "@sveltejs/kit";
import {addRequest} from "$lib/server/queries"
import type {request} from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const it = await event.request.json() as request
    addRequest(it);

    return new Response(
         
    )
}