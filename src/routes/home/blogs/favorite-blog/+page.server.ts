export const actions = {
	unfavorite: async (event) => {
		const formData = await event.request.formData();
		let data = Object.fromEntries(formData.entries()) as any;
		
		// console.log(data)

		const ret = await event.fetch('/api/blog/unfavorite', {
			method: 'POST',
			body: JSON.stringify(data)
		});

		// return {
		// 	success: 'success'
		// };
	}
}