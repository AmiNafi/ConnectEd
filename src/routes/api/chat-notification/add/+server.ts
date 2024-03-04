import type { RequestHandler } from "@sveltejs/kit";
import {insertCN} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const it = await event.request.json()
    await insertCN(it)

    return new Response(
        
    )
}