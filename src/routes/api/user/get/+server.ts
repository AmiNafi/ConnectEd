import type { RequestHandler } from '../$types';
import {getUser} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    // console.log(data)
    const res = await getUser(data)

    return new Response(
        JSON.stringify(res)
    )
}