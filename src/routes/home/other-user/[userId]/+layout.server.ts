export const load = async ({ params, fetch }) => {
	async function getOtherUserData() {
		const res = await fetch('/api/user/get-from-id', {
			method: 'POST',
			body: JSON.stringify(params.userId)
		});
		const data = await res.json();
		return data;
	}

	return {
		otherUser: getOtherUserData()
	};
};
