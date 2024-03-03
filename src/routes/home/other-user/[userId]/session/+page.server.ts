export const actions = {
	favorite: async (event) => {
		const formData = await event.request.formData();
		let data = Object.fromEntries(formData.entries()) as any;

		// console.log(data)

		const ret = await event.fetch('/api/session/favorite', {
			method: 'POST',
			body: JSON.stringify(data)
		});

		// return {
		// 	success: 'success'
		// };
	},
	unfavorite: async (event) => {
		const formData = await event.request.formData();
		let data = Object.fromEntries(formData.entries()) as any;

		// console.log(data)

		const ret = await event.fetch('/api/session/unfavorite', {
			method: 'POST',
			body: JSON.stringify(data)
		});

		// return {
		// 	success: 'success'
		// };
	}
};
