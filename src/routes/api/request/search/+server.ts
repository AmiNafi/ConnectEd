import type { RequestHandler } from "@sveltejs/kit";
import {searchRequest} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const query = await event.request.json()
    console.log(query)
    const ret = await searchRequest(query.name, query.tag, query.userId)
    return new Response(
        JSON.stringify(ret)
    )
}