
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

	console.log(ret[0])

    if(ret[0].visibility!='public'){
		return{
			success: false,
			otherSessionData: null
		}
	}
	else{
		return{
			success: true,
			otherSessionData: ret
		}
	}

};
