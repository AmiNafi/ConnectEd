export const load = async ({ params, fetch }) => {
	let courseId = params.courseId;
	
	async function getCourseData() {
		const res = await fetch('/api/course/get', {
			method: 'POST',
			body: JSON.stringify({ courseId: courseId })
		});
		const data = await res.json();
		return data;
	}

	return {
		otherCourseData: await getCourseData()
	};
};
