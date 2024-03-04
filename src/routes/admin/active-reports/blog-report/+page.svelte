<script lang="ts">
	import { Circle } from 'svelte-loading-spinners';
	import * as Table from '$lib/components/ui/table';
	import { Label } from '$lib/components/ui/label';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;
	let list: any = null;

	onMount(() => {
		data.list.then((res) => {
			list = res;
		});
	});
</script>

{#if !list}
	<div class="flex h-full w-full items-center justify-center">
		<Circle size="60" color="#FF3E00" unit="px" duration="1s" />
	</div>
{:else}
	<div class="flex grow flex-col items-center">
		<Label class="mt-10 text-center text-3xl font-medium">Blog Report</Label>
		<Table.Root>
			<Table.Caption>A list of blog reports.</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head>Blog Title</Table.Head>
					<Table.Head>Report Message</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each list as it}
					<Table.Row>
						<Table.Cell><a href="./blog-report/{it.blogId}" class="hover:underline">{it.blogTitle}</a></Table.Cell>
						<Table.Cell>{it.message}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
{/if}
