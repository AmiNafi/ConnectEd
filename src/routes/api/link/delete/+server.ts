import type { RequestHandler } from "@sveltejs/kit";
import {deleteLink} from "$lib/server/queries"
import type {link} from "$lib/server/schema";
import { supabase } from "$lib/supabaseClient";

export const POST: RequestHandler = async (event) => {
    const link = await event.request.json() as link
    deleteLink(link)

    return new Response(

    )
}