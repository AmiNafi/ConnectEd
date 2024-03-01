import type { PageServerLoad, Actions } from './$types';
import type { session } from '$lib/server/schema';
import { redirect } from '@sveltejs/kit';

export const actions = {
	update: async (event) => {
		const data = await event.request.formData();
		let newSession = Object.fromEntries(data.entries()) as any;

		if(newSession.tags!=''){
		    newSession.tags = newSession.tags.split(',')
        }
        else newSession.tags = null

		event.fetch('/api/session/update', {
			method: 'POST',
			body: JSON.stringify(newSession)
		})
		console.log(newSession)

		return {
			success: true
		};
	},

	delete: async(event) => {
		const data = await event.request.formData();
		let formData = Object.fromEntries(data.entries()) as any;

		await event.fetch('/api/session/delete', {
			method: 'POST',
			body: JSON.stringify(formData)
		})

		redirect(301,'../')
	}
} satisfies Actions;
