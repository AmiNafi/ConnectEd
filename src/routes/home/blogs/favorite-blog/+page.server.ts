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


	async function getFavBlogs() {
		let userId = await getUserId(email!);
		const res = await fetch('/api/blog/get-favorite', {
			method: 'POST',
			body: JSON.stringify({ userId: userId })
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
