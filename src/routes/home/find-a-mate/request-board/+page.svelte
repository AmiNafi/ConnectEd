<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import Breadcrumb from '$lib/components/others/breadcrumb.svelte';
	import * as Pagination from '$lib/components/ui/pagination';
	import type { blog } from '$lib/server/schema';
	import type { ActionData, PageData } from './$types';
	import Favorite from '$lib/components/svg/favorite.svelte';
	import Favorited from '$lib/components/svg/favorited.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Circle } from 'svelte-loading-spinners';
	import RightArrow from '$lib/components/others/right-arrow.svelte';
	import { onMount } from 'svelte';

	let items = [{ href: 'home/find-a-mate', text: 'Request Board' }];

	export let data: PageData;
	export let form: ActionData;

	const userData = data.user[0];
	let searchResult: any = null;
	let perPage = 5;
	let cnt: number = 0;

	let name = '';
	let tag = '';
	let sortBy = '';

	onMount(() => {
		data.searchResult.then((res) => {
			searchResult = res;
			cnt = Math.max(Object.keys(searchResult).length, 1);
		});
	});

	$:{
		console.log(searchResult)
	}

	function generateColour(str: string) {
		// Simple hash function to generate a color based on the tag name
		const hash = hashString(str);
		const color = `hsl(${hash % 360}, 70%, 80%)`;
		return color;
	}
	function hashString(str: string) {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			const charCode = str.charCodeAt(i);
			hash = charCode + ((hash << 5) - hash); // Improved hash function
		}
		return hash;
	}

	$: {
		if (searchResult) {
			searchResult = searchResult.sort(function (x: any, y: any) {
				if (sortBy == 'oldest') {
					if (x.createdAt < y.createdAt) {
						return -1;
					}
					if (x.createdAt > y.createdAt) {
						return 1;
					}
					return 0;
				} else if (sortBy == 'newest') {
					if (x.createdAt < y.createdAt) {
						return 1;
					}
					if (x.createdAt > y.createdAt) {
						return -1;
					}
					return 0;
				} else {
					return 0;
				}
			});
		}
	}

	$: {
		console.log(form?.success);
		if (form?.success == 'search') {
			searchResult = form.searchResult;
			cnt = Math.max(Object.keys(searchResult).length, 1);
			form.success = '';
		}
	}
</script>

<div class="flex grow flex-col items-center">
	<div class="flex w-full flex-row flex-wrap items-start justify-start">
		<Breadcrumb {items} />
	</div>
	<Label class="mt-10 text-center text-3xl font-medium">Request Board</Label>
	<form
		class="mt-5 flex w-[90%] flex-row justify-between gap-20"
		use:enhance={() => {
			return async ({ update }) => {
				update({ reset: false, invalidateAll: false });
			};
		}}
		action="?/search"
		method="post"
		on:submit={() => {
			searchResult = null;
		}}
	>
		<input hidden id="userId" name="userId" value={userData.userId} />
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
		<Button class="bg-green-500 hover:bg-green-700" type="submit">Search</Button>
	</form>
	{#if !searchResult}
		<div class="flex h-full w-full items-center justify-center">
			<Circle size="60" color="#FF3E00" unit="px" duration="1s" />
		</div>
	{:else}
		<Pagination.Root count={cnt} {perPage} let:pages let:currentPage>
			{#each Array(perPage) as _, i}
				{#if i < Object.keys(searchResult).length}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div class="blog-card">
						<!-- <div class="blog-card"> -->
						<!-- on:click={() => {
						goto('explore-blog/' + searchResult[perPage * ((currentPage || 1) - 1) + i].blogId);
					}} -->
						<div class="flex flex-row justify-between">
							<div class="flex flex-row">
								<img
									src="https://dgymikmkauskxfhmhudw.supabase.co/storage/v1/object/public/Misc/notice.svg?t=2024-03-04T05%3A40%3A55.984Z"
									width="100px"
									alt="notice"
								/>
								<div class="ml-10">
									<h2>{searchResult[perPage * ((currentPage || 1) - 1) + i].title}</h2>
									<p>{searchResult[perPage * ((currentPage || 1) - 1) + i].description}</p>
									<p class="blog-info">
										Created by 
										<a href="../other-user/{searchResult[perPage * ((currentPage || 1) - 1) + i].userId}/profile" 
										class="hover:underline">{searchResult[perPage * ((currentPage || 1) - 1) + i].userName}</a>
										on {searchResult[
											perPage * ((currentPage || 1) - 1) + i
										].createdAt.split('T')[0]}
									</p>

									<div class="tags">
										{#if searchResult[perPage * ((currentPage || 1) - 1) + i].tags != null}
											{#each searchResult[perPage * ((currentPage || 1) - 1) + i].tags as tag (tag)}
												<span class="tag" style="background-color: {generateColour(tag)}"
													>{tag}</span
												>
											{/each}
										{:else}
											<p class="message">No tags available</p>
										{/if}
									</div>
								</div>
							</div>
							{#if searchResult[perPage * ((currentPage || 1) - 1) + i].userId!=userData.userId}
							<div class="my-auto">
								<Button href="../profile/chat/{searchResult[perPage * ((currentPage || 1) - 1) + i].userId}" class="border bg-white text-black hover:bg-muted"
									>Knock</Button
								>
							</div>
							{/if}
						</div>
						<!-- {#if Object.keys(searchResult[perPage * ((currentPage || 1) - 1) + i].courses).length > 0}
						<p class="blog-info">
							Courses: {searchResult[perPage * ((currentPage || 1) - 1) + i].courses
								.map((course) => course.courseName)
								.join(', ')}
						</p>
					{:else}
						<p class="message">No courses available</p>
					{/if} -->
					</div>
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
	/* Add your styles here */
	.blog-card {
		width: 90%;
		border: 1px solid #ccc;
		padding: 16px;
		margin: 16px;
		border-radius: 8px;
		transition: box-shadow 0.2s ease;
	}

	.blog-card:hover {
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Shadow effect on hover */
	}

	.blog-info {
		font-size: 14px;
		color: #555;
	}

	.tags {
		margin-top: 8px;
		display: flex;
		flex-wrap: wrap;
	}

	.tag {
		background-color: #eee;
		padding: 4px 8px;
		margin: 4px;
		border-radius: 4px;
	}

	.message {
		font-style: italic;
		color: #888;
	}
</style>
