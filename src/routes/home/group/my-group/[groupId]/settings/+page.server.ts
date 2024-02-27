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