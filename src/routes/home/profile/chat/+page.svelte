<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import Breadcrumb from '$lib/components/others/breadcrumb.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Circle } from 'svelte-loading-spinners';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;
	let userData = data.user[0];
	let ochatList: any = null;
	let chatList: any = null;

	let items = [{ href: './', text: 'Chat' }];

	onMount(() => {
		data.chatList.then((res) => {
			ochatList = res;
			chatList = ochatList;
		});
	});

	let name: string = '';

	$: {
		if (ochatList) {
			chatList = ochatList.filter((it: any) => {
				if (it.user1Id != userData.userId) {
					console.log(it.user1Name, name);
					return it.user1Name.toLowerCase().includes(name.toLowerCase());
				} else {
					return it.user2Name.toLowerCase().includes(name.toLowerCase());
				}
			});
		}
	}
</script>

<div class="flex grow flex-col items-center">
	<div class="flex w-full flex-row flex-wrap justify-between">
		<Breadcrumb {items} />
		<!-- <a href="./{currentSession.sessionId}/settings"><Setting /></a> -->
	</div>
	<Label class="mb-10 mt-10 text-center text-3xl font-medium">Chat</Label>
	{#if !chatList}
		<div class="flex h-full w-full items-center justify-center">
			<Circle size="60" color="#FF3E00" unit="px" duration="1s" />
		</div>
	{:else}
		<div class="mb-4 mt-10 flex w-[90%] flex-row justify-between gap-20">
			<Input
				type="text"
				placeholder="name"
				name="name"
				bind:value={name}
				class="max-w-xs bg-muted"
			/>
		</div>
		<div class="mt-10 grid w-[90%] grid-cols-4 gap-5">
			{#each chatList as it, index}
				<Card.Root>
					<!-- svelte-ignore a11y-missing-attribute -->
					{#if it.user1Id != userData.userId}
						<div class="flex justify-center">
							<img src={it.user1Image} class="h-80 rounded-full border border-b-slate-300" />
						</div>
						<Card.Header>
							<Card.Title
								><a href="../other-user/{it.user1Id}/profile" class="hover:underline"
									>{it.user1Name}</a
								></Card.Title
							>
							<Card.Description>Friends Since: {it.createdAt.split('T')[0]}</Card.Description>
							<div>
								<a href="./chat/{it.user1Id}">
									<img
										class="hover:scale-110"
										src="https://dgymikmkauskxfhmhudw.supabase.co/storage/v1/object/public/Misc/send-alt-1-svgrepo-com.svg?t=2024-03-04T01%3A41%3A21.165Z"
										width="50px"
									/>
								</a>
							</div>
						</Card.Header>
					{:else}
						<div class="flex justify-center">
							<img src={it.user2Image} class="h-80 rounded-full border border-b-slate-300" />
						</div>
						<Card.Header>
							<Card.Title
								><a href="../other-user/{it.user2Id}/profile" class="hover:underline"
									>{it.user2Name}</a
								></Card.Title
							>
							<Card.Description>Friends Since: {it.createdAt.split('T')[0]}</Card.Description>
							<div>
								<a href="./chat/{it.user2Id}">
									<img
										class="hover:scale-110"
										src="https://dgymikmkauskxfhmhudw.supabase.co/storage/v1/object/public/Misc/send-alt-1-svgrepo-com.svg?t=2024-03-04T01%3A41%3A21.165Z"
										width="50px"
									/>
								</a>
							</div>
						</Card.Header>
					{/if}
					<!-- <Card.Content>      
			</Card.Content> -->
				</Card.Root>
			{/each}
		</div>
	{/if}
</div>
