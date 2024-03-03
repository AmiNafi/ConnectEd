import type { RequestHandler } from "@sveltejs/kit";
import {deleteNote} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const note = await event.request.json()
    await deleteNote(note)

    return new Response(

    )
}