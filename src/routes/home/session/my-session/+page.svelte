<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Label } from '$lib/components/ui/label';
	import type { LayoutData } from '../$types';
	import Breadcrumb from '$lib/components/others/breadcrumb.svelte';
	import type { session } from '$lib/server/schema';

	export let data: LayoutData;
	const userData = data.user[0];
	const userSessions = userData.sessions as session[];

	let items = [{ href: 'home/session/my-session', text: 'My Sessions' }];

	function LightenDarkenColor(col: string, amt: number) {
		var usePound = false;
		if (col[0] == '#') {
			col = col.slice(1);
			usePound = true;
		}

		var num = parseInt(col, 16);

		var r = (num >> 16) + amt;

		if (r > 255) r = 255;
		else if (r < 0) r = 0;

		var b = ((num >> 8) & 0x00ff) + amt;

		if (b > 255) b = 255;
		else if (b < 0) b = 0;

		var g = (num & 0x0000ff) + amt;

		if (g > 255) g = 255;
		else if (g < 0) g = 0;

		return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
	}
</script>

<div class="flex grow flex-col items-center">
	<div class="flex w-full flex-row flex-wrap items-start justify-start">
		<Breadcrumb {items} />
	</div>
	<Label class="mt-10 text-center text-3xl font-medium">My Sessions</Label>

	<div class="flex w-full flex-row flex-wrap items-start justify-start gap-10">
		{#each userSessions as session}
			<div class="flex w-52 flex-col">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<svg
					href="/"
					on:click={() => {
						goto('./my-session/' + session.sessionId);
					}}
					class="hover:scale-105"
					enable-background="new 0 0 48 48"
					viewBox="0 0 48 48"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="m40 12h-18l-4-4h-10c-2.2 0-4 1.8-4 4v8h40v-4c0-2.2-1.8-4-4-4z"
						fill={LightenDarkenColor(session.theme, -30)}
					/><path
						d="m40 12h-32c-2.2 0-4 1.8-4 4v20c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4v-20c0-2.2-1.8-4-4-4z"
						fill={session.theme}
					/></svg
				>
				<Label class="text-center text-xl font-medium">{session.sessionName}</Label>
			</div>
		{/each}
	</div>
</div>
