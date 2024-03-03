<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Avatar from '$lib/components/ui/avatar';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';
	import logo from '$lib/assets/logo.png'
	import logo2 from '$lib/assets/logo2.png'
	import { page } from '$app/stores';

	export let data: LayoutData;
	$: pathName = $page.url.pathname as string;
	onMount(() => {
		console.log($page.url.pathname);
		// console.log(data.user[0].sessions[0]);
	});
</script>

{#if $page.url.pathname.includes('/video-call')}
	<slot />
{:else}
	<body class="inset-0 flex min-h-screen w-full flex-col bg-white">
		<nav class="flex w-full flex-wrap items-center justify-between bg-gray-800 p-6">
			<div class="mr-6 flex flex-shrink-0 items-center text-white">
				<img src={logo2} width="180px" class="mb-1" alt="logo"/>
				<!-- <span class="text-3xl font-medium tracking-tight">Connected</span> -->
			</div>

			<div class="flex w-auto flex-grow items-center">
				<div class="flex-grow text-sm">
					{#if pathName.includes('session/')}
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
					{#if pathName.includes('session-bank')}
						<a
							href="/home/session-bank/explore-session"
							class="mr-4 text-base text-blue-200 underline hover:scale-110 hover:text-white"
						>
							SessionBank
						</a>
					{:else}
						<a
							href="/home/session-bank/explore-session"
							class="mr-4 text-base text-blue-200 hover:scale-110 hover:text-white"
						>
							SessionBank
						</a>
					{/if}
					{#if pathName.includes('find-a-mate')}
						<a
							href="/home/find-a-mate/request-board"
							class="mr-4 text-base text-blue-200 underline hover:scale-110 hover:text-white"
						>
							Find-a-Mate
						</a>
					{:else}
						<a
							href="/home/find-a-mate/request-board"
							class="mr-4 text-base text-blue-200 hover:scale-110 hover:text-white"
						>
							Find-a-Mate
						</a>
					{/if}
					{#if pathName.includes('group')}
						<a
							href="/home/group/my-group"
							class="mr-4 text-base text-blue-200 underline hover:scale-110 hover:text-white"
						>
							Groups
						</a>
					{:else}
						<a
							href="/home/group/my-group"
							class="mr-4 text-base text-blue-200 hover:scale-110 hover:text-white"
						>
							Groups
						</a>
					{/if}
					{#if pathName.includes('blog')}
						<a
							href="/home/blogs/explore-blog"
							class="mr-4 text-base text-blue-200 underline hover:scale-110 hover:text-white"
						>
							Blogs
						</a>
					{:else}
						<a
							href="/home/blogs/explore-blog"
							class="mr-4 text-base text-blue-200 hover:scale-110 hover:text-white"
						>
							Blogs
						</a>
					{/if}
				</div>
				<div class="flex flex-row gap-5">
					<a href="/home/profile/my-profile">
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
{/if}
