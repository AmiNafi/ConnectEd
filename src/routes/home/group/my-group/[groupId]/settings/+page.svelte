<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { enhance } from '$app/forms';
	import { Textarea } from '$lib/components/ui/textarea';
	import type { PageData } from '../$types';
	import Breadcrumb from '$lib/components/others/breadcrumb.svelte';
	import { onMount } from 'svelte';
	import { Circle } from 'svelte-loading-spinners';

	export let data: PageData;

	let supabase = data.supabase;
	const userData = data.user[0];
	let currentGroup: any = null;
	let groupName = '';
	let description = '';
	let password = '';
	let imageLink = '';
	let imageName = ''
	let image: File | null;

	let items = [{ href: '../', text: 'My Groups' }];

	let isLoading = false;
	let isDeleting = false;
	let showMessage = false;
	let successStatus: boolean;
	let message: string;

	async function onSubmit(event: Event) {
		isLoading = true;
		showMessage = false;

		const form = event.target as HTMLFormElement;
		const data = new FormData(form);

		let tmp = data.get('image') as File;

		if (tmp.size > 0) {
			console.log(imageName)
			const {  data: dat1, error: err1  } = await supabase
			.storage
			.from('groupPhoto')
			.update(imageName, data.get('image')!, {
				cacheControl: '3600',
				upsert: true
			})
		}

		let payload;

		if (currentGroup.groupName != data.get('groupName')) {
			payload = {
				groupId: data.get('groupId'),
				groupName: data.get('groupName'),
				description: data.get('description'),
				password: data.get('password')
			};
		} else {
			payload = {
				groupId: data.get('groupId'),
				description: data.get('description'),
				password: data.get('password')
			};
		}

		await fetch('/api/group/update', {
			method: 'POST',
			body: JSON.stringify(payload)
		})
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				imageLink = currentGroup.imageLink + '?' + Date.now().toString();
				successStatus = res.success;
				message = res.message;
				showMessage = true;
			});

		image = null;

		isLoading = false;
	}

	onMount(() => {
		data.currentGroup.then((res) => {
			currentGroup = res[0];
			items = [...items, { href: './', text: currentGroup.groupName }];
			items = [...items, { href: './' + currentGroup.groupId + '/settings', text: 'Settings' }];
			console.log(currentGroup);

			groupName = currentGroup.groupName;
			description = currentGroup.description;
			password = currentGroup.password;
			
			imageLink = currentGroup.imageLink + '?' + Date.now().toString();

			imageName = currentGroup.imageLink.split('/').slice(-1)[0]
			// console.log(imageName)
		});
	});
</script>

<link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<div class="flex grow flex-col items-center space-y-6">
	<div class="flex w-full flex-row flex-wrap items-start justify-start">
		<Breadcrumb {items} />
	</div>
	{#if !currentGroup}
		<div class="flex h-full w-full items-center justify-center">
			<Circle size="60" color="#FF3E00" unit="px" duration="1s" />
		</div>
	{:else}
		<div>
			<h3 class="mt-10 text-center text-3xl font-medium">Settings</h3>
			<p class="text-sm text-gray-800">Change group settings</p>
		</div>
		{#if showMessage}
			{#if successStatus}
				<div
					class="w-[400px] rounded-sm border-2 border-green-500 bg-green-100 px-2 py-2 text-base text-green-500"
				>
					{message}
				</div>
			{:else}
				<div
					class="w-[400px] rounded-sm border-2 border-red-500 bg-red-100 px-2 py-2 text-base text-red-500"
				>
					{message}
				</div>
			{/if}
		{/if}
		<Separator />
		<form on:submit|preventDefault={onSubmit}>
			<button type="submit" disabled style="display: none" aria-hidden="true"></button>
			<!-- svelte-ignore empty-block -->
			<input hidden name="groupId" value={currentGroup.groupId} />
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
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<img src={imageLink} alt="cover photo" width="300px" />
					<Input
						class="w-[400px] bg-white"
						id="image"
						name="image"
						type="file"
						disabled={isLoading}
						bind:value={image}
					/>
				</div>

				<Button type="submit" disabled={isLoading} class="mb-20">
					{#if isLoading}
						<i class="fa fa-spinner fa-spin px-3" style="font-size:24px" />
					{/if}
					Update
				</Button>
			</div>
		</form>
		<form use:enhance={() => {
			isDeleting = true;
			return async ({ update }) => {
				isDeleting = false;
				update({ invalidateAll:false });
			};
		}}
			action="?/delete"
			method="post"
			class="w-[800px] flex flex-row justify-end"
		>
			<input hidden name="groupId" value={currentGroup.groupId} />
			<Button type="submit" disabled={isDeleting} class="mb-20 min-w-40 bg-red-500" >
				{#if isDeleting}
					<i class="fa fa-spinner fa-spin px-3" style="font-size:24px" />
				{/if}
				Delete
			</Button>
		</form>
	{/if}
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
