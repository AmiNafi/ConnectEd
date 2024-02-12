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
	import type { PageData } from '../$types';

	export let data: PageData;
	const userData = data.user[0];
	const blogs = data.searchResult;
	const currentBlog = blogs.filter((blog: blog) => {
		return blog.blogId?.toString() == $page.params.blogId;
	})[0];

	let items = [
		{ href: './', text: 'Explore Blogs' },
		{ href: './' + $page.params.blogId, text: currentBlog.blogTitle }
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

	let commentList = [
		{
			author: '1',
			date: '1',
			content: '1'
		},
		{
			author: '1',
			date: '1',
			content: '1'
		},
		{
			author: '1',
			date: '1',
			content: '1'
		}
	];
</script>

<div class="flex grow flex-col items-center">
	<div class="flex w-full flex-row flex-wrap justify-between">
		<Breadcrumb {items} />
		<!-- <a href="./{currentBlog.blogId}/settings"><Setting/></a> -->
	</div>
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
				Created on <span class="font-medium">{currentBlog.createdAt?.toString().split('T')[0]}</span
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
		<!-- <div class="flex flex-row">
			<Upvote design="hover:scale-105"/>
			<Downvote design="hover:scale-105"/>
            <div class="ml-5">{currentBlog.upvote}</div>
		</div> -->
		<!-- Upvote and Downvote section at the bottom with SVG icons -->
		<div class="mt-4 flex items-center justify-start"></div>

		<div class="comment-section">
			<h2>Leave a Comment</h2>
			<form>
				<textarea name="comment" required></textarea>
				<button type="submit">Submit</button>
			</form>

			<h2>Comments</h2>
			{#each commentList as comment}
				<div class="comment">
					<div class="comment-header">
						<span>{comment.author}</span>
						<span>{comment.date}</span>
					</div>
					<div class="comment-content">
						{comment.content}
					</div>
				</div>
			{/each}
		</div>
	</div>
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

	button {
		background-color: #4caf50;
		color: white;
		padding: 8px 15px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}

	button:hover {
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
