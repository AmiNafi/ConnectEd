export const load = async ({ params, fetch }) => {
	let courseId = params.courseId;
	console.log(courseId)
	async function getCourseData() {
		const res = await fetch('/api/course/get', {
			method: 'POST',
			body: JSON.stringify({ courseId: courseId })
		});
		const data = await res.json();
		return data;
	}

	const ret = await getCourseData();
	// console.log(ret)

	return {
		otherCourseData: ret
	};
};
