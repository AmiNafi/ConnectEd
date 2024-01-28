import type { RequestHandler } from "@sveltejs/kit";
import {doesUserExist, insertUser} from "$lib/server/queries"
import { supabase } from "$lib/supabaseClient";
import type {user} from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const user = await event.request.json() as user
    const res = await doesUserExist(user) as boolean

    console.log(res)
    
    if (res==false){
        console.log(user)

        const { data: data1, error:err1 } = await supabase.storage
        .from("profilePicture")
        .copy("profile.jpg", user.userName);

        const { data: data2} = await supabase.storage
            .from("profilePicture")
            .getPublicUrl(user.userName);

        user.imageLink = data2.publicUrl
        
        await insertUser(user)
    }

    return new Response(

    )
}