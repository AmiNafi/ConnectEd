import { getBG2 } from "$lib/server/queries";

export const load = async (event) => {
	return {
		list: getBG2()
	};
};