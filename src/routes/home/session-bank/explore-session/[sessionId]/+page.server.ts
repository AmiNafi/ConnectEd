import { addSG } from "$lib/server/queries";
import type { Actions } from "@sveltejs/kit";

export const actions = {
	report:  async (event) => {
		const formData = await event.request.formData();
		let data = Object.fromEntries(formData.entries()) as any;
		console.log(data)

		addSG(data)
	}
} satisfies Actions