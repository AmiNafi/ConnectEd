import type { PageServerLoad } from "../$types";

export const load = async ({ params, fetch }) => {
	let sessionId = params.sessionId;
	console.log(sessionId)

	async function getData() {
		const res = await fetch('/api/session/get', {
			method: 'POST',
			body: JSON.stringify({ sessionId: sessionId })
		});
		const data = await res.json();
		return data;
	}
    
    const ret = await getData()

    // console.log(ret)

	return {
		otherSessionData: ret
	};
};
