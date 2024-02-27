import { userId } from '$lib/stores/user.js';

export const load = async ({ params, fetch }) => {
	let id;
	userId.subscribe((value) => {
		id = value;
	});

	async function getFavBlogs() {
		const res = await fetch('/api/blog/get-favorite', {
			method: 'POST',
			body: JSON.stringify({ userId: id })
		});
		const data = await res.json();
		return data;
	}

	return {
		favoriteBlogs: getFavBlogs()
	};
};

export const actions = {
	unfavorite: async (event) => {
		const formData = await event.request.formData();
		let data = Object.fromEntries(formData.entries()) as any;

		// console.log(data)

		const ret = await event.fetch('/api/blog/unfavorite', {
			method: 'POST',
			body: JSON.stringify(data)
		});

		// return {
		// 	success: 'success'
		// };
	}
};
