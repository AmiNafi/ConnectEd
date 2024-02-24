<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { enhance } from '$app/forms';
	import { Textarea } from '$lib/components/ui/textarea';
	import type { LayoutData } from '../$types';

	export let data: LayoutData;

	let supabase = data.supabase;
	let groupName = '';
	let description = '';
	let password = ''
	let image : File|null
	let timerId: any;
	let theme = '#F7C427';

	let isLoading = false;
	async function onSubmit(event: Event) {
		isLoading = true;

		const form = event.target as HTMLFormElement;
		const data = new FormData(form);

		let name = data.get('groupName')!.toString();

		const { data: res1, error: err1 } = await supabase.storage
			.from('groupPhoto')
			.upload(name, data.get('image')!, {
				cacheControl: '3600',
				upsert: false
			});

		const { data: link } = supabase.storage
			.from('groupPhoto')
			.getPublicUrl((name));

		let payload = {
			"creatorId": data.get("creatorId"),
			"groupName": data.get("groupName"),
			"description": data.get("description"),
			"imageLink": link.publicUrl,
			"password": data.get("password")
		}	

		await fetch('/api/group/add', {
			method: 'POST',
			body: JSON.stringify(payload)
		})

		groupName = ""
		description = ""
		password = ""
		image = null

		isLoading = false
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

<div class="flex grow flex-col items-center space-y-6">
	<div>
		<h3 class="mt-10 text-center text-3xl font-medium">Create New Group</h3>
		<p class="text-sm text-gray-800">Create a group with preferred settings</p>
	</div>
	<!-- {#if form?.success}
		<div
			class="w-[400px] rounded-sm border-2 border-green-500 bg-green-100 px-2 py-2 text-base text-green-500"
		>
			Group Successfully Created
		</div>
	{/if} -->
	<Separator />
	<form on:submit|preventDefault={onSubmit}>
		<button type="submit" disabled style="display: none" aria-hidden="true"></button>
		<!-- svelte-ignore empty-block -->
		<input hidden id="creatorId" name="creatorId" value={data.user[0].userId} />
		<div class="grid gap-10">
			<div class="grid gap-2">
				<Label for="groupName">Group Name</Label>
				<Input
					required
					class="w-[400px] bg-white"
					id="groupName"
					name="groupName"
					placeholder="Type group name"
					type="text"
					autocapitalize="none"
					disabled={isLoading}
					bind:value={groupName}
				/>
			</div>

			<div class="grid gap-2">
				<Label for="description">Group Description (Optional)</Label>
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
				<Label for="password">Password</Label>
				<Input
					required
					class="w-[400px] bg-white"
					id="password"
					name="password"
					placeholder="Type password"
					type="text"
					autocapitalize="none"
					disabled={isLoading}
					bind:value={password}
				/>
			</div>

			<div class="grid gap-2">
				<Label for="image">Cover Photo</Label>
				<Input
					required
					class="w-[400px] bg-white"
					id="image"
					name="image"
					type="file"
					disabled={isLoading}
					bind:value={image}
				/>
			</div>

			<!-- <div class="grid gap-2">
				<Label for="visibility">Visibility Setting</Label>
				<select
					disabled={isLoading}
					name="visibility"
					id="visibility"
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
			</div> -->

			<!-- <div class="grid gap-2">
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
			</div> -->

			<!-- <div class="grid gap-2">
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
						<span>{chip}</span> -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- <span class="remove-button" on:click={() => removeChip(index)}>X</span>
					</div>
				{/each}
			</div> -->

			<!-- <input
				hidden
				class="bg-white"
				id="tags"
				name="tags"
				type="text"
				disabled={isLoading}
				bind:value={chips}
			/> -->

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
