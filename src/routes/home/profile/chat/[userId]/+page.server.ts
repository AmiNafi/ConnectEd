export const load = async ({locals:{supabase}, params, fetch }) => {

	async function getUserName(){
		const res = await fetch('/api/user/get-user-name', {
			method: 'POST',
			body: JSON.stringify(params.userId)
		});
		const data = await res.json();
		return data;
	}

    return {
		otherUser: await getUserName()
	}
}