import { deleteBlog, getBG1, updateBG } from '$lib/server/queries';

export const load = async (event) => {
	return {
		list: getBG1()
	};
};

export const actions = {
	delete1: async (event) => {
		const formData = await event.request.formData();
		let data = Object.fromEntries(formData.entries()) as any;
		updateBG(data);
	},
	delete2: async (event) => {
		const formData = await event.request.formData();
		let data = Object.fromEntries(formData.entries()) as any;
		deleteBlog(data);
		updateBG(data);
	}
};
