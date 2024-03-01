<script lang="ts">
	import { page } from '$app/stores';
	import SidebarNav from '$lib/components/others/sidebar.svelte';
	import { Separator } from '$lib/components/ui/separator';

	const sidebarNavItems = [
		{
			title: 'My Groups',
			href: '/home/group/my-group'
		},
		{
			title: 'Create New Group',
			href: '/home/group/new-group'
		}
	];
</script>

{#if $page.url.pathname.includes('/video-call')}
	<slot />
{:else}
	<div class="flex flex-row space-x-12 space-y-0">
		<aside class="sticky top-0 h-screen w-fit border border-gray-400 bg-gray-100">
			<SidebarNav items={sidebarNavItems} />
		</aside>
		<!-- <aside class="sticky top-0 h-screen bg-gray-100 w-fit">
		<SidebarNav items={sidebarNavItems} />
	</aside> -->

		<slot />
	</div>
{/if}
