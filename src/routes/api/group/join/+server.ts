import type { RequestHandler } from "@sveltejs/kit";
import {joinGroup} from "$lib/server/queries"
import type {blog} from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const res = await joinGroup(data.groupName, data.password, data.userId)

    // console.log(data);
    return new Response(
        JSON.stringify(res)
    )
}