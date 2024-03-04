import type { RequestHandler } from '../$types';
import {getUserName} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const it = await event.request.json()
    const res = await getUserName(it)

    return new Response(
        JSON.stringify(res)
    )
}