<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import * as Tabs from '$lib/components/ui/tabs';
	import { onMount } from 'svelte';
	import { Circle } from 'svelte-loading-spinners';
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types';

	export let data: PageData;

	let userData = data.user[0];
	let sent: any = null;
	let received: any = null;

	onMount(() => {
		data.friendRequests.then((res) => {
			sent = res.sent;
			received = res.received;
			// console.log(sent)
		});
	});
</script>

<div class="flex grow flex-col items-center">
	<Label class="mt-10 text-center text-3xl font-medium">Pending Requests</Label>

	{#if !sent || !received}
		<div class="flex h-full w-full items-center justify-center">
			<Circle size="60" color="#FF3E00" unit="px" duration="1s" />
		</div>
	{:else}
		<Tabs.Root value="sent" class="mt-5 w-5/6 min-w-8">
			<Tabs.List class="grid w-full grid-cols-2">
				<Tabs.Trigger value="sent">Sent Requests</Tabs.Trigger>
				<Tabs.Trigger value="received">Received Requests</Tabs.Trigger>
			</Tabs.List>

			<Tabs.Content value="sent">
				<div class="grid grid-cols-3">
				{#each sent as it}
					<Card.Root>
						<!-- svelte-ignore a11y-missing-attribute -->
						<img src={it.receiverImage} class="w-full border border-b-slate-300 rounded-lg"/>
						<Card.Header>
							<Card.Title>{it.receiverName}</Card.Title>
							<Card.Description>Sent At: {it.sentAt.split('T')[0]}</Card.Description>
						</Card.Header>
						<Card.Content>
							<div>
								
							</div>
						</Card.Content>
					</Card.Root>
				{/each}
			</div>
			</Tabs.Content>
			<Tabs.Content value="received"></Tabs.Content>
		</Tabs.Root>
	{/if}
</div>
