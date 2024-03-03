import type { RequestHandler } from "@sveltejs/kit";
import {insertNote} from "$lib/server/queries"

export const POST: RequestHandler = async (event) => {
    const note = await event.request.json()
    await insertNote(note)

    return new Response(

    )
}