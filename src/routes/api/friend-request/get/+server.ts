import type { RequestHandler } from '@sveltejs/kit';
import { getSentFriendRequests, getReceivedFriendRequests } from '$lib/server/queries';

export const POST: RequestHandler = async (event) => {
	const it = await event.request.json();
	const sent = await getSentFriendRequests(it);
	const received = await getReceivedFriendRequests(it);

    let payload = {
        sent,
        received
    }

	return new Response(
        JSON.stringify(payload)
    );
};
