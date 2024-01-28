<script lang="ts">
	import { cn } from "$lib/utils";
	import { page } from "$app/stores";
	import { Button } from "$lib/components/ui/button";
	import { cubicInOut } from "svelte/easing";
	import { crossfade } from "svelte/transition";

	let className: string | undefined | null = undefined;
	export let items: { href: string; title: string }[];
	export { className as class };

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});
</script>

<nav class={cn("flex space-x-2 flex-col lg:space-x-0 lg:space-y-1 items-center", className)}>
	{#each items as item}
		{@const isActive = $page.url.pathname.includes(item.href)}

		<Button
			href={item.href}
			variant="ghost"
			class={cn(
				!isActive && "hover:underline",
				isActive && "underline",
				"relative w-full hover:bg-transparent text-base p-7"
			)}
			data-sveltekit-noscroll
		>
			{#if isActive}
				<div
					class="absolute inset-0 bg-[#8c9ad4]"
					in:send={{ key: "active-sidebar-tab" }}
					out:receive={{ key: "active-sidebar-tab" }}
				/>
			{/if}
			<div class="relative">
				{item.title}
			</div>
		</Button>
	{/each}
</nav>