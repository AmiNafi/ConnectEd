import { userId } from '$lib/stores/user.js';
import type { Actions } from '@sveltejs/kit';

export const load = async ({ params, fetch }) => {
	let id: number;
	userId.subscribe((value) => {
		id = value!;
	});


	async function getMyGroups() {
		const res = await fetch('/api/group/get-my-groups', {
			method: 'POST',
			body: JSON.stringify({ userId: id })
		});
		const data = await res.json();
		return data;
	}

	return {
		myGroups: getMyGroups()
	};
};

export const actions = {
	join: async (event) => {
		const formData = await event.request.formData();
		let data = Object.fromEntries(formData.entries()) as any;
		
		// console.log(data)

		const ret = await event.fetch('/api/group/join', {
			method: 'POST',
			body: JSON.stringify(data)
		});

		const res = await ret.json()

		// console.log(res)

		return res
	}
} satisfies Actions;