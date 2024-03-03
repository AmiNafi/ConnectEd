import type { RequestHandler } from "@sveltejs/kit";
import {getPairStatus} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const it = await event.request.json()
    const ret = await getPairStatus(it.viewerId, it.profileId)

    return new Response(
        JSON.stringify(ret)
    )
}