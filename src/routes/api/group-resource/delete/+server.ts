import type { RequestHandler } from "@sveltejs/kit";
import {deleteGResource} from "$lib/server/queries"
import { supabase } from "$lib/supabaseClient";

export const POST: RequestHandler = async (event) => {
    const it = await event.request.json()

    const { data, error } = await supabase
    .storage
    .from('resources')
    .remove([it.savedName])

    await deleteGResource(it)

    return new Response(

    )
}