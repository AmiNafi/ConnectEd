<script lang="ts">
	import SidebarNav from '$lib/components/others/sidebar.svelte';
	import { Separator } from '$lib/components/ui/separator';

	const sidebarNavItems = [
		{
			title: 'My Profile',
			href: '/home/profile/my-profile'
		},
		{
			title: 'Friend Requests',
			href: '/home/profile/friend-request'
		},
		{
			title: 'My Friends',
			href: '/home/profile/my-friend'
		},
		{
			title: 'Settings',
			href: '/home/profile/settings'
		}
	];
</script>

<div class="flex flex-row space-x-12 space-y-0">
	<aside class="sticky top-0 h-screen w-fit border border-gray-400 bg-gray-100">
		<SidebarNav items={sidebarNavItems} />
	</aside>
	<!-- <aside class="sticky top-0 h-screen bg-gray-100 w-fit">
		<SidebarNav items={sidebarNavItems} />
	</aside> -->

	<slot />
</div>
