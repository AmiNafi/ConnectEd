import type { PageServerLoad } from "./$types";
import { userId } from '$lib/stores/user.js';

export const load: PageServerLoad = async ({ fetch }) => {
	let id;
	userId.subscribe((value) => {
		id = value;
	});

	let payload = { userId: id };


	const res = await fetch('/api/request/get', {
		method: 'POST',
		body: JSON.stringify(payload)
	});
	const data = await res.json();
    // console.log(data)

	return {
		myRequest: data
	};
};