import type { Actions } from './$types';
import { userId } from '$lib/stores/user.js';
import { addBG, getBlog2, updateBG } from '$lib/server/queries';

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
	},
	report:  async (event) => {
		const formData = await event.request.formData();
		let data = Object.fromEntries(formData.entries()) as any;
		console.log(data)

		addBG(data)
	},
} satisfies Actions;

export const load = async ({ locals:{supabase}, params, fetch }) => {
	let blogId = params.blogId;
	console.log(blogId)
	async function getComments() {
		const res = await fetch('/api/blog/get-comment', {
			method: 'POST',
			body: JSON.stringify({ blogId: blogId })
		});
		const data = await res.json();
		return data;
	}
	
	return {
		blogComments: getComments(),
		currentBlog: getBlog2(parseInt(blogId))
	};
};
