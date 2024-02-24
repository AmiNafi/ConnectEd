import type {Actions, PageServerLoad} from './$types';

export const actions = {
	search: async (event) => {
		const formData = await event.request.formData();
		let data = Object.fromEntries(formData.entries()) as any;

		console.log(data);

		const ret = await event.fetch('/api/blog/search', {
			method: 'POST',
			body: JSON.stringify(data)
		});

		const res = await ret.json();

		return {
			success: "search",
			searchResult: res
		};
	}
} satisfies Actions;
