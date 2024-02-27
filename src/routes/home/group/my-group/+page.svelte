<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import Breadcrumb from '$lib/components/others/breadcrumb.svelte';
	import * as Pagination from '$lib/components/ui/pagination';
	import type { session } from '$lib/server/schema';
	import Favorite from '$lib/components/svg/favorite.svelte';
	import Favorited from '$lib/components/svg/favorited.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { PageData, ActionData } from './$types';
	import { Circle } from 'svelte-loading-spinners';
	import { onMount } from 'svelte';
	import * as Card from '$lib/components/ui/card';
	import RightArrow from '$lib/components/others/right-arrow.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { SvelteToast, toast } from '@zerodevx/svelte-toast';

	let items = [{ href: '../', text: 'My Groups' }];

	export let data: PageData;
	export let form: ActionData;
	const userData = data.user[0];
	let myGroups: any = null;
	let perPage = 5;

	onMount(() => {
		data.myGroups.then((res) => {
			myGroups = res;
			// console.log(res);
		});
	});

	let isLoading = false;

	$: {
		if (form) {
			let status = form.success;
			let message = form.message;

			if (status) {
				toast.push(message, {
					theme: {
						'--toastColor': 'mintcream',
						'--toastBackground': 'rgba(72,187,120,0.9)',
						'--toastBarBackground': '#2F855A'
					}
				});
			} else {
				toast.push(message, {
					theme: {
						'--toastColor': 'mintcream',
						'--toastBackground': 'rgba(187,72,120,0.9)',
						'--toastBarBackground': '#880808'
					}
				});
			}
			form = null;
			console.log('Done');
		}
	}

	function handleSubmit(event: SubmitEvent) {
		// const form = event.target as HTMLFormElement;
		// const formData = new FormData(form);
		// const formObject: Record<string, string> = {};
		// formData.forEach((value, key) => {
		// 	formObject[key] = value.toString();
		// });
		// console.log('Form data:', formObject);
		// form.reset();
	}
</script>

<link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<SvelteToast />
<div class="flex grow flex-col items-center">
	<div class="flex w-full flex-row flex-wrap items-start justify-start">
		<Breadcrumb {items} />
	</div>
	<Label class="mb-5 mt-10 text-center text-3xl font-medium">My Groups</Label>

	<Dialog.Root>
		<Dialog.Trigger
			><Button class="bg-green-600 hover:bg-green-900">Join Group</Button></Dialog.Trigger
		>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Join New Group</Dialog.Title>
				<Dialog.Description>
					Enter the name and password of the group you want to join.
				</Dialog.Description>
			</Dialog.Header>

			<form
				on:submit={handleSubmit}
				use:enhance={({ formElement, formData, action, cancel, submitter }) => {
					isLoading = true;

					return async ({ result, update }) => {
						isLoading = false;

						if (result.type === 'success') {
							console.log('Here');
						}

						await update({invalidateAll: false});
					};
				}}
				action="?/join"
				method="post"
			>
				<input hidden name="userId" value={data.user[0].userId} />
				<div class="grid gap-4 py-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<Label class="text-right">Group Name</Label>
						<Input
							required
							disabled={isLoading}
							name="groupName"
							placeholder="type group name"
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label class="text-right">Password</Label>
						<Input
							required
							disabled={isLoading}
							name="password"
							placeholder="type password"
							class="col-span-3"
						/>
					</div>
				</div>

				<Dialog.Footer>
					<Button type="submit" disabled={isLoading}
						>{#if isLoading}
							<i class="fa fa-spinner fa-spin px-3" style="font-size:24px" />
						{/if}Join</Button
					>
				</Dialog.Footer>
			</form>
		</Dialog.Content>
	</Dialog.Root>
	{#if !myGroups}
		<div class="flex h-full w-full items-center justify-center">
			<Circle size="60" color="#FF3E00" unit="px" duration="1s" />
		</div>
	{:else}
		<Pagination.Root count={Object.keys(myGroups).length} {perPage} let:pages let:currentPage>
			{#each Array(perPage) as _, i}
				{#if i < Object.keys(myGroups).length}
					<Card.Root class="my-5 w-11/12 hover:shadow">
						<div class="flex flex-row">
							<img
								src={myGroups[perPage * ((currentPage || 1) - 1) + i].group.imageLink + '?' + Date.now().toString()}
								alt="cover"
								width="200px"
							/>
							<div class="w-full">
								<Card.Header>
									<Card.Title
										>{myGroups[perPage * ((currentPage || 1) - 1) + i].group.groupName}</Card.Title
									>
									<!-- <Card.Description
										>{myGroups[perPage * ((currentPage || 1) - 1) + i].group
											.description}</Card.Description
									> -->
								</Card.Header>
								<Card.Content>
									<p>{myGroups[perPage * ((currentPage || 1) - 1) + i].group.description}</p>
								</Card.Content>
								<Card.Footer class="text-sm">
									<p>
										Created At: {myGroups[
											perPage * ((currentPage || 1) - 1) + i
										].group.createdAt.split('T')[0]}
									</p>
								</Card.Footer>
							</div>
							<div class="my-auto">
								<Button
									href="./my-group/{myGroups[perPage * ((currentPage || 1) - 1) + i].groupId}"
									class="bg-white hover:bg-muted"><RightArrow /></Button
								>
							</div>
						</div>
					</Card.Root>
				{/if}
			{/each}
			<Pagination.Content>
				<Pagination.Item>
					<Pagination.PrevButton />
				</Pagination.Item>
				{#each pages as page (page.key)}
					{#if page.type === 'ellipsis'}
						<Pagination.Item>
							<Pagination.Ellipsis />
						</Pagination.Item>
					{:else}
						<Pagination.Item>
							<Pagination.Link {page} isActive={currentPage == page.value}>
								{page.value}
							</Pagination.Link>
						</Pagination.Item>
					{/if}
				{/each}
				<Pagination.Item>
					<Pagination.NextButton />
				</Pagination.Item>
			</Pagination.Content>
		</Pagination.Root>
	{/if}
</div>

<style>
    :root {
        --toastContainerTop: 1rem;
        --toastContainerRight: auto;
        --toastContainerBottom: auto;
        --toastContainerLeft: calc(50% - 8rem); /* Adjust the width of the container as needed */
    }
</style>
