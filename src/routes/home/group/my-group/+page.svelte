<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import Breadcrumb from '$lib/components/others/breadcrumb.svelte';
	import * as Pagination from '$lib/components/ui/pagination';
	import type { session } from '$lib/server/schema';
	import Favorite from '$lib/components/svg/favorite.svelte';
	import Favorited from '$lib/components/svg/favorited.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { Circle } from 'svelte-loading-spinners';
	import { onMount } from 'svelte';
	import * as Card from '$lib/components/ui/card';
	import RightArrow from '$lib/components/others/right-arrow.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let items = [{ href: '../', text: 'My Groups' }];

	export let data: PageData;
	const userData = data.user[0];
	let myGroups: any = [];
	let perPage = 5;

	onMount(() => {
		data.myGroups.then((res) => {
			myGroups = res;
			// console.log(res)
		});
	});
</script>

<div class="flex grow flex-col items-center">
	<div class="flex w-full flex-row flex-wrap items-start justify-start">
		<Breadcrumb {items} />
	</div>
	<Label class="mb-10 mt-10 text-center text-3xl font-medium">My Groups</Label>
	{#if myGroups.length == 0}
		<div class="flex h-full w-full items-center justify-center">
			<Circle size="60" color="#FF3E00" unit="px" duration="1s" />
		</div>
	{:else}
		<Pagination.Root count={Object.keys(myGroups).length} {perPage} let:pages let:currentPage>
			{#each Array(perPage) as _, i}
				{#if i < Object.keys(myGroups).length}
					<Card.Root class="my-5 w-11/12 hover:shadow">
						<div class="flex flex-row">
							<img src={myGroups[perPage * ((currentPage || 1) - 1) + i].group.imageLink} alt="cover" width=200px/>
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
									<p>{myGroups[perPage * ((currentPage || 1) - 1) + i].group
										.description}</p>
								</Card.Content>
								<Card.Footer class="text-sm">
									<p>Created At: {myGroups[perPage * ((currentPage || 1) - 1) + i].group
										.createdAt.split('T')[0]}</p>
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
