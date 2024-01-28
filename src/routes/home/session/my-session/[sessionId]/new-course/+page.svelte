<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import Breadcrumb from '$lib/components/others/breadcrumb.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { enhance } from '$app/forms';
	import { Textarea } from '$lib/components/ui/textarea';
	import type { ActionData } from './$types';
	import type { LayoutData } from '../../../$types';
	import Notebook from '$lib/components/others/notebook.svelte';
	import type { session } from '$lib/server/schema';
	import { page } from '$app/stores';

	export let form: ActionData;
	export let data: LayoutData;

	const userData = data.user[0];
	const userSessions = userData.sessions as session[];
	const currentSession = userSessions.filter((session) => {
		return session.sessionId?.toString() == $page.params.sessionId;
	})[0];
	const sessionIndex = userSessions.findIndex(
		(session) => session.sessionId?.toString() == $page.params.sessionId
	);

	let items = [
		{ href: '../', text: 'My Sessions' },
		{ href: './', text: currentSession.sessionName },
		{ href: './new-course', text: 'Create Course' }
	];

	let courseName = '';
	let description = '';
	let isLock = ''
	let timerId: any;
	let theme = '#CD7F32';

	let showMessage = false;
	let isLoading = false;
	async function onSubmit() {
		isLoading = true;
		timerId = setTimeout(() => {
			isLoading = false;
		}, 10000);
	}

	$: {
		if (form?.success) {
			isLoading = false;
			clearTimeout(timerId);

			chips = [];
			courseName=''
			description=''
			isLock=''
			theme='#CD7F32'

			showMessage = true;
			form.success = false;
		}
	}

	let chipInput = '';
	let chips: string[] = [];

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
	</div>
	<Label class="mb-10 mt-10 text-center text-3xl font-medium"
		>{currentSession.sessionName}/Settings</Label
	>
	{#if showMessage}
		<div
			class="mb-10 w-[400px] rounded-sm border-2 border-green-500 bg-green-100 px-2 py-2 text-base text-green-500"
		>
			Course Successfully Created
		</div>
	{/if}
	<form
		use:enhance={() => {
			return async ({ update }) => {
				update({ reset: false });
			};
		}}
		action="?/create"
		method="post"
		on:submit={() => {
			onSubmit();
		}}
	>
		<button type="submit" disabled style="display: none" aria-hidden="true"></button>

		<input hidden id="userId" name="userId" bind:value={data.user[0].userId} />
		<input hidden id="sessionId" name="sessionId" bind:value={currentSession.sessionId} />

		<div class="grid gap-10">
			<div class="grid gap-2">
				<Label for="courseName">Course Name</Label>
				<Input
					required
					class="w-[400px] bg-white"
					id="courseName"
					name="courseName"
					placeholder="Type course name"
					type="text"
					autocapitalize="none"
					disabled={isLoading}
					bind:value={courseName}
				/>
			</div>

			<div class="grid gap-2">
				<Label for="description">Course Description (Optional)</Label>
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
				<Label for="isLock">Lock Setting</Label>
				<select
					disabled={isLoading}
					name="isLock"
					id="isLock"
					bind:value={isLock}
					required
					class="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-muted px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
			focus-visible:ring-ring
			focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
				>
					<option value="" disabled selected hidden>--Please choose an option--</option>
					<option value={true}>Locked</option>
					<option value={false}>Open</option>
				</select>
			</div>

			<div class="grid gap-2">
				<Label for="theme">Color Theme</Label>
				<div class="flex flex-row items-center gap-28">
					<Notebook {theme} size="w-36" />
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
				Create
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
