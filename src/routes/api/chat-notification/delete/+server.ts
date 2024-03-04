import type { RequestHandler } from "@sveltejs/kit";
import {deleteCN} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const it = await event.request.json()
    await deleteCN(it)

    return new Response(
        
    )
}