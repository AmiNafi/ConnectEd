import type { RequestHandler } from "@sveltejs/kit";
import {deleteResource} from "$lib/server/queries"
import type {resource} from "$lib/server/schema";
import { supabase } from "$lib/supabaseClient";

export const POST: RequestHandler = async (event) => {
    const newResource = await event.request.json() as resource

    const { data, error } = await supabase
    .storage
    .from('resources')
    .remove([newResource.savedName])

    deleteResource(newResource)

    return new Response(

    )
}