<script lang="ts">
	import { Circle } from 'svelte-loading-spinners';
	import * as Table from '$lib/components/ui/table';
	import { Label } from '$lib/components/ui/label';
	import {Button} from '$lib/components/ui/button'
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';

	export let data: PageData;
	let list: any = null;

	onMount(() => {
		data.list.then((res) => {
			list = res;
		});
	});

	function handleSubmit(index: number){
		list.splice(index,1)
		list = list
	}
</script>

{#if !list}
	<div class="flex h-full w-full items-center justify-center">
		<Circle size="60" color="#FF3E00" unit="px" duration="1s" />
	</div>
{:else}
	<div class="flex grow flex-col items-center">
		<Label class="mt-10 text-center text-3xl font-medium">Session Report</Label>
		<Table.Root>
			<Table.Caption>A list of session reports.</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head>Session Name</Table.Head>
					<Table.Head>Report Message</Table.Head>
					<Table.Head>Actions</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each list as it, index}
					<Table.Row>
						<Table.Cell><a href="./blog-report/{it.blogId}" class="hover:underline">{it.sessionName}</a></Table.Cell>
						<Table.Cell>{it.message}</Table.Cell>
						<Table.Cell>			
						<div class="flex flex-row gap-10">
							<form class="flex flex-row" method="post" action="?/delete1" 
							use:enhance={() => {
								return async ({ update, result }) => {
									update({ reset: true, invalidateAll:false });
								};
							}}
							on:submit={()=>{handleSubmit(index)}}
							>
								<input hidden name="reportId" value={it.reportId} />
								<input hidden name="blogId" value={it.blogId} />
								<input hidden name="status" value="negetive" />
								<Button class="w-[100px] border border-black bg-white text-black hover:bg-muted">Delete Report</Button>
							</form>
							<form class="flex flex-row" method="post" action="?/delete2" 
							use:enhance={() => {
								return async ({ update, result }) => {
									update({ reset: true, invalidateAll:false });
								};
							}}
							on:submit={()=>{handleSubmit(index)}}
							>
								<input hidden name="reportId" value={it.reportId} />
								<input hidden name="blogId" value={it.blogId} />
								<input hidden name="status" value="positive" />
								<Button class="w-[100px] border border-black bg-white text-black hover:bg-muted">Delete Session</Button>
							</form>
						</div>
					</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
{/if}
