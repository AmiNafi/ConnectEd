import type { RequestHandler } from "@sveltejs/kit";
import {updateGResource} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const it = await event.request.json()
    await updateGResource(it)

    return new Response(

    )
}