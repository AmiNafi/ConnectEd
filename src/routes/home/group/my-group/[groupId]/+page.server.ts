import { supabase } from '$lib/supabaseClient';
import { type Actions } from '@sveltejs/kit';

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

    async function getMemberInfo() {
		const res = await fetch('/api/group/get-member-info', {
			method: 'POST',
			body: JSON.stringify({ groupId: groupId })
		});
		const data = await res.json();
		return data;
	}

	async function getGroupResource(){
		const res = await fetch('/api/group-resource/get', {
			method: 'POST',
			body: JSON.stringify(groupId)
		});
		const data = await res.json();
		return data;
	}

	return {
		currentGroup: getGroupInfo(),
		memberList: getMemberInfo(),
		groupResources: getGroupResource()
	};
};

export const actions = {
	uploadResource: async (event) => {
		const data = await event.request.formData();
		let newResource = Object.fromEntries(data.entries()) as any;
		console.log(newResource);
		let timestamp = new Date().getTime();

		let name = timestamp + '_' + newResource.file.name;

		newResource.fileType = newResource.file.type;

		const { data: res, error: err } = await supabase.storage
			.from('groupResources')
			.upload(name, newResource.file, {
				cacheControl: '3600',
				upsert: false
			});

		const { data: link } = await supabase.storage.from('groupResources').getPublicUrl(name);

		newResource.savedName = name;
		newResource.resourceLink = link.publicUrl;

		const ret = await event.fetch('/api/group-resource/add', {
			method: 'POST',
			body: JSON.stringify(newResource)
		});

		// console.log(newLecture);

		return {
			success: 'resourceUpload',
		};
	},
	deleteResource: async (event) => {
		const data = await event.request.formData();
		let resource = Object.fromEntries(data.entries()) as any;

		event.fetch('/api/group-resource/delete', {
			method: 'POST',
			body: JSON.stringify(resource)
		});

		return {
			success: 'resourceDelete'
		};
	},
	updateResource: async (event) => {
		const data = await event.request.formData();
		let resource = Object.fromEntries(data.entries()) as any;

		// console.log('Here');

		if (resource.file.size != 0) {
			resource.fileType = resource.file.type;
			const { data: res1, error: err1 } = await supabase.storage
				.from('groupResources')
				.update(resource.savedName, resource.file, {
					cacheControl: '3600',
					upsert: true
				});
		}

		event.fetch('/api/group-resource/update', {
			method: 'POST',
			body: JSON.stringify(resource)
		});

		return {
			success: 'resourceUpdate'
		};
	}
} satisfies Actions;