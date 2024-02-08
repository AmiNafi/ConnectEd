import type { Actions, PageServerLoad } from './$types';
import { userId } from '$lib/stores/user.js';

export const actions = {
	search: async (event) => {
		const formData = await event.request.formData();
		let data = Object.fromEntries(formData.entries()) as any;

		const ret = await event.fetch('/api/session/search', {
			method: 'POST',
			body: JSON.stringify(data)
		});

		return {
			searchResult: ret
		};
	},
	favorite: async (event) => {
		const formData = await event.request.formData();
		let data = Object.fromEntries(formData.entries()) as any;
		
		console.log(data)

		const ret = await event.fetch('/api/session/favorite', {
			method: 'POST',
			body: JSON.stringify(data)
		});

		return {
			success: 'success'
		};
	},
	unfavorite: async (event) => {
		const formData = await event.request.formData();
		let data = Object.fromEntries(formData.entries()) as any;
		
		console.log(data)

		const ret = await event.fetch('/api/session/unfavorite', {
			method: 'POST',
			body: JSON.stringify(data)
		});

		return {
			success: 'success'
		};
	},
};

export const load: PageServerLoad = async ({ fetch }) => {
	let id;
	userId.subscribe((value) => {
		id = value;
	});

	let payload = { userId: id };
	// console.log(payload)

	async function getData() {
		const res = await fetch('/api/session/search', {
			method: 'POST',
			body: JSON.stringify(payload)
		});
		const data = await res.json();
		return data;
	}

	return {
		searchResult: await getData()
	};
};
