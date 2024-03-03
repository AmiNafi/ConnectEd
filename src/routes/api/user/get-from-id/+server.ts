import type { RequestHandler } from '../$types';
import {getUserFromId} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const res = await getUserFromId(data)

    return new Response(
        JSON.stringify(res)
    )
}