import type { RequestHandler } from "@sveltejs/kit";
import {insertGResource} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const it = await event.request.json()
    await insertGResource(it)

    return new Response(

    )
}