import { supabase } from '$lib/supabaseClient';
import type { Actions } from './$types';

export const actions = {
	upload: async (event) => {
		const data = await event.request.formData();
		let newLecture = Object.fromEntries(data.entries()) as any;

		let timestamp = new Date().getTime();

		let name = newLecture.userId+"_"+newLecture.sessionId+"_"+newLecture.courseId+"_"+timestamp

		const { data: res, error: err } = await supabase.storage
			.from('lectures')
			.upload(name, newLecture.file, {
				cacheControl: '3600',
				upsert: false
			});
		

		const { data: link} = await supabase
			.storage
			.from('lectures')
			.getPublicUrl(name)
		
		newLecture.lectureLink = link.publicUrl

		event.fetch('/api/lecture/add', {
			method: 'POST',
			body: JSON.stringify(newLecture)
		})

		// console.log(newLecture);

		return {
			success: true
		};
	}
} satisfies Actions;
