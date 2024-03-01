import type { RequestHandler } from '../$types';
import {getUserId} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    // console.log(data)
    const res = await getUserId(data.email)

    return new Response(
        JSON.stringify(res)
    )
}