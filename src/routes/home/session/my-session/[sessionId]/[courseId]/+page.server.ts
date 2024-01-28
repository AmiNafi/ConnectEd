import { supabase } from '$lib/supabaseClient';
import type { Actions } from './$types';

export const actions = {
	upload: async (event) => {
		const data = await event.request.formData();
		let newLecture = Object.fromEntries(data.entries()) as any;

		let timestamp = new Date().getTime();

		const { data: res, error: err } = await supabase.storage
			.from('lectures')
			.upload(newLecture.userId+"_"+newLecture.sessionId+"_"+newLecture.courseId+"_"+timestamp, newLecture.file, {
				cacheControl: '3600',
				upsert: false
			});

		console.log(res)
		console.log(err)

		// if(newCourse.tags!=''){
		//     newCourse.tags = newCourse.tags.split(',')
		// }
		// else newCourse.tags = null

		// event.fetch('/api/course/update', {
		// 	method: 'POST',
		// 	body: JSON.stringify(newCourse)
		// })

		console.log(newLecture);
		// console.log(newLecture.file.name)

		return {
			success: true
		};
	}
} satisfies Actions;
