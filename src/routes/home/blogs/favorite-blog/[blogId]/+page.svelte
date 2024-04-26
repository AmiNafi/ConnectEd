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
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { Circle } from 'svelte-loading-spinners';

	export let data: PageData;
	export let form: ActionData;

	const userData = data.user[0];
	// const blogs = data.searchResult;
	let currentBlog: any;
	let blogComments: any;

	let items = [
		{ href: './', text: 'Favorite Blogs' }
		// { href: './' + $page.params.blogId, text: currentBlog.blogTitle }
	];

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

	$: {
		if (form?.success == 'comment') {
			console.log(form?.success);
			console.log(form?.newComment);
			blogComments.push(form.newComment[0]);
			blogComments = blogComments;
			form.success = '';
		}
	}

	function upvote() {
		let tmp: number
		if(currentBlog.blogVotes[0]){
			tmp = currentBlog.blogVotes[0].vote
			currentBlog.upvote += 2
		}
		else{
			currentBlog.upvote += 1
			tmp = 0
		}
		currentBlog.blogVotes = [];
		currentBlog.blogVotes = [...currentBlog.blogVotes, { vote: 1 }];

		fetch('/api/blog/unvote', {
			method: 'POST',
			body: JSON.stringify({ blogId: currentBlog.blogId, userId: userData.userId, vote: -tmp })
		}).then(() => {
			fetch('/api/blog/vote', {
				method: 'POST',
				body: JSON.stringify({ blogId: currentBlog.blogId, userId: userData.userId, vote: 1 })
			});
		});
	}

	function downvote() {
		let tmp: number
		if(currentBlog.blogVotes[0]){
			tmp = currentBlog.blogVotes[0].vote
			currentBlog.upvote -= 2
		}
		else{
			currentBlog.upvote -= 1
			tmp = 0
		}
		currentBlog.blogVotes = [];
		currentBlog.blogVotes = [...currentBlog.blogVotes, { vote: -1 }];

		fetch('/api/blog/unvote', {
			method: 'POST',
			body: JSON.stringify({ blogId: currentBlog.blogId, userId: userData.userId, vote: -tmp })
		}).then(() => {
			fetch('/api/blog/vote', {
				method: 'POST',
				body: JSON.stringify({ blogId: currentBlog.blogId, userId: userData.userId, vote: -1 })
			});
		});
	}

	function unvote() {
		let tmp = currentBlog.blogVotes[0].vote
		currentBlog.upvote -= tmp
		currentBlog.blogVotes = [];

		fetch('/api/blog/unvote', {
			method: 'POST',
			body: JSON.stringify({ blogId: currentBlog.blogId, userId: userData.userId, vote: -tmp })
		});
	}

	onMount(() => {
		data.currentBlog.then((res) => {
			currentBlog = res[0];
			console.log(res[0]);
			items = [...items, { href: './' + $page.params.blogId, text: currentBlog.blogTitle }];
		});

		data.blogComments.then((res) => {
			blogComments = res;
		});
	});
</script>

<div class="flex grow flex-col items-center">
	<div class="flex w-full flex-row flex-wrap justify-between">
		<Breadcrumb {items} />
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
					Written by <span class="font-medium">{userData.userName}</span>
				</p>
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
				{#each currentBlog.tags as tag}
					<span
						class="rounded-full bg-gray-200 px-2 py-1 text-xs"
						style="background-color: {generateColour(tag)}">{tag}</span
					>
				{/each}
			</div>
			<Separator class="m-5" />
			<!-- Content of the blog -->
			{@html currentBlog.blogContent}
			<Separator class="m-5" />
			<div class="flex flex-row">
				{#if currentBlog.blogVotes[0]}
					{#if currentBlog.blogVotes[0].vote == 1}
						<button
							on:click={() => {
								unvote();
							}}><Upvoted design="hover:scale-105" /></button
						>
						<button
							on:click={() => {
								downvote();
							}}><Downvote design="hover:scale-105" /></button
						>
					{:else}
						<button
							on:click={() => {
								upvote();
							}}><Upvote design="hover:scale-105" /></button
						>
						<button
							on:click={() => {
								unvote();
							}}><Downvoted design="hover:scale-105" /></button
						>
					{/if}
				{:else}
					<button
						on:click={() => {
							upvote();
						}}><Upvote design="hover:scale-105" /></button
					>
					<button
						on:click={() => {
							downvote();
						}}><Downvote design="hover:scale-105" /></button
					>
				{/if}
				<div class="ml-5">{currentBlog.upvote}</div>
			</div>
			<!-- Upvote and Downvote section at the bottom with SVG icons -->
			<!-- <div class="mt-4 flex items-center justify-start"></div> -->
		</div>
		<div class="comment-section max-w-screen-l w-full">
			<h2>Leave a Comment</h2>
			<form
			use:enhance={() => {
				return async ({ update }) => {
					update({ reset: false, invalidateAll:false });
				};
			}}
				action="?/comment"
				method="post"
				on:submit={() => {
					comment = '';
				}}
			>
				<input hidden name="blogId" value={$page.params.blogId} />
				<input hidden name="userId" value={userData.userId} />
				<input hidden name="userName" value={userData.userName} />
				<input hidden name="imageLink" value={userData.imageLink} />
				<textarea name="comment" bind:value={comment} required></textarea>
				<button type="submit" class="button-1">Submit</button>
			</form>

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
							</div>
						</div>
					{/each}
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
