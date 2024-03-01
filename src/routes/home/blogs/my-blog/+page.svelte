<script lang="ts">
	import type { LayoutData } from '../$types';
	import type { blog } from '$lib/server/schema';
	import Breadcrumb from '$lib/components/others/breadcrumb.svelte';
	import { Label } from '$lib/components/ui/label';
	import Button from '$lib/components/ui/button/button.svelte';
	import RightArrow from '$lib/components/others/right-arrow.svelte';
	import * as Card from '$lib/components/ui/card';
	import BlogSVG from '$lib/components/others/blogSVG.svelte';

	export let data: LayoutData;
	const userData = data.user[0];
	const userBlogs = userData.blogs as blog[];

	let items = [{ href: 'home/blogs/my-blog/', text: 'My Blogs' }];

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
	<Label class="mt-10 text-center text-3xl font-medium">My Blogs</Label>
	{#each userBlogs as blog}
		<Card.Root class="my-5 w-11/12 hover:shadow">
			<div class="flex flex-row">
				<BlogSVG/>
				<div class="w-full">
					<Card.Header>
						<Card.Title>{blog.blogTitle}</Card.Title>
					</Card.Header>
					<Card.Content>
						<p>Written by <span class="">{userData.userName}</span></p>
						<p>
							Created on <span class="">{blog.createdAt?.toString().split('T')[0]}</span>
						</p>
						<p>Upvotes: <span class="">{blog.upvote}</span></p>
					</Card.Content>
					<Card.Footer class="flex flex-wrap gap-2">
						{#each blog.tags as tag}
							<span
								class="rounded-full px-2 py-1 text-xs transition-colors hover:bg-gray-200"
								style="background-color: {generateColour(tag)}">{tag}</span
							>
						{/each}
					</Card.Footer>
				</div>
				<div class="my-auto">
					<Button href="./my-blog/{blog.blogId}" class="bg-white hover:bg-muted"
						><RightArrow /></Button
					>
				</div>
			</div>
		</Card.Root>
		<!-- <div class="mx-auto mt-8 w-full max-w-full p-4">

			<div class="blog-card rounded-lg border bg-white p-6 shadow-md">

				<div class="flex flex-row justify-between">
					<div>
						<h3 class="mb-2 text-2xl font-semibold text-gray-800">{blog.blogTitle}</h3>
						<p class="mb-2 text-sm text-gray-600">
							Written by <span class="font-medium">{userData.userName}</span>
						</p>
						<p class="mb-2 text-sm text-gray-600">
							Created on <span class="font-medium">{blog.createdAt?.toString().split('T')[0]}</span>
						</p>
						<p class="mb-2 text-sm text-gray-600">
							Upvotes: <span class="font-medium">{blog.upvote}</span>
						</p>
						<div class="flex flex-wrap gap-2">
							{#each blog.tags as tag}
								<span
									class="rounded-full px-2 py-1 text-xs transition-colors hover:bg-gray-200"
									style="background-color: {generateColour(tag)}">{tag}</span
								>
							{/each}
						</div>
					</div>
					<div class="my-auto">
						<Button
							href="./my-blog/{blog.blogId}"
							class="bg-white hover:bg-muted"><RightArrow /></Button
						>
					</div>
				</div>
			</div>
		</div> -->
	{/each}
</div>

<style>
	/* Add your custom styles here */
	.blog-card {
		transition: transform 0.1s ease-in-out;
		border-width: 2px;
		border-color: #e2e8f0;
	}

	.blog-card:hover {
		transform: scale(1.01);
	}
</style>
