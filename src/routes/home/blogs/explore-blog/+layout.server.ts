import type { LayoutServerLoad } from "./$types";
import { userId } from '$lib/stores/user.js';

export const load: LayoutServerLoad = async ({ fetch }) => {
	let id;
	userId.subscribe((value) => {
		id = value;
	});

	let payload = { userId: id };


	const res = await fetch('/api/blog/search', {
		method: 'POST',
		body: JSON.stringify(payload)
	});
	const data = await res.json();

	return {
		searchResult: data
	};
};
