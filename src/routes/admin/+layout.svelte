<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Popover from "$lib/components/ui/popover";
	import { onMount } from 'svelte';
	import logo from '$lib/assets/logo.png'
	import logo2 from '$lib/assets/logo2.png'
	import { page } from '$app/stores';

	$: pathName = $page.url.pathname as string;

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
					{#if pathName.includes('active')}
						<a
							href="/admin/active-reports/blog-report"
							class="mr-4 text-base text-blue-200 underline hover:scale-125 hover:text-white"
						>
							Active Reports
						</a>
					{:else}
						<a
							href="/admin/active-reports/blog-report"
							class="mr-4 text-base text-blue-200 hover:scale-150 hover:text-white"
						>
							Active Reports
						</a>
					{/if}
					{#if pathName.includes('resolved')}
						<a
						href="/admin/resolved-reports/blog-report"
							class="mr-4 text-base text-blue-200 underline hover:scale-110 hover:text-white"
						>
							Resolved Reports
						</a>
					{:else}
						<a
						href="/admin/resolved-reports/blog-report"
							class="mr-4 text-base text-blue-200 hover:scale-110 hover:text-white"
						>
							Resolved Reports
						</a>
					{/if}
				</div>
				<div class="flex flex-row gap-5">
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
