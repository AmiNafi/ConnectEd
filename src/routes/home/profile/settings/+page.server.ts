import type { Actions } from '@sveltejs/kit';
// import { supabase } from '$lib/supabaseClient';

export const actions = {
	update: async (event) => {
		const formData = await event.request.formData();
		let entryData = Object.fromEntries(formData.entries()) as any;

		// console.log(data.image.size);

		if (entryData.image.size > 0) {
			try {
				const session = await event.locals.getSession(); // Use session from hooks.server.ts
				if (!session || !session.user) {
					console.log('User not authenticated');
					// return { error: 'User not authenticated' };
				}
				else {
					const userId = session.user.id;
        			const bucket = 'profilePicture';
					const filepath = `${userId}/profile`;
					// entryData.image.name = 'profile';/
					const { data, error } = await event.locals.supabase.storage
					.from(bucket)
					.upload(filepath, entryData.image, { 
						cacheControl: '3600',
						upsert: true 
					});
					console.log(entryData);
					// entryData.image.name = filepath;
					if (error) {
						console.log(error.message);
					}
				}
			} catch (err) {
				console.log(err);
			}
			
			//console.log("Got hereeeeeeeeeeeeeeeeeee ");
			// let imageName = data.email.split('@')[0];
			// console.log(data);
			// console.log(supabase.storage.from('profilePicture'));
			// const { data: dat1, error: err1 } = await supabase.storage
			// 	.from('profilePicture') 	 	
			// 	.update(imageName, data.image, {
			// 		cacheControl: '3600',
			// 		upsert: true
			// 	});
			// 	console.log("data = " + dat1?.fullPath	 + "error = " + err1?.message);
			// 	console.log(supabase.storage);
		}

		const res = await event.fetch('/api/user/update', {
			method: 'POST',
			body: JSON.stringify(entryData)
		});
		const ret = await res.json();

		return ret;
	}
} satisfies Actions;
