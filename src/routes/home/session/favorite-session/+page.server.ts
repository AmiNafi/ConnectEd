import { userId } from '$lib/stores/user.js';

export const load = async ({ params, fetch }) => {
	let id;
	userId.subscribe((value) => {
		id = value;
	});

	async function getFavSession() {
		const res = await fetch('/api/session/get-favorite', {
			method: 'POST',
			body: JSON.stringify({ userId: id })
		});
		const data = await res.json();
		return data;
	}
	// console.log(data)

	return {
		favoriteSessions: getFavSession()
	};
};

export const actions = {
	unfavorite: async (event) => {
		const formData = await event.request.formData();
		let data = Object.fromEntries(formData.entries()) as any;

		// console.log(data)

		const ret = await event.fetch('/api/session/unfavorite', {
			method: 'POST',
			body: JSON.stringify(data)
		});

		// return {
		// 	success: 'success'
		// };
	}
};
