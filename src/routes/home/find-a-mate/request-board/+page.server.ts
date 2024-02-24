import type { Actions, PageServerLoad } from "./$types";
import { userId } from '$lib/stores/user.js';

export const load: PageServerLoad = async ({ fetch }) => {
	let id;
	userId.subscribe((value) => {
		id = value;
	});

	let payload = { userId: id };


	const res = await fetch('/api/request/search', {
		method: 'POST',
		body: JSON.stringify(payload)
	});
	const data = await res.json();
    // console.log(data)

	return {
		searchResult: data
	};
};

export const actions = {
	search: async (event) => {
		const formData = await event.request.formData();
		let data = Object.fromEntries(formData.entries()) as any;

		console.log(data);

		const ret = await event.fetch('/api/request/search', {
			method: 'POST',
			body: JSON.stringify(data)
		});

		const res = await ret.json();

		return {
			success: "search",
			searchResult: res
		};
	}
} satisfies Actions;
