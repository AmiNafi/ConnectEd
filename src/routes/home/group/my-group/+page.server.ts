import { userId } from '$lib/stores/user.js';
import { supabase } from '$lib/supabaseClient.js';
import type { Actions } from '@sveltejs/kit';

export const load = async ({ locals: { supabase }, params, fetch }) => {

	let email = (await supabase.auth.getUser()).data.user?.email;
	async function getUserId(email: string){
		const res = await fetch('/api/user/get-user-id', {
			method: 'POST',
			body: JSON.stringify({ email: email })
		});
		const data = await res.json();
		return data;
	}
	// console.log(userId)

	async function getMyGroups() {
		let userId = await getUserId(email!);
		const res = await fetch('/api/group/get-my-groups', {
			method: 'POST',
			body: JSON.stringify({ userId: userId })
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