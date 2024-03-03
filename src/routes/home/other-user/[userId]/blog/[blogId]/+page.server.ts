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

export const load = async ({ params, fetch }) => {
	let blogId = params.blogId;
	let id: number;
	userId.subscribe((value) => {
		id = value!;
	});


	async function getComments() {
		const res = await fetch('/api/blog/get-comment', {
			method: 'POST',
			body: JSON.stringify({ blogId: blogId })
		});
		const data = await res.json();
		return data;
	}
	
	async function getBlog(){
		const res = await fetch('/api/blog/get', {
			method: 'POST',
			body: JSON.stringify({ blogId: blogId, userId: id })
		});
		const data = await res.json();
		return data;
	}

	return {
		blogComments: getComments(),
		currentBlog: getBlog()
	};
};
