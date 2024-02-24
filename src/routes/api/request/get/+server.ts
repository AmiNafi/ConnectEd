import type { RequestHandler } from "@sveltejs/kit";
import {getRequest} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const query = await event.request.json()
    const ret = await getRequest(query.userId)
    
    return new Response(
        JSON.stringify(ret)
    )
}