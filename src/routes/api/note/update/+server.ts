import type { RequestHandler } from "@sveltejs/kit";
import {updateNote} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const note = await event.request.json()
    await updateNote(note)

    return new Response(

    )
}