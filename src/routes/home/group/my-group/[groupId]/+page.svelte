<script lang="ts">
	import { page } from '$app/stores';
	import Breadcrumb from '$lib/components/others/breadcrumb.svelte';
	import type { session, course, lecture, resource, link, note } from '$lib/server/schema';
	import { Label } from '$lib/components/ui/label';
	import * as Tabs from '$lib/components/ui/tabs';
	import Setting from '$lib/components/others/setting.svelte';
	import type { ActionData, PageData } from './$types';
	import LectureTab from '$lib/components/others/lectureTab.svelte';
	import ResourceTab from '$lib/components/others/resourceTab.svelte';
	import LinkTab from '$lib/components/others/linkTab.svelte';
	import { Link } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { Circle } from 'svelte-loading-spinners';
	import * as Card from '$lib/components/ui/card';

	export let data: PageData;

	let userData = data.user[0];
	let supabase = data.supabase;
	let currentGroup: any = null;
	let memberList: any = null;
	let items = [
		{ href: './', text: 'My Groups' }
		// { href: './', text: currentSession.sessionName },
	];

	onMount(() => {
		data.currentGroup.then((res) => {
			currentGroup = res[0];
			console.log(currentGroup);
			items = [...items, { href: './', text: currentGroup.groupName }];

			loadInitialMessages();
			subscribeToNewMessages();
		});
		data.memberList.then((res) => {
			memberList = res;
			console.log(memberList);
		});
	});

	let messages: any = [];
	let newMessage: any;
	async function sendMessage() {
		if (!newMessage.trim()) return;
		const { data: dt, error: err } = await supabase.from('groupChat').insert([
			{
				userId: userData.userId,
				message: newMessage,
				groupId: currentGroup.groupId,
				username: userData.userName,
				imageLink: userData.imageLink
			}
		]);

		if (err) {
			console.error('Error sending message:', err.message);
		}
		newMessage = ''; // Clear the input field
	}

	async function loadInitialMessages() {
		let { data: res, error: err1 } = await supabase
			.from('groupChat')
			.select('*')
			.eq('groupId', currentGroup.groupId);

		messages = [...messages, res];
		messages.sort((a: any, b: any) => {
			return a.created_at - b.created_at;
		});
	}

	function subscribeToNewMessages() {
		const channels = supabase
			.channel('custom-insert-channel')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'groupChat' },
				(payload) => {
					console.log('Change received!', payload);

					const newMessage = payload.new;
					messages = [...messages, newMessage];
				}
			)
			.subscribe();
	}

	$: {
		console.log(messages);
	}

</script>

<link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<div class="flex grow flex-col items-center">
	<div class="flex w-full flex-row flex-wrap justify-between">
		<Breadcrumb {items} />
		{#if currentGroup && userData.userId == currentGroup.creatorId}
			<a href="./{$page.params.groupId}/settings"><Setting /></a>
		{/if}
	</div>
	{#if !currentGroup || !memberList}
		<div class="flex h-full w-full items-center justify-center">
			<Circle size="60" color="#FF3E00" unit="px" duration="1s" />
		</div>
	{:else}
		<Label class="mb-10 mt-10 text-center text-3xl font-medium">
			{currentGroup.groupName}
		</Label>
		<!-- Lecture Tab -->
		<Tabs.Root value="home" class="w-5/6 min-w-8">
			<Tabs.List class="grid w-full grid-cols-3">
				<Tabs.Trigger value="home">Home</Tabs.Trigger>
				<Tabs.Trigger value="chat">Chat</Tabs.Trigger>
				<Tabs.Trigger value="resources">Resources</Tabs.Trigger>
				<!-- <Tabs.Trigger value="note">Settings</Tabs.Trigger> -->
			</Tabs.List>

			<Tabs.Content value="home">
				<Card.Root class="m-10">
					<Card.Header class="flex flex-row justify-center">
						<img src={currentGroup.imageLink} alt="cover" width="500px" />
					</Card.Header>
					<Card.Header>
						<Card.Title>{currentGroup.groupName}</Card.Title>
						<!-- <Card.Description>Card Description</Card.Description> -->
					</Card.Header>
					<Card.Content>
						<p>{currentGroup.description}</p>
						<p>Member Count: {memberList.length}</p>
					</Card.Content>
					<Card.Footer>
						<p>Created At: {currentGroup.createdAt.split('T')[0]}</p>
					</Card.Footer>
				</Card.Root>
			</Tabs.Content>

			<Tabs.Content value="chat">
				<div class="ml-72 mt-6 w-full">
					<div class="ml-20 mr-20 min-h-screen">
						{#each messages as message}
							{#if message.sender === userData.userId}
								<div class="chat chat-end">
									<div class="chat-image avatar">
										<div class="w-8 rounded-full">
											<img alt="Tailwind CSS chat bubble component" src={message.imageLink} />
										</div>
									</div>
									<div class="chat-header">
										{message.username}
										<time class="text-xs opacity-50">{message.created_at}</time>
									</div>
									<div class="chat-bubble">{message.message}</div>
									<div class="chat-footer opacity-50">Delivered</div>
								</div>
							{:else}
								<div class="chat chat-start">
									<div class="chat-image avatar">
										<div class="w-10 rounded-full">
											<img alt="Tailwind CSS chat bubble component" src={message.imageLink} />
										</div>
									</div>
									<div class="chat-header">
										{message.username}
										<time class="text-xs opacity-50">{message.created_at}</time>
									</div>
									<div class="chat-bubble">{message.message}</div>
									<div class="chat-footer opacity-50">Delivered</div>
								</div>
							{/if}
						{/each}
						<form class="mb-2" on:submit|preventDefault={sendMessage}>
							<input
								class="input input-bordered w-5/6"
								type="text"
								bind:value={newMessage}
								placeholder="Type a message..."
							/>
							<button type="submit" class="btn btn-success">Send</button>
						</form>
					</div>
				</div>
			</Tabs.Content>
			<Tabs.Content value="resources"></Tabs.Content>

			<Tabs.Content value="note"></Tabs.Content>
		</Tabs.Root>
	{/if}
</div>

<style>
	select:required:invalid {
		color: gray;
	}
	option[value=''][disabled] {
		display: none;
	}
	option {
		color: black;
	}
</style>