import type { user } from '$lib/server/schema';

export const load = async ({ locals: { supabase }, fetch }) => {
	async function getUserData() {
		const {
			data: { user }
		} = await supabase.auth.getUser();
		// console.log(user)

		const email = user?.email;

		const res = await fetch('/api/user/get', {
			method: 'POST',
			body: JSON.stringify({ email: email })
		});
		const data = await res.json();
		return data
	}

	return {
		user: await getUserData()
	};
};
