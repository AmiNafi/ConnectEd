import { userId } from '$lib/stores/user.js';

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