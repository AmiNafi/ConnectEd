<script lang="ts">
	import { page } from '$app/stores';
	import type { blog } from '$lib/server/schema';
	import Breadcrumb from '$lib/components/others/breadcrumb.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import Setting from '$lib/components/others/setting.svelte';
	import Upvote from '$lib/components/svg/upvote.svelte';
	import Upvoted from '$lib/components/svg/upvoted.svelte';
	import Downvote from '$lib/components/svg/downvote.svelte';
	import Downvoted from '$lib/components/svg/downvoted.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { Circle } from 'svelte-loading-spinners';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Textarea } from '$lib/components/ui/textarea';

	export let data: PageData;
	export let form: ActionData;

	// const blogs = data.searchResult;
	let currentBlog: any = null;
	let blogComments: any = null;

	// let items = [
	// { href: './', text: 'Explore Blogs' }
	// { href: './' + $page.params.blogId, text: currentBlog.blogTitle }
	// ];

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

	let comment = '';

	onMount(() => {
		data.currentBlog.then((res) => {
			currentBlog = res[0];
			console.log(res[0]);
			// items = [...items, { href: './' + $page.params.blogId, text: currentBlog.blogTitle }];
		});

		data.blogComments.then((res) => {
			blogComments = res;
		});
	});
</script>

<div class="flex grow flex-col items-center">
	<div class="flex w-full flex-row flex-wrap justify-between">
		<!-- <Breadcrumb {items} /> -->
		<!-- <a href="./{currentBlog.blogId}/settings"><Setting/></a> -->
	</div>
	{#if currentBlog && blogComments}
		<!-- <Label class="mt-10 text-center text-3xl font-medium">{currentBlog.blogTitle}</Label> -->
		<div
			class="mx-auto w-full max-w-screen-lg rounded-md border border-gray-300 bg-white p-10 shadow-md"
		>
			<!-- Title at the top center -->
			<h1 class="mb-4 text-center text-3xl font-bold">{currentBlog.blogTitle}</h1>

			<!-- Information in a line below the title -->
			<div class="flex flex-row justify-center gap-5">
				<p class="mb-2 text-sm text-gray-600">
					Created on <span class="font-medium"
						>{currentBlog.createdAt?.toString().split('T')[0]}</span
					>
				</p>
				<p class="mb-2 text-sm text-gray-600">
					Upvotes: <span class="font-medium">{currentBlog.upvote}</span>
				</p>
			</div>

			<!-- Tags in a line below the information -->
			<div class="flex flex-wrap gap-2">
				{#if currentBlog.tags}
					{#each currentBlog.tags as tag}
						<span
							class="rounded-full bg-gray-200 px-2 py-1 text-xs"
							style="background-color: {generateColour(tag)}">{tag}</span
						>
					{/each}
				{/if}
			</div>

			<Separator class="m-5" />
			<!-- Content of the blog -->
			{@html currentBlog.blogContent}
			<Separator class="m-5" />
		</div>

		<!-- Upvote and Downvote section at the bottom with SVG icons -->
		<!-- <div class="mt-4 flex items-center justify-start"></div> -->
		<div class="comment-section max-w-screen-l w-full">
			<div class="antialiased">
				<h3 class="mb-4 text-lg font-semibold text-gray-900">Comments</h3>

				<div class="mb-10 space-y-4">
					{#each blogComments as comment}
						<div class="flex">
							<div class="mr-3 flex-shrink-0">
								<img
									class="mt-2 h-8 w-8 rounded-full sm:h-10 sm:w-10"
									src={comment.imageLink}
									alt=""
								/>
							</div>
							<div class="flex-1 rounded-lg border px-4 py-2 leading-relaxed sm:px-6 sm:py-4">
								<strong>{comment.userName}</strong>
								<span class="text-xs text-gray-400"
									>{comment.createdAt.toString().split('T')[0]}</span
								>
								<p class="text-sm">
									{comment.comment}
								</p>
								<!-- <div class="mt-4 flex items-center">
					<div class="flex -space-x-2 mr-2">
					  <img class="rounded-full w-6 h-6 border border-white" src="https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" alt="">
					  <img class="rounded-full w-6 h-6 border border-white" src="https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" alt="">
					</div>
					<div class="text-sm text-gray-500 font-semibold">
					  5 Replies
					</div>
				  </div> -->
							</div>
						</div>
					{/each}

					<!-- <div class="flex">
					<div class="mr-3 flex-shrink-0">
						<img
							class="mt-2 h-8 w-8 rounded-full sm:h-10 sm:w-10"
							src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
							alt=""
						/>
					</div>
					<div class="flex-1 rounded-lg border px-4 py-2 leading-relaxed sm:px-6 sm:py-4">
						<strong>Sarah</strong> <span class="text-xs text-gray-400">3:34 PM</span>
						<p class="text-sm">
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
							invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
						</p> -->

					<!-- <h4 class="my-5 uppercase tracking-wide text-gray-400 font-bold text-xs">Replies</h4>
		  
				  <div class="space-y-4">
					<div class="flex">
					  <div class="flex-shrink-0 mr-3">
						<img class="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt="">
					  </div>
					  <div class="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
						<strong>Sarah</strong> <span class="text-xs text-gray-400">3:34 PM</span>
						<p class="text-xs sm:text-sm">
						  Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
						  sed diam nonumy eirmod tempor invidunt ut labore et dolore
						  magna aliquyam erat, sed diam voluptua.
						</p>
					  </div>
					</div>
					<div class="flex">
					  <div class="flex-shrink-0 mr-3">
						<img class="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt="">
					  </div>
					  <div class="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
						<strong>Sarah</strong> <span class="text-xs text-gray-400">3:34 PM</span>
						<p class="text-xs sm:text-sm">
						  Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
						  sed diam nonumy eirmod tempor invidunt ut labore et dolore
						  magna aliquyam erat, sed diam voluptua.
						</p>
					  </div>
					</div> 
				  </div> -->
					<!-- </div> -->
					<!-- </div> -->
				</div>
			</div>
		</div>
	{:else}
		<div class="flex h-full w-full items-center justify-center">
			<Circle size="60" color="#FF3E00" unit="px" duration="1s" />
		</div>
	{/if}
</div>

<style>
	/* Base styles */
	.comment-section {
		padding: 20px;
		border-top: 1px solid #ccc;
	}

	/* Form styles */
	form {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	textarea {
		resize: none;
		background-color: #f5f5f5;
		border: 1px solid #ddd;
		padding: 10px;
		font-family: sans-serif;
		font-size: 16px;
		line-height: 1.5;
	}

	textarea::placeholder {
		color: #ccc;
	}

	.button-1 {
		background-color: #4caf50;
		color: white;
		padding: 8px 15px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}

	.button-1:hover {
		background-color: #42814c;
	}

	/* Comment display styles */
	.comment {
		padding: 15px;
		border-bottom: 1px solid #ddd;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.comment-header {
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		color: #888;
	}

	.comment-content {
		font-size: 16px;
		line-height: 1.5;
	}
</style>
