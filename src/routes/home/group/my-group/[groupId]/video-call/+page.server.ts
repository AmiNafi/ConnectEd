import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { error } from '@sveltejs/kit';
import TokenServerImport from 'agora-token';
const { RtcRole, RtcTokenBuilder } = TokenServerImport; // CJS module import
import type { PageServerLoadEvent } from '../$types';

export async function load({ locals:{supabase}, params, fetch }) {
    let groupId = params.groupId;
    try {
        
        async function getUserId(){
            let email = (await supabase.auth.getUser()).data.user?.email;
            const res = await fetch('/api/user/get-user-id', {
                method: 'POST',
                body: JSON.stringify({ email: email })
            });
            const data = await res.json();
            return data;
        }
        const channel = groupId;
        const userId = await getUserId();
        console.log(channel)
        if (!channel) {
            throw error(400, 'channel is required');
        }

        const token = RtcTokenBuilder.buildTokenWithUid(
            publicEnv.PUBLIC_APP_ID,
            env.APP_CERTIFICATE,
            channel,
            parseInt(userId),
            RtcRole.PUBLISHER,
            600,
            600
        );

        // let { data: userdetails, error: err } = await event.locals.supabase
        //     .from('userdetails')
        //     .select("*")
        //     .eq('email', user.email)
        // console.log(err);
        // userNow = userdetails[0];


        // let { data: friends, error } = await event.locals.supabase
        //     .from('friends')
        //     .select("*")
        //     .eq('id', channel)

        // let lookFor;
        // if (friends[0].user1 === userNow.id) {
        //     lookFor = friends[0].user2;
        // }
        // else {
        //     lookFor = friends[0].user1;
        // }

        // let { data: userdetails2, error: err2 } = await event.locals.supabase
        //     .from('userdetails')
        //     .select("*")
        //     .eq('id', lookFor)

        // friendNow = userdetails2[0]

        // console.log(token, uid, channel)
        return { token, groupId, channel};
    } catch (e) {
        console.log("bugggg");
        throw error(400, `json expected: ${JSON.stringify(e)}`);

    }
}