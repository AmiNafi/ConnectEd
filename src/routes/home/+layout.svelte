<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Avatar from '$lib/components/ui/avatar';
	import type { LayoutData } from './$types';
	import * as Popover from "$lib/components/ui/popover";
	import { onMount } from 'svelte';
	import logo from '$lib/assets/logo.png'
	import logo2 from '$lib/assets/logo2.png'
	import { page } from '$app/stores';

	export let data: LayoutData;
	$: pathName = $page.url.pathname as string;

	let unreadList: any = null

	onMount(() => {
		data.unreadList.then((res)=>{
			unreadList = res
		})
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
					{#if !unreadList}
					<img src="https://dgymikmkauskxfhmhudw.supabase.co/storage/v1/object/public/Misc/notification-bell-svgrepo-com.svg?t=2024-03-04T03%3A31%3A46.795Z"
					width="40px" alt="asd"/>
					{:else if unreadList.length==0 }
					<img src="https://dgymikmkauskxfhmhudw.supabase.co/storage/v1/object/public/Misc/notification-bell-svgrepo-com.svg?t=2024-03-04T03%3A31%3A46.795Z"
					width="40px" alt="asd"/>
					{:else}
					<Popover.Root>
						<Popover.Trigger><img src="https://dgymikmkauskxfhmhudw.supabase.co/storage/v1/object/public/Misc/noti-3.svg?t=2024-03-04T03%3A49%3A12.134Z"
							width="40px" alt="asd" class="hover:scale-110"/></Popover.Trigger>
						<Popover.Content>
							<div class="space-y-4">
							{#each unreadList as it}
							
								<!-- Notification 1 -->
								<div class="bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow-md" role="alert">
								  <div class="flex">
									<div class="py-1"><svg class="fill-current h-6 w-6 text-blue-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM4 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg></div>
									<div>
									  <p class="font-bold">Unread Message</p>
									  <p class="text-sm"><a href="../profile/chat/{it.user1Id}">{it.user1Name} sent a message</a></p>
									</div>
								  </div>
								</div>
							
							{/each}
						</div>
							  
								<!-- <div class="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md" role="alert">
								  <div class="flex">
									<div class="py-1"><svg class="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM4 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg></div>
									<div>
									  <p class="font-bold">Notification 2</p>
									  <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
									</div>
								  </div>
								</div>
							  
								<div class="bg-yellow-100 border-t-4 border-yellow-500 rounded-b text-yellow-900 px-4 py-3 shadow-md" role="alert">
								  <div class="flex">
									<div class="py-1"><svg class="fill-current h-6 w-6 text-yellow-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM4 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg></div>
									<div>
									  <p class="font-bold">Notification 3</p>
									  <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
									</div>
								  </div>
								</div>
							  </div> -->
						</Popover.Content>
					  </Popover.Root>
					
					{/if}
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
