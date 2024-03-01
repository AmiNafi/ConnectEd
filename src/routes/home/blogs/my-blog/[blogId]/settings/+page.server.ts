import type { PageServerLoad, Actions } from './$types';
import type { blog } from '$lib/server/schema';
import { redirect } from '@sveltejs/kit';

export const actions = {
	update: async (event) => {
		const data = await event.request.formData();
		let newBlog = Object.fromEntries(data.entries()) as any;

		if(newBlog.tags!=''){
		    newBlog.tags = newBlog.tags.split(',')
        }
        else newBlog.tags = null

		event.fetch('/api/blog/update', {
			method: 'POST',
			body: JSON.stringify(newBlog)
		})
		// console.log(newBlog)

		return {
			success: "success"
		};
	},

	delete: async(event) => {
		const data = await event.request.formData();
		let formData = Object.fromEntries(data.entries()) as any;

		await event.fetch('/api/blog/delete', {
			method: 'POST',
			body: JSON.stringify(formData)
		})

		redirect(301,'../')
	}
} satisfies Actions;
