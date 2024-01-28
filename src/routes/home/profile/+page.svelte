<script lang="ts">
	import type { LayoutData } from '../$types';
	import type { user } from '$lib/server/schema';
	import * as Avatar from '$lib/components/ui/avatar';

	export let data: LayoutData;
</script>

<div class="mx-auto flex max-w-xl flex-col p-4 shadow-2xl">
	<!-- svelte-ignore a11y-img-redundant-alt -->
	{#await data.user}
		<Avatar.Root class="mx-auto h-48 w-48 rounded-full">
			<Avatar.Fallback></Avatar.Fallback>
		</Avatar.Root>
	{:then user}
		<Avatar.Root class="mx-auto h-48 w-48 rounded-full">
			<Avatar.Image src={user[0].imageLink + '?' + Date.now()} alt="@shadcn" />
			<Avatar.Fallback class="text-5xl">{user[0].userName[0].toUpperCase()}</Avatar.Fallback>
		</Avatar.Root>
        <div class="mt-5 text-xl">User Name: {user[0].userName}</div>
	{/await}
	
</div>
