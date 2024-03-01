<script lang="ts">
	import { goto } from '$app/navigation';
	import { Label } from '$lib/components/ui/label';
	import type { LayoutData } from '../$types';
	import Breadcrumb from '$lib/components/others/breadcrumb.svelte';
	import type { session } from '$lib/server/schema';
	import { Input } from '$lib/components/ui/input';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Tags } from 'lucide-svelte';

	export let data: LayoutData;
	const userData = data.user[0];
	const userSessions = userData.sessions as session[];
	let filteredSessions = userSessions;

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

	let name = '';
	let tag = '';
	let sortBy = '';

	// function generateColour(str: string) {
	// 	// Simple hash function to generate a color based on the tag name
	// 	const hash = hashString(str);
	// 	const color = `hsl(${hash % 360}, 70%, 80%)`;
	// 	return color;
	// }
	// function hashString(str: string) {
	// 	let hash = 0;
	// 	for (let i = 0; i < str.length; i++) {
	// 		const charCode = str.charCodeAt(i);
	// 		hash = charCode + ((hash << 5) - hash); // Improved hash function
	// 	}
	// 	return hash;
	// }

	function filterSessions() {
		if (name.length >= 0) {
			filteredSessions = userSessions.filter((session) => {
				return session.sessionName.toLowerCase().includes(name.toLowerCase());
			});
		}

		if (tag.length >= 0) {
			filteredSessions = filteredSessions.filter((session) => {
				if (session.tags) {
					for (let i = 0; i < session.tags.length; i++) {
						if (session.tags[i].toLowerCase().includes(tag.toLowerCase())) {
							return true;
						}
					}
					return false;
				}
				if(tag.length==0) return true
				else return false;
			});
		}
	}

	$: {
		filteredSessions = filteredSessions.sort(function (x, y) {
			if (sortBy == 'newest') {
				if (x.createdAt! < y.createdAt!) {
					return -1;
				}
				if (x.createdAt! > y.createdAt!) {
					return 1;
				}
				return 0;
			} else if (sortBy == 'oldest') {
				if (x.createdAt! < y.createdAt!) {
					return 1;
				}
				if (x.createdAt! > y.createdAt!) {
					return -1;
				}
				return 0;
			} else {
				return 0;
			}
		});
	}
</script>

<div class="flex grow flex-col items-center">
	<div class="flex w-full flex-row flex-wrap items-start justify-start">
		<Breadcrumb {items} />
	</div>
	<Label class="mt-10 text-center text-3xl font-medium">My Sessions</Label>
	<div class="mt-5 flex w-[90%] flex-row justify-between gap-20">
		<Input type="text" placeholder="name" name="name" bind:value={name} class="max-w-xs bg-muted" />
		<Input type="text" placeholder="tag" name="tag" bind:value={tag} class="max-w-xs bg-muted" />
		<select
			bind:value={sortBy}
			class="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-muted px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-ring
    focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
		>
			<option value="" disabled selected hidden>-- sort by --</option>
			<option value="newest">Newest</option>
			<option value="oldest">Oldest</option>
		</select>
		<Button class="bg-green-500 hover:bg-green-700" on:click={filterSessions}>Search</Button>
	</div>
	<div class="flex w-full flex-row flex-wrap items-start justify-start gap-10">
		{#each filteredSessions as session}
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
				{#if session.tags}
					<div class="mt-2 flex flex-row flex-wrap justify-center gap-2">
						{#each session.tags as tag}
							<span
								class="rounded-full border border-black px-2 text-xs transition-colors hover:bg-gray-200"
								>{tag}</span
							>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
