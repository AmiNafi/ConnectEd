<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from '../../$types';
	import type { blog } from '$lib/server/schema';
	import Breadcrumb from '$lib/components/others/breadcrumb.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import Upvote from '$lib/components/svg/upvote.svelte';
	import Upvoted from '$lib/components/svg/upvoted.svelte';
	import Downvote from '$lib/components/svg/downvote.svelte';
	import Downvoted from '$lib/components/svg/downvoted.svelte';

	export let data: LayoutData;
	const userData = data.user[0];
	const userBlogs = userData.blogs as blog[];
	const currentBlog = userBlogs.filter((blog: blog) => {
		return blog.blogId?.toString() == $page.params.blogId;
	})[0];

	let items = [
		{ href: './', text: 'My Blogs' },
		{ href: './my-blog/' + $page.params.blogId, text: currentBlog.blogTitle }
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
</script>

<div class="flex grow flex-col items-center">
	<div class="flex w-full flex-row flex-wrap items-start justify-start">
		<Breadcrumb {items} />
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
		<div class="flex flex-row">
			<Upvote design="hover:scale-105"/>
			<Downvote design="hover:scale-105"/>
            <div class="ml-5">{currentBlog.upvote}</div>
		</div>
		<!-- Upvote and Downvote section at the bottom with SVG icons -->
		<div class="mt-4 flex items-center justify-start"></div>
	</div>
</div>
