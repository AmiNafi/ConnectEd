<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Avatar from '$lib/components/ui/avatar';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';
	import type { user } from '$lib/server/schema';
	import { page } from '$app/stores';

	export let data: LayoutData;
	$: pathName = $page.url.pathname as string;
	onMount(() => {
		console.log($page.url.pathname);
		console.log(data.user[0].sessions[0])
	});
</script>

<!-- <body class="inset-0 flex min-h-screen w-full flex-col bg-gradient-to-br from-blue-300 to-blue-500"> -->
<!-- <body class="inset-0 flex min-h-screen w-full flex-col bg-blue-400"> -->
	<body class="inset-0 flex min-h-screen w-full flex-col bg-white">	
	<nav class="flex w-full flex-wrap items-center justify-between bg-gray-800 p-6">
		<div class="mr-6 flex flex-shrink-0 items-center text-white">
			<svg
				class="mr-2 h-8 w-8 fill-current"
				width="54"
				height="54"
				viewBox="0 0 54 54"
				xmlns="http://www.w3.org/2000/svg"
				><path
					d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"
				/></svg
			>
			<span class="text-xl font-semibold tracking-tight">Connected</span>
		</div>

		<div class="flex w-auto flex-grow items-center">
			<div class="flex-grow text-sm">
				{#if pathName.includes('session')}
					<a
						href="/home/session/my-session"
						class="mr-4 text-base text-blue-200 underline hover:scale-125 hover:text-white"
					>
						Sessions
					</a>
				{:else}
					<a
						href="/home/session/my-session"
						class="mr-4 text-base text-blue-200 hover:scale-150 hover:text-white"
					>
						Sessions
					</a>
				{/if}
				{#if pathName.includes('sessionbank')}
					<a
						href="#responsive-header"
						class="mr-4 text-base text-blue-200 underline hover:scale-110 hover:text-white"
					>
						SessionBank
					</a>
				{:else}
					<a
						href="#responsive-header"
						class="mr-4 text-base text-blue-200 hover:scale-110 hover:text-white"
					>
						SessionBank
					</a>
				{/if}
				{#if pathName.includes('group')}
					<a
						href="#responsive-header"
						class="mr-4 text-base text-blue-200 underline hover:scale-110 hover:text-white"
					>
						SessionBank
					</a>
				{:else}
					<a
						href="#responsive-header"
						class="mr-4 text-base text-blue-200 hover:scale-110 hover:text-white"
					>
						SessionBank
					</a>
				{/if}
				{#if pathName.includes('blog')}
					<a
						href="#responsive-header"
						class="mr-4 text-base text-blue-200 underline hover:scale-110 hover:text-white"
					>
						Blogs
					</a>
				{:else}
					<a
						href="#responsive-header"
						class="mr-4 text-base text-blue-200 hover:scale-110 hover:text-white"
					>
						Blogs
					</a>
				{/if}
			</div>
			<div class="flex flex-row gap-5">
				<a href="/home/profile">
					{#await data.user}
					<Avatar.Root>
						<Avatar.Fallback></Avatar.Fallback>
					</Avatar.Root>
					{:then user}
					<Avatar.Root>
						<Avatar.Image src={user[0].imageLink + '?' + Date.now()} alt="@shadcn" />
						<Avatar.Fallback>{user[0].userName[0].toUpperCase()}</Avatar.Fallback>
					</Avatar.Root>
					{/await}
				</a>
				<form action="/logout" method="post">
					<Button type="submit" class="bg-blue-400 text-base text-black hover:bg-blue-500"
						>Logout</Button
					>
				</form>
			</div>
		</div>
	</nav>

	<slot />
</body>
