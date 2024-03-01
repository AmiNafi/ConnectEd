import { redirect, type Actions } from "@sveltejs/kit";

export const load = async ({ params, fetch }) => {
	let groupId = params.groupId;


	async function getGroupInfo() {
		const res = await fetch('/api/group/get-group-info', {
			method: 'POST',
			body: JSON.stringify({ groupId: groupId })
		});
		const data = await res.json();
		return data;
	}

    return {
		currentGroup: getGroupInfo()
    }
}

export const actions = {
	delete: async(event) => {
		const data = await event.request.formData();
		let formData = Object.fromEntries(data.entries()) as any;

		await event.fetch('/api/group/delete', {
			method: 'POST',
			body: JSON.stringify(formData)
		})

		redirect(301,'../')
	}
} satisfies Actions;