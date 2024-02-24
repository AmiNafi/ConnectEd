<script lang="ts">
	import SidebarNav from '$lib/components/others/sidebar.svelte';
	import { Separator } from '$lib/components/ui/separator';

	const sidebarNavItems = [
		{
			title: 'My Profile',
			href: '/home/profile/my-profile'
		},
		// {
		// 	title: 'My Blogs',
		// 	href: '/home/blogs/my-blog'
		// },
		// {
		// 	title: 'Favorite Blogs',
		// 	href: '/home/blogs/favorite-blog'
		// },
		// {
		// 	title: 'Create Blog',
		// 	href: '/home/blogs/new-blog'
		// }
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