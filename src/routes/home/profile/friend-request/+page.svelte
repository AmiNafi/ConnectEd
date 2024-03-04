<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import * as Tabs from '$lib/components/ui/tabs';
	import { onMount } from 'svelte';
	import { Circle } from 'svelte-loading-spinners';
	import * as Card from '$lib/components/ui/card';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input';

	export let data: PageData;

	let userData = data.user[0];

	let osent: any = null;
	let oreceived: any = null;
	let sent: any = null;
	let received: any = null;

	//Sent
	async function cancelReqS(index: number) {
		let payload = {
			senderId: sent[index].senderId,
			receiverId: sent[index].receiverId
		};
		await fetch('/api/friend-request/delete', {
			method: 'POST',
			body: JSON.stringify(payload)
		});

		osent.splice(index, 1);
		sent = osent;
	}

	//Receive
	async function cancelReqR(index: number) {
		let payload = {
			senderId: received[index].senderId,
			receiverId: received[index].receiverId
		};
		await fetch('/api/friend-request/delete', {
			method: 'POST',
			body: JSON.stringify(payload)
		});

		oreceived.splice(index, 1);
		received = oreceived;
	}

	//Receive
	async function accReqR(index: number) {
		let payload = {
			user1Id: received[index].senderId,
			user1Name: received[index].senderName,
			user1Image: received[index].senderImage,

			user2Id: received[index].receiverId,
			user2Name: received[index].receiverName,
			user2Image: received[index].receiverImage
		};
		// console.log(payload)
		await fetch('/api/friend/add', {
			method: 'POST',
			body: JSON.stringify(payload)
		});
		
		oreceived.splice(index, 1);
		received = oreceived;
	}

	onMount(() => {
		data.friendRequests.then((res) => {
			osent = res.sent;
			oreceived = res.received;
			sent = osent;
			received = oreceived;
		});
	});

	let nameS: string = '';
	let nameR: string = '';

	$: {
		if (osent) {
			sent = osent.filter((it: any) => {
				return it.receiverName.toLowerCase().includes(nameS.toLowerCase());
			});
		}
	}

	$: {
		if(oreceived){
			received = oreceived.filter((it: any) => {
				return it.senderName.toLowerCase().includes(nameR.toLowerCase());
			});
		}
	}
</script>

<div class="flex grow flex-col items-center">
	<Label class="mt-10 text-center text-3xl font-medium">Pending Requests</Label>

	{#if !osent || !oreceived}
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
				<div class="mb-4 flex w-[90%] flex-row justify-between gap-20">
					<Input
						type="text"
						placeholder="name"
						name="name"
						bind:value={nameS}
						class="max-w-xs bg-muted"
					/>
				</div>
				<div class="grid grid-cols-4 gap-5">
					{#each sent as it, index}
						<Card.Root>
							<!-- svelte-ignore a11y-missing-attribute -->
							<div class="flex justify-center">
								<img src={it.receiverImage} class="h-80 rounded-full border border-b-slate-300" />
							</div>
							<Card.Header>
								<Card.Title><a href="../other-user/{it.receiverId}/profile" class="hover:underline">{it.receiverName}</a></Card.Title>
								<Card.Description>Sent At: {it.sentAt.split('T')[0]}</Card.Description>
							</Card.Header>
							<Card.Content>
							</Card.Content>
							<div class="mb-5 flex flex-row justify-center">
								<Button
									class="bg-red-500 hover:bg-red-600"
									on:click={() => {
										cancelReqS(index);
									}}>Cancel</Button
								>
							</div>
						</Card.Root>
					{/each}
				</div>
			</Tabs.Content>
			<Tabs.Content value="received">
				<div class="mb-4 flex w-[90%] flex-row justify-between gap-20">
					<Input
						type="text"
						placeholder="name"
						name="name"
						bind:value={nameR}
						class="max-w-xs bg-muted"
					/>
				</div>
				<div class="grid grid-cols-4 gap-5">
					{#each received as it, index}
						<Card.Root>
							<!-- svelte-ignore a11y-missing-attribute -->
							<div class="flex justify-center">
								<img src={it.senderImage} class="h-80 rounded-full border border-b-slate-300" />
							</div>
							<Card.Header>
								<Card.Title><a href="../other-user/{it.senderId}/profile" class="hover:underline">{it.senderName}</a></Card.Title>
								<Card.Description>Sent At: {it.sentAt.split('T')[0]}</Card.Description>
							</Card.Header>
							<Card.Content>
							</Card.Content>
							<div class="mx-5 mb-5 flex flex-row justify-between">
								<Button
									class="bg-green-500 hover:bg-green-600"
									on:click={() => {
										accReqR(index);
									}}>Accept</Button
								>
								<Button
									class="bg-red-500 hover:bg-red-600"
									on:click={() => {
										cancelReqR(index);
									}}>Cancel</Button
								>
							</div>
						</Card.Root>
					{/each}
				</div>
			</Tabs.Content>
		</Tabs.Root>
	{/if}
</div>
