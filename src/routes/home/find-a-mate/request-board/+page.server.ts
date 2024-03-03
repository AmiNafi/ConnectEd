import type { Actions, PageServerLoad } from './$types';
import { userId } from '$lib/stores/user.js';

export const load: PageServerLoad = async ({ locals: { supabase }, fetch }) => {

	let email = (await supabase.auth.getUser()).data.user?.email;
	async function getUserId(email: string) {
		const res = await fetch('/api/user/get-user-id', {
			method: 'POST',
			body: JSON.stringify({ email: email })
		});
		const data = await res.json();
		return data;
	}
	let userId = await getUserId(email!);

	let payload = { userId: userId };

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
			success: 'search',
			searchResult: res
		};
	}
} satisfies Actions;
