import { userId } from '$lib/stores/user.js';

export const load = async ({ params, fetch }) => {
	let id;
	userId.subscribe((value) => {
		id = value;
	});

    const res = await fetch('/api/blog/get-favorite', {
        method: 'POST',
        body: JSON.stringify({ userId: id})
    });
    const data = await res.json();
    // console.log(data[0])

	return {
		favoriteBlog: data
	};
};

