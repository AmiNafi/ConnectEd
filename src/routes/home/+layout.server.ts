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

	async function getUserId(){
        let email = (await supabase.auth.getUser()).data.user?.email;
		const res = await fetch('/api/user/get-user-id', {
			method: 'POST',
			body: JSON.stringify({ email: email })
		});
		const data = await res.json();
		return data;
	}

	async function getUnread(){
        let userId = await getUserId()
		const res = await fetch('/api/chat-notification/get-unread', {
			method: 'POST',
			body: JSON.stringify(userId)
		});
		const data = await res.json();
		return data;
	}
	

	const ret = await getUserData()

	return {
		user: ret,
		unreadList: getUnread()
	};
};
