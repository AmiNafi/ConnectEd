import type { Actions } from './$types';
import { userId } from '$lib/stores/user.js';

export const actions = {
	comment: async (event) => {
		const formData = await event.request.formData();
		let data = Object.fromEntries(formData.entries()) as any;

		// console.log(data);

		const ret = await event.fetch('/api/blog/comment', {
			method: 'POST',
			body: JSON.stringify(data)
		});

		const res = await ret.json();

		return {
			success: 'comment',
			newComment: res
		};
	}
} satisfies Actions;

export const load = async ({ locals:{supabase}, params, fetch }) => {
	let blogId = params.blogId;
	
	let email = (await supabase.auth.getUser()).data.user?.email;
	async function getUserId(email: string){
		const res = await fetch('/api/user/get-user-id', {
			method: 'POST',
			body: JSON.stringify({ email: email })
		});
		const data = await res.json();
		return data;
	}


	async function getComments() {
		const res = await fetch('/api/blog/get-comment', {
			method: 'POST',
			body: JSON.stringify({ blogId: blogId })
		});
		const data = await res.json();
		return data;
	}
	
	async function getBlog(){
		let userId = await getUserId(email!)
		const res = await fetch('/api/blog/get', {
			method: 'POST',
			body: JSON.stringify({ blogId: blogId, userId: userId })
		});
		const data = await res.json();
		return data;
	}

	return {
		blogComments: getComments(),
		currentBlog: getBlog()
	};
};
