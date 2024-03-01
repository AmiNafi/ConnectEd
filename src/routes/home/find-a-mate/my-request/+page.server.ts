import type { PageServerLoad } from "./$types";
import { userId } from '$lib/stores/user.js';

export const load = async ({ locals:{supabase}, fetch }) => {
	let email = (await supabase.auth.getUser()).data.user?.email;
	async function getUserId(email: string){
		const res = await fetch('/api/user/get-user-id', {
			method: 'POST',
			body: JSON.stringify({ email: email })
		});
		const data = await res.json();
		return data;
	}
	let userId = await getUserId(email!);

	let payload = { userId: userId };


	const res = await fetch('/api/request/get', {
		method: 'POST',
		body: JSON.stringify(payload)
	});
	const data = await res.json();
    // console.log(data)

	return {
		myRequest: data
	};
};