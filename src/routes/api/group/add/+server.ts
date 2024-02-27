import type { RequestHandler } from "@sveltejs/kit";
import {insertGroup} from "$lib/server/queries"
import type {group} from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const it = await event.request.json()
    const ret = await insertGroup(it)

    return new Response(
        JSON.stringify(ret)
    )
}