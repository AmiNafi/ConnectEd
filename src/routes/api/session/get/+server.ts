import type { RequestHandler } from './$types';
import {getSession} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const res = await getSession(data)

    return new Response(
        JSON.stringify(res)
    )
}