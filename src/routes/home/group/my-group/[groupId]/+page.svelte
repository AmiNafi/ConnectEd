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
	import {Button} from '$lib/components/ui/button'

	export let data: PageData;

	let userData = data.user[0];
	let supabase = data.supabase;
	let currentGroup: any = null;
	let memberList: any[] = [];
	let items = [
		{ href: './', text: 'My Groups' }
		// { href: './', text: currentSession.sessionName },
	];

	onMount(() => {
		data.currentGroup.then((res) => {
			currentGroup = res[0];
			// console.log(currentGroup);
			items = [...items, { href: './'+currentGroup.groupId, text: currentGroup.groupName }];

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
		const { data: dt, error: err } = await supabase.from('group_chat_table').insert([
			{
				user_id: userData.userId,
				message: newMessage,
				group_id: currentGroup.groupId,
				user_name: userData.userName,
				image_link: userData.imageLink
			}
		]);

		if (err) {
			console.error('Error sending message:', err.message);
		}
		newMessage = ''; // Clear the input field
	}

	async function loadInitialMessages() {
		let { data: res, error: err1 } = await supabase
			.from('group_chat_table')
			.select('*')
			.eq('group_id', currentGroup.groupId);

		messages = res  || [];
		// console.log(res);
		messages.sort((a: any, b: any) => {
			return a.created_at - b.created_at;
		});
	}

	function subscribeToNewMessages() {
		const channels = supabase
			.channel('custom-insert-channel')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'group_chat_table' },
				(payload) => {
					console.log('Change received!', payload);

					const newMessage = payload.new;
					messages = [...messages, newMessage];
				}
			)
			.subscribe();
	}


	async function kickMember(userID: number,index: number) {
		await fetch('/api/group/leave', {
			method: 'POST',
			body: JSON.stringify({
				userId: userID,
				groupId: currentGroup.groupId
			})
		}).then((res)=>{
			memberList.splice(index,1)
			memberList = memberList
		})
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
			<Tabs.List class="grid w-full grid-cols-4">
				<Tabs.Trigger value="home">Home</Tabs.Trigger>
				<Tabs.Trigger value="chat">Chat</Tabs.Trigger>
				<Tabs.Trigger value="resources">Resources</Tabs.Trigger>
				<Tabs.Trigger value="members">Members</Tabs.Trigger>
				<!-- <Tabs.Trigger value="note">Settings</Tabs.Trigger> -->
			</Tabs.List>

			<Tabs.Content value="home">
				<Card.Root class="m-10">
					<Card.Header class="flex flex-row justify-center">
						<img src={currentGroup.imageLink+ '?' + Date.now().toString()} alt="cover" width="500px" />
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
				<div class="flex flex-row items-center">
					<div class="ml-72 mt-6 w-full">
						<div class="ml-20 mr-20 min-h-screen">
							{#each messages as message}
								{#if message.user_id === userData.userId}
									<div class="mb-4 flex items-start justify-end">
										<div class="h-8 w-8 overflow-hidden rounded-full">
											<img
												alt="Sender"
												src={message.image_link}
												class="h-full w-full object-cover"
											/>
										</div>
										<div class="w-full max-w-md rounded-lg bg-blue-100 p-4 text-gray-800">
											<p class="mb-1 text-xs text-gray-600">{message.user_name}</p>
											<p class="text-sm">{message.message}</p>
											<p class="mt-1 text-xs text-gray-600">Delivered</p>
										</div>
									</div>
								{:else}
									<div class="mb-4 flex items-start">
										<div class="h-8 w-8 overflow-hidden rounded-full">
											<img
												alt="Receiver"
												src={message.image_link}
												class="h-full w-full object-cover"
											/>
										</div>
										<div class="w-full max-w-md rounded-lg bg-gray-100 p-4 text-gray-800">
											<p class="mb-1 text-xs text-gray-600">{message.user_name}</p>
											<p class="text-sm">{message.message}</p>
											<p class="mt-1 text-xs text-gray-600">Delivered</p>
										</div>
									</div>
								{/if}
							{/each}
							<div class="flex flex-row items-center">
								<form class="mb-2 flex" on:submit|preventDefault={sendMessage}>
									<input
										class="flex-1 rounded-l-lg bg-gray-100 px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring"
										type="textarea"
										bind:value={newMessage}
										placeholder="Type a message..."
									/>
									<button type="submit" class="rounded-r-lg bg-blue-500 px-4 py-2 text-white"
										>Send</button
									>
								</form>
							</div>
						</div>
					</div>
				</div>
			</Tabs.Content>

			<Tabs.Content value="resources"></Tabs.Content>

			<Tabs.Content value="members">
				{#each memberList as member,index}
				<Card.Root class="my-5 w-11/12 hover:shadow">
					<div class="flex flex-row">
						<img
							src={member.member.imageLink}
							alt="cover"
							class="h-24 w-24 rounded-full object-cover my-auto"
						/>
						<div class="w-full">
							<Card.Header>
								<Card.Title
									>{member.member.userName}</Card.Title
								>
							</Card.Header>
							<Card.Content>
								<p>Member Since: {member.joinedAt.split('T')[0]}</p>
							</Card.Content>
						</div>
						{#if userData.userId == currentGroup.creatorId && userData.userId != member.userId}
						<form class="my-auto" on:submit={()=>{kickMember(member.userId, index)}}>
							<Button
								type="submit"
								class="bg-red-400 mr-5 hover:bg-red-500"
								
								>
								Kick
								</Button
							>
						</form>
						{/if}
					</div>
				</Card.Root>
				{/each}
			</Tabs.Content>

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
