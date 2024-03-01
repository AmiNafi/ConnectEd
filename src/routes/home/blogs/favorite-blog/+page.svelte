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
	import * as Card from '$lib/components/ui/card';
	import BlogSVG from '$lib/components/others/blogSVG.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import RightArrow from '$lib/components/others/right-arrow.svelte';
	import { Circle } from 'svelte-loading-spinners';
	import { onMount } from 'svelte';

	let items = [{ href: 'home/blogs/favorite-blog', text: 'Favorite Blogs' }];

	export let data: PageData;

	const userData = data.user[0];
	let searchResult: any = null;
	let perPage = 5;
	let cnt: number;

	function onUnFav(index: number, blogId: number) {
		searchResult.splice(index, 1);
		searchResult = searchResult;
	}

	let sortBy = '';

	onMount(() => {
		data.favoriteBlogs.then((res) => {
			searchResult = res;
			cnt = Math.max(Object.keys(searchResult).length, 1);
		});
	});

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
</script>

<div class="flex grow flex-col items-center">
	<div class="flex w-full flex-row flex-wrap items-start justify-start">
		<Breadcrumb {items} />
	</div>
	<Label class="mt-10 text-center text-3xl font-medium">Favorite Blogs</Label>

	{#if !searchResult}
		<div class="flex h-full w-full items-center justify-center">
			<Circle size="60" color="#FF3E00" unit="px" duration="1s" />
		</div>
	{:else}
		<Pagination.Root count={cnt} {perPage} let:pages let:currentPage>
			{#each Array(perPage) as _, i}
				{#if i < Object.keys(searchResult).length}
					<Card.Root class="my-5 w-11/12 hover:shadow">
						<div class="flex flex-row">
							<BlogSVG />
							<div class="w-full">
								<Card.Header>
									<Card.Title>
										{searchResult[perPage * ((currentPage || 1) - 1) + i].blog.blogTitle}
									</Card.Title>
								</Card.Header>
								<Card.Content>
									<p>
										Written by <span class=""
											>{searchResult[perPage * ((currentPage || 1) - 1) + i].blog.writer
												.userName}</span
										>
									</p>
									<p>
										Created on <span class=""
											>{searchResult[perPage * ((currentPage || 1) - 1) + i].blog.createdAt
												?.toString()
												.split('T')[0]}</span
										>
									</p>
									<p>
										Upvotes: <span class=""
											>{searchResult[perPage * ((currentPage || 1) - 1) + i].blog.upvote}</span
										>
									</p>
								</Card.Content>
								<Card.Footer class="flex flex-wrap gap-2">
									{#each searchResult[perPage * ((currentPage || 1) - 1) + i].blog.tags as tag}
										<span
											class="rounded-full px-2 py-1 text-xs transition-colors hover:bg-gray-200"
											style="background-color: {generateColour(tag)}">{tag}</span
										>
									{/each}
								</Card.Footer>
							</div>
							<div class="flex flex-col">
								<div class="my-auto">
									<button class="flex items-center rounded-full px-4 py-2 text-white">
										<form
											use:enhance={() => {
												return async ({ update }) => {
													update({ reset: false, invalidateAll: false });
												};
											}}
											action="?/unfavorite"
											method="post"
											on:submit={() => {
												onUnFav(
													perPage * ((currentPage || 1) - 1) + i,
													searchResult[perPage * ((currentPage || 1) - 1) + i].blog.blogId
												);
											}}
										>
											<input hidden id="userId" name="userId" value={userData.userId} />
											<input
												hidden
												id="blogId"
												name="blogId"
												value={searchResult[perPage * ((currentPage || 1) - 1) + i].blog.blogId}
											/>
											<button type="submit"><Favorited design="hover:scale-110" /></button>
										</form>
									</button>
								</div>
								<div class="my-auto">
									<Button
										href="./favorite-blog/{searchResult[perPage * ((currentPage || 1) - 1) + i].blog
											.blogId}"
										class="bg-white hover:bg-muted"><RightArrow /></Button
									>
								</div>
							</div>
						</div>
					</Card.Root>
					<!-- <div class="blog-card">
						<div class="flex justify-end">
							<button class="flex items-center rounded-full px-4 py-2 text-white">
								<form
									use:enhance={() => {
										return async ({ update }) => {
											update({ reset: false, invalidateAll: false });
										};
									}}
									action="?/unfavorite"
									method="post"
									on:submit={() => {
										onUnFav(
											perPage * ((currentPage || 1) - 1) + i,
											searchResult[perPage * ((currentPage || 1) - 1) + i].blog.blogId
										);
									}}
								>
									<input hidden id="userId" name="userId" value={userData.userId} />
									<input
										hidden
										id="blogId"
										name="blogId"
										value={searchResult[perPage * ((currentPage || 1) - 1) + i].blog.blogId}
									/>
									<button type="submit"><Favorited design="hover:scale-110" /></button>
								</form>
							</button>
						</div>

						<div class="flex flex-row justify-between">
							<div>
								<h2>{searchResult[perPage * ((currentPage || 1) - 1) + i].blog.blogTitle}</h2>
								<p class="blog-info">
									Created by {searchResult[perPage * ((currentPage || 1) - 1) + i].blog.writer
										.userName} on {searchResult[
										perPage * ((currentPage || 1) - 1) + i
									].createdAt.split('T')[0]}
								</p>

								<div class="tags">
									{#if searchResult[perPage * ((currentPage || 1) - 1) + i].blog.tags != null}
										{#each searchResult[perPage * ((currentPage || 1) - 1) + i].blog.tags as tag (tag)}
											<span class="tag" style="background-color: {generateColour(tag)}">{tag}</span>
										{/each}
									{:else}
										<p class="message">No tags available</p>
									{/if}
								</div>
							</div>
							<div class="my-auto">
								<Button
									href="./favorite-blog/{searchResult[perPage * ((currentPage || 1) - 1) + i].blog.blogId}"
									class="bg-white hover:bg-muted"><RightArrow />
								</Button>
							</div>
						</div>
					</div> -->
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
