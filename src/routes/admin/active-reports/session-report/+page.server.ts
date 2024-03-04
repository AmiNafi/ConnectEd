import { deleteSession, getSG1, updateSG } from '$lib/server/queries';

export const load = async (event) => {
	return {
		list: getSG1()
	};
};

export const actions = {
	delete1: async (event) => {
		const formData = await event.request.formData();
		let data = Object.fromEntries(formData.entries()) as any;
		updateSG(data);
	},
	delete2: async (event) => {
		const formData = await event.request.formData();
		let data = Object.fromEntries(formData.entries()) as any;
		deleteSession(data);
		updateSG(data);
	}
};
