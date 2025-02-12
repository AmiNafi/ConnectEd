import type { RequestHandler } from "@sveltejs/kit";
import {doesUserExist, insertUser} from "$lib/server/queries"
import { supabase } from "$lib/supabaseClient";
import type {user} from "$lib/server/schema";

export const POST: RequestHandler = async (event) => {
    const session = await event.locals.getSession(); 
    const user = await event.request.json() as user
    const res = await doesUserExist(user) as boolean
    const userId = session.user.id;
    // console.log(res)
    
    if (res==false){
        console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuu = " + user)
        const filepath = `${userId}/profile`;
        const { data: data1, error:err1 } = await supabase.storage
        .from("profilePicture")
        .copy("profile.jpg", user.userName);

        const { data: data2} = await supabase.storage
            .from("profilePicture")
            .getPublicUrl(filepath);

        user.imageLink = data2.publicUrl
        
        await insertUser(user)
    }

    return new Response(

    )
}