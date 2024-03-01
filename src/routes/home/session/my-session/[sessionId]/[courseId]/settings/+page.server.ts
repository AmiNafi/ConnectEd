import type { PageServerLoad, Actions } from './$types';
import type { course } from '$lib/server/schema';
import { redirect } from '@sveltejs/kit';

export const actions = {
	update: async (event) => {
		const data = await event.request.formData();
		let newCourse = Object.fromEntries(data.entries()) as any;

        if(newCourse.tags!=''){
		    newCourse.tags = newCourse.tags.split(',')
        }
        else newCourse.tags = null

		event.fetch('/api/course/update', {
			method: 'POST',
			body: JSON.stringify(newCourse)
		})
		// console.log(newCourse)

		return {
			success: true
		};
	},

	delete: async(event) => {
		const data = await event.request.formData();
		let formData = Object.fromEntries(data.entries()) as any;

		await event.fetch('/api/course/delete', {
			method: 'POST',
			body: JSON.stringify(formData)
		})

		redirect(301,'../')
	}
} satisfies Actions;
