export const load = async ({ locals: { supabase }, fetch }) => {
	const {
		data: { user }
	} = await supabase.auth.getUser();
	// console.log(user)

	const email = user?.email;

	const res = await fetch('/api/user', {
		method: 'POST',
		body: JSON.stringify({ email: email })
	});
	const data = await res.json();
	// console.log(data)

	return {
		user: data
	};
};
