import type { RequestHandler } from "@sveltejs/kit";
import {searchSession} from "$lib/server/queries"
import type {session} from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const query = await event.request.json()
    const ret = await searchSession(query.name, query.tag, query.userId)
    // console.log(ret)
    return new Response(
        JSON.stringify(ret)
    )
}