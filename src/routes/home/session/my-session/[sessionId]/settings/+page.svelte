<script lang="ts">
	import { page } from '$app/stores';
	import Breadcrumb from '$lib/components/others/breadcrumb.svelte';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import type { session } from '$lib/server/schema';
	import type { LayoutData } from '../../../$types';
	import { Textarea } from '$lib/components/ui/textarea';
	import Setting from '$lib/components/others/setting.svelte';
	import { enhance } from '$app/forms';

	import { Separator } from '$lib/components/ui/separator';
	import type { ActionData } from './$types';

	export let data: LayoutData;
	export let form: ActionData;

	const userData = data.user[0];
	const userSessions = userData.sessions as session[];
	const currentSession = userSessions.filter((session) => {
		return session.sessionId?.toString() == $page.params.sessionId;
	})[0];
	const sessionIndex = userSessions.findIndex(
		(session) => session.sessionId?.toString() == $page.params.sessionId
	);

	let items = [
		{ href: './', text: 'My Sessions' },
		{ href: './', text: currentSession.sessionName },
		{ href: './settings', text: 'Settings' }
	];

	let sessionName = currentSession.sessionName;
	let description = currentSession.description;
	let visibility = currentSession.visibility;

	let timerId: any;
	let theme = currentSession.theme;

	let isLoading = false;

	async function onSubmit() {
		isLoading = true;
		timerId = setTimeout(() => {
			isLoading = false;
		}, 10000);
	}

	$: {
		if (form?.success) {
			data.user[0].sessions[sessionIndex].sessionName = sessionName;
			data.user[0].sessions[sessionIndex].description = description;
			data.user[0].sessions[sessionIndex].visibility = visibility;
			data.user[0].sessions[sessionIndex].tags = chips;
			data.user[0].sessions[sessionIndex].theme = theme;

			isLoading = false;
			clearTimeout(timerId);
		}
	}

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

	let chipInput = '';
	let chips: string[] = currentSession.tags || [];

	function addChip() {
		if (chipInput.trim() !== '') {
			chips = [...chips, chipInput.trim()];
			chipInput = '';
		}
	}

	function removeChip(index: number) {
		chips = chips.filter((_, i) => i !== index);
	}
</script>

<link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<div class="flex grow flex-col items-center">
	<div class="flex w-full flex-row flex-wrap justify-between">
		<Breadcrumb {items} />
		<a href="./settings"><Setting /></a>
	</div>
	<Label class="mb-10 mt-10 text-center text-3xl font-medium"
		>{currentSession.sessionName}/Settings</Label
	>
	{#if form?.success}
		<div
			class="mb-10 w-[400px] rounded-sm border-2 border-green-500 bg-green-100 px-2 py-2 text-base text-green-500"
		>
			Session Successfully Updated
		</div>
	{/if}
	<form
		use:enhance={() => {
			return async ({ update }) => {
				update({ reset: false });
			};
		}}
		action="?/update"
		method="post"
		on:submit={() => {
			onSubmit();
		}}
	>
		<button type="submit" disabled style="display: none" aria-hidden="true"></button>

		<input hidden id="userId" name="userId" value={data.user[0].userId} />
		<input hidden id="sessionId" name="sessionId" value={currentSession.sessionId} />

		<div class="grid gap-10">
			<div class="grid gap-2">
				<Label for="sessionName">Session Name</Label>
				<Input
					required
					class="w-[400px] bg-white"
					id="sessionName"
					name="sessionName"
					placeholder="Type session name"
					type="text"
					autocapitalize="none"
					disabled={isLoading}
					bind:value={sessionName}
				/>
			</div>

			<div class="grid gap-2">
				<Label for="description">Session Description (Optional)</Label>
				<Textarea
					class="w-[400px] bg-white"
					id="description"
					name="description"
					placeholder="Type description here."
					autocapitalize="none"
					disabled={isLoading}
					bind:value={description}
				/>
			</div>

			<div class="grid gap-2">
				<Label for="visibility">Visibility Setting</Label>
				<select
					disabled={isLoading}
					name="visibility"
					id="visibility"
					bind:value={visibility}
					required
					class="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-muted px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
			focus-visible:ring-ring
			focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
				>
					<option value="" disabled selected hidden>--Please choose an option--</option>
					<option value="private">Private</option>
					<option value="public">Public</option>
					<option value="publish">Publish</option>
				</select>
			</div>

			<div class="grid gap-2">
				<Label for="theme">Color Theme</Label>
				<div class="flex flex-row items-center gap-28">
					<svg
						enable-background="new 0 0 48 48"
						viewBox="0 0 48 48"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="m40 12h-18l-4-4h-10c-2.2 0-4 1.8-4 4v8h40v-4c0-2.2-1.8-4-4-4z"
							fill={LightenDarkenColor(theme, -30)}
						/><path
							d="m40 12h-32c-2.2 0-4 1.8-4 4v20c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4v-20c0-2.2-1.8-4-4-4z"
							fill={theme}
						/></svg
					>
					<input
						class="w-36 rounded-md bg-muted"
						type="color"
						id="theme"
						name="theme"
						bind:value={theme}
					/>
				</div>
			</div>

			<div class="grid gap-2">
				<Label for="tags">Tags (Optional)</Label>

				<input
					disabled={isLoading}
					bind:value={chipInput}
					on:keydown={(event) => event.key === 'Enter' && addChip()}
					placeholder="Add a chip"
					class="rounded-md border border-gray-300 px-2 py-1"
				/>

				{#each chips as chip, index (chip)}
					<div class="chip">
						<span>{chip}</span>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<span class="remove-button" on:click={() => removeChip(index)}>X</span>
					</div>
				{/each}
			</div>

			<input
				hidden
				class="bg-white"
				id="tags"
				name="tags"
				type="text"
				disabled={isLoading}
				bind:value={chips}
			/>

			<Button type="submit" disabled={isLoading} class="mb-20">
				{#if isLoading}
					<i class="fa fa-spinner fa-spin px-3" style="font-size:24px" />
				{/if}
				Update
			</Button>
		</div>
	</form>
</div>

<style>
	select:required:invalid {
		color: gray;
	}
	option[value=''][disabled] {
		display: none;
	}
	option {
		color: black;
	}
	.chip {
		background-color: #3490dc;
		color: #fff;
		padding: 0.5rem;
		margin-right: 0.5rem;
		border-radius: 0.25rem;
		display: flex;
		align-items: center;
	}

	.remove-button {
		cursor: pointer;
		margin-left: 0.5rem;
	}
</style>