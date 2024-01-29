import type { RequestHandler } from "@sveltejs/kit";
import {deleteLecture} from "$lib/server/queries"
import type {lecture} from "$lib/server/schema";
import { supabase } from "$lib/supabaseClient";

export const POST: RequestHandler = async (event) => {
    const newLecture = await event.request.json() as lecture

    const { data, error } = await supabase
    .storage
    .from('lectures')
    .remove([newLecture.savedName])

    deleteLecture(newLecture)

    return new Response(

    )
}