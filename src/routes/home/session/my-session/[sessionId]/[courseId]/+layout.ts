export const load = async ({ params, url }) => {
    let courseId = params.courseId
    
    async function getCourseData() {
        const res = await fetch('/api/lecture', {
			method: 'POST',
			body: JSON.stringify({ courseId: courseId })
		});
		const data = await res.json();
		return data
    }
};