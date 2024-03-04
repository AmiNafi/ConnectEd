<script lang="ts">
	import { page } from '$app/stores';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import Breadcrumb from '$lib/components/others/breadcrumb.svelte';
	import ScrollDownSVG from '$lib/components/others/scrollDownSVG.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;
	let userData = data.user[0];
	let otherUser = data.otherUser[0];
	let supabase = data.supabase;

	let items = [
		{ href: './', text: 'Chat' },
		{ href: `./${otherUser.userId}`, text: otherUser.userName }
	];

	let index: number = 0;
	let otherId: number = parseInt($page.params.userId);

	let messages: any = [];
	let newMessage: any;
	async function sendMessage() {
		if (!newMessage.trim()) return;

		await fetch('/api/chat-notification/add', {
			method: 'POST',
			body: JSON.stringify({
				user1Id: userData.userId,
				user1Name: userData.userName,
				user1Image: userData.imageLink,

				user2Id: otherUser.userId,
				user2Name: otherUser.userName,
				user2Image: otherUser.imageLink
			})
		});

		const { data: dt, error: err } = await supabase.from('chat_table').insert([
			{
				user_id: userData.userId,
				user_name: userData.userName,
				image_link: userData.imageLink,
				message: newMessage,

				index: index,
				other_id: otherId
			}
		]);

		if (err) {
			console.error('Error sending message:', err.message);
		}
		newMessage = ''; // Clear the input field
	}

	async function loadInitialMessages() {
		let { data: res, error: err1 } = await supabase
			.from('chat_table')
			.select('*')
			.eq('index', index);

		messages = res || [];
		// console.log(res);
		messages.sort((a: any, b: any) => {
			return a.created_at - b.created_at;
		});

		fetch('/api/chat-notification/delete', {
			method: 'POST',
			body: JSON.stringify({
				user1Id: userData.userId,
				user1Name: userData.userName,

				user2Id: otherUser.userId,
				user2Name: otherUser.userName
			})
		});
	}

	function subscribeToNewMessages() {
		const channels = supabase
			.channel('custom-insert-channel')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'chat_table', filter: `index=eq.${index}` },
				(payload) => {
					console.log('Change received!', payload);

					const newMessage = payload.new;
					messages = [...messages, newMessage];

					fetch('/api/chat-notification/delete', {
						method: 'POST',
						body: JSON.stringify({
							user1Id: userData.userId,
							user1Name: userData.userName,

							user2Id: otherUser.userId,
							user2Name: otherUser.userName
						})
					});
				}
			)
			.subscribe();
	}

	function goToBottom() {
		let objDiv: HTMLElement | null = document.getElementById('chatDiv');
		objDiv!.scrollTop = objDiv!.scrollHeight;
	}

	onMount(() => {
		if (userData.userId < otherId) {
			index = parseInt(userData.userId.toString() + otherId.toString());
		} else {
			index = parseInt(otherId.toString() + userData.userId.toString());
		}
		console.log(index);

		loadInitialMessages();
		subscribeToNewMessages();
	});
</script>

<div class="flex grow flex-col items-center">
	<div class="flex w-full flex-row flex-wrap justify-between">
		<Breadcrumb {items} />
		<!-- <a href="./{currentSession.sessionId}/settings"><Setting /></a> -->
	</div>
	<Label class="mb-10 mt-10 text-center text-3xl font-medium">Chat</Label>
	<div class="w-full">
		<div id="chatDiv" class="h-[600px] overflow-auto rounded-md border border-slate-200">
			{#each messages as message}
				{#if message.user_id === userData.userId}
					<div class="mb-4 flex items-start justify-end">
						<div class="w-full max-w-md rounded-lg bg-blue-100 p-4 text-gray-800">
							<p class="mb-1 text-xs text-gray-600">{message.user_name}</p>
							<p class="text-sm">{message.message}</p>
							<p class="mt-1 text-xs text-gray-600">Delivered</p>
						</div>
						<div class="ml-4 mr-4 h-8 w-8 overflow-hidden rounded-full border border-slate-300">
							<img alt="Sender" src={message.image_link} class="h-full w-full object-cover" />
						</div>
					</div>
				{:else}
					<div class="mb-4 flex items-start">
						<div class="ml-4 mr-4 h-8 w-8 overflow-hidden rounded-full border border-slate-300">
							<img alt="Receiver" src={message.image_link} class="h-full w-full object-cover" />
						</div>
						<div class="w-full max-w-md rounded-lg bg-gray-100 p-4 text-gray-800">
							<p class="mb-1 text-xs text-gray-600">{message.user_name}</p>
							<p class="text-sm">{message.message}</p>
							<p class="mt-1 text-xs text-gray-600">Delivered</p>
						</div>
					</div>
				{/if}
			{/each}
		</div>
		<div class="mb-10 mt-5 flex flex-row items-center justify-center">
			<form class="mb-2 flex" on:submit|preventDefault={sendMessage}>
				<input
					class="flex-1 rounded-l-lg bg-gray-100 px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring"
					type="textarea"
					bind:value={newMessage}
					placeholder="Type a message..."
				/>
				<button type="submit" class="rounded-r-lg bg-blue-500 px-4 py-2 text-white">Send</button>
			</form>
			<button class="ml-5" on:click={goToBottom}><ScrollDownSVG /></button>
		</div>
	</div>
</div>
