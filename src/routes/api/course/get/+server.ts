import type { RequestHandler } from './$types';
import {getCourse} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const res = await getCourse(data)

    return new Response(
        JSON.stringify(res)
    )
}