import type { RequestHandler } from "@sveltejs/kit";
import {deleteRequest} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const it = await event.request.json()
    await deleteRequest(it);

    return new Response(
         
    )
}