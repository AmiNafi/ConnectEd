import type { RequestHandler } from "@sveltejs/kit";
import {deleteGroup} from "$lib/server/queries"
import type {group} from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const it = await event.request.json()
    deleteGroup(it.groupId)

    return new Response(
         
    )
}