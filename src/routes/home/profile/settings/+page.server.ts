import type { Actions } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const actions = {
	update: async (event) => {
		const formData = await event.request.formData();
		let data = Object.fromEntries(formData.entries()) as any;

		// console.log(data.image.size);

		if (data.image.size > 0) {
			let imageName = data.email.split('@')[0];
			const { data: dat1, error: err1 } = await supabase.storage
				.from('profilePicture')
				.update(imageName, data.image, {
					cacheControl: '3600',
					upsert: true
				});
		}

		const res = await event.fetch('/api/user/update', {
			method: 'POST',
			body: JSON.stringify(data)
		});
		const ret = await res.json();

		return ret;
	}
} satisfies Actions;
