<script lang="ts">
	import SidebarNav from '$lib/components/others/sidebar.svelte';
	import { Separator } from '$lib/components/ui/separator';

	const sidebarNavItems = [
		{
			title: 'Request Board',
			href: '/home/find-a-mate/request-board'
		},
		{
			title: 'My Requests',
			href: '/home/find-a-mate/my-request'
		},
		{
			title: 'Create Request',
			href: '/home/find-a-mate/new-request'
		}
	];
</script>

<div class="flex flex-row space-x-12 space-y-0">
	<aside class="sticky top-0 h-screen bg-gray-100 w-fit border border-gray-400">
		<SidebarNav items={sidebarNavItems} />
	</aside>
	<!-- <aside class="sticky top-0 h-screen bg-gray-100 w-fit">
		<SidebarNav items={sidebarNavItems} />
	</aside> -->
	
	<slot />
</div>
