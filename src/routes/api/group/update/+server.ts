import type { RequestHandler } from "@sveltejs/kit";
import {updateGroup} from "$lib/server/queries"
import type {blog} from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const ret = await updateGroup(data)

    // console.log(data);
    return new Response(
        JSON.stringify(ret)
    )
}