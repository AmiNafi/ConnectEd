export const load = async ({locals:{supabase}, params, fetch }) => {

	async function getUserId(){
        let email = (await supabase.auth.getUser()).data.user?.email;
		const res = await fetch('/api/user/get-user-id', {
			method: 'POST',
			body: JSON.stringify({ email: email })
		});
		const data = await res.json();
		return data;
	}

	async function getFriendRequests() {
        let userId = await getUserId()
		const res = await fetch('/api/friend-request/get', {
			method: 'POST',
			body: JSON.stringify(userId)
		});
		const data = await res.json();
		return data;
	}

    return {
		friendRequests: getFriendRequests()
	}
};
