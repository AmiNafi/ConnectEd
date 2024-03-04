<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '../ui/button/button.svelte';

	export let viewerData: any;
	export let userData: any;

	let status : string = ""

	async function sendReq(){
		let payload = {
			senderId: viewerData.userId,
			senderName: viewerData.userName,
			senderImage: viewerData.imageLink,

			receiverId: userData.userId,
			receiverName: userData.userName,
			receiverImage: userData.imageLink,
			
		}
		await fetch('/api/friend-request/add', {
			method: 'POST',
			body: JSON.stringify(payload)
		})
		status = "sent";
	}

	async function cancelReq(){
		let payload = {
			senderId: viewerData.userId,
			receiverId: userData.userId
		}
		await fetch('/api/friend-request/delete', {
			method: 'POST',
			body: JSON.stringify(payload)
		})
		status = "none";
	}

	async function accReq(){
		let payload = {
			user1Id: viewerData.userId,
			user1Name: viewerData.userName,
			user1Image: viewerData.imageLink,

			user2Id: userData.userId,
			user2Name: userData.userName,
			user2Image: userData.imageLink,
			
		}
		await fetch('/api/friend/add', {
			method: 'POST',
			body: JSON.stringify(payload)
		})
		status = "friend";
	}

	async function unfriend(){
		let payload = {
			user1Id: viewerData.userId,
			user2Id: userData.userId,	
		}
		await fetch('/api/friend/delete', {
			method: 'POST',
			body: JSON.stringify(payload)
		})
		status = "none";
	}

	async function getStatus(){
		let payload = {
			viewerId: viewerData.userId,
			profileId: userData.userId
		}
		// console.log(payload)
		let ret = await fetch('/api/friend-request/status', {
			method: 'POST',
			body: JSON.stringify(payload)
		})
		let res = await ret.json()

		status = res.reqStatus
		console.log(status)
	}

	onMount(()=>{
		getStatus()
	})

</script>

<link
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
	rel="stylesheet"
/>

<div class="mb-12 flex grow flex-col items-center space-y-6">
	<div class="mx-auto mt-8 max-w-4xl rounded-lg bg-white p-6 shadow-md">
		<div class="mb-6 flex flex-row justify-center">
			<!-- svelte-ignore a11y-missing-attribute -->
			<img src={userData.imageLink + '?' + Date.now().toString()} class="w-[300px] object-cover" />
		</div>
		<div class="ml-4">
			<h2 class="text-center text-2xl font-bold text-gray-800">{userData.userName}</h2>
		</div>

		<!-- <div class="flex items-center space-x-4 mb-6">
        <div class="flex-1">
            <p class="text-gray-600">Experience Points</p>
            <div class="flex items-center mt-2">
                <div class="flex-1 bg-gray-300 h-4 rounded-full">
                    <div class="w-3/4 h-full bg-green-500 rounded-full"></div>
                </div>
                <div class="ml-2">
                    <span class="text-gray-600">6125 / 9999 XP</span>
                </div>
            </div>
        </div>
    </div> -->
		<div class="count-container">
			<!-- Blog count -->
			<div class="count mx-auto max-w-md overflow-hidden rounded-lg bg-white p-6 shadow-lg">
				<h2 class="mb-2 text-xl font-semibold">Blogs</h2>
				<div
					class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 font-bold text-white"
				>
					<!-- Display the number of blogs dynamically here -->
					{userData.blogs.length}
					<!-- Example: Replace with dynamic value -->
				</div>
				{#if userData.blogs.length > 1}
					<!-- content here -->
					<p class="text-gray-600">
						You've written <span class="font-bold">{userData.blogs.length} blogs </span>
					</p>
				{:else if userData.blogs.length == 1}
					<!-- else if content here -->
					<p class="text-gray-600">
						You've written <span class="font-bold">{userData.blogs.length} blog </span>
					</p>
				{:else}
					<!-- else content here -->
					<p class="text-gray-600">You haven't written any blogs yet</p>
				{/if}
				<!-- </p> -->
			</div>

			<!-- Session count -->
			<div class="count mx-auto max-w-md overflow-hidden rounded-lg bg-white p-6 shadow-lg">
				<h2 class="mb-2 text-xl font-semibold">Sessions</h2>
				<div
					class="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 font-bold text-white"
				>
					<!-- Display the number of sessions dynamically here -->
					{userData.sessions.length}
					<!-- Example: Replace with dynamic value -->
				</div>
				<!-- <p class="text-gray-600">You've attended <span class="font-bold">5</span> sessions.</p> -->
				{#if userData.sessions.length > 1}
					<!-- content here -->
					<p class="text-gray-600">
						You've written <span class="font-bold">{userData.sessions.length} sessions </span>
					</p>
				{:else if userData.sessions.length == 1}
					<!-- else if content here -->
					<p class="text-gray-600">
						You've written <span class="font-bold">{userData.sessions.length} session </span>
					</p>
				{:else}
					<!-- else content here -->
					<p class="text-gray-600">You haven't opened any sessions yet</p>
				{/if}
			</div>
		</div>

		<!-- <div class="mb-6 flex space-x-4">
			<a
				href="#"
				class="flex flex-col items-center border border-blue-200 bg-blue-100 p-2 hover:underline"
			>
				<i class="fa-solid fa-user-group mb-2 text-2xl"></i>
				<span class="text-sm">Friends</span>
			</a>

			<a
				href="#"
				class="flex flex-col items-center border border-green-200 bg-green-100 p-2 hover:underline"
			>
				<i class="fa-solid fa-user-plus mb-2 text-2xl"></i>
				<span class="text-sm">Followers</span>
			</a>

			<a
				href="/home/session/my-session"
				class="flex flex-col items-center border border-purple-200 bg-purple-100 p-2 hover:underline"
			>
				<i class="fa-solid fa-book mb-2 text-2xl"></i>
				<span class="text-sm">Sessions</span>
			</a>

			<a
				href="/home/blogs/explore-blog"
				class="flex flex-col items-center border border-red-200 bg-red-100 p-2 hover:underline"
			>
				<i class="fas fa-blog mb-2 text-lg text-red-500"></i>
				<span class="text-sm">Blogs</span>
			</a>

			<a
				href="#"
				class="flex flex-col items-center border border-orange-200 bg-orange-100 p-2 hover:underline"
			>
				<i class="fas fa-trophy mb-2 text-lg text-orange-500"></i>
				<span class="text-sm">Achievements</span>
			</a>
		</div> -->

		<div class="flex flex-row justify-between mb-4">
		<div class="flex space-x-4">
			<!-- Social Links -->
			{#if userData.facebook}
				<a href={userData.facebook} target="_blank" class="text-gray-600 hover:text-blue-500">
					<i class="fab fa-facebook text-lg"></i>
				</a>
			{/if}

			{#if userData.twitter}
				<a href={userData.twitter} target="_blank" class="text-gray-600 hover:text-blue-500">
					<i class="fab fa-twitter text-lg"></i>
				</a>
			{/if}

			{#if userData.linkedin}
				<a href={userData.linkedin} target="_blank" class="text-gray-600 hover:text-blue-500">
					<i class="fab fa-linkedin-in text-lg"></i>
				</a>
			{/if}

			{#if userData.github}
				<a href={userData.github} target="_blank" class="text-gray-600 hover:text-blue-500">
					<i class="fab fa-github text-lg"></i>
				</a>
			{/if}
		</div>
		{#if viewerData.userId != userData.userId}
		<div>
			<a href="../../profile/chat/{userData.userId}">
				<img class="hover:scale-110" src="https://dgymikmkauskxfhmhudw.supabase.co/storage/v1/object/public/Misc/send-alt-1-svgrepo-com.svg?t=2024-03-04T01%3A41%3A21.165Z" width="50px"/>
			</a>
		</div>
		{/if}
		</div>
		{#if viewerData.userId != userData.userId}
			{#if status === "none"}
			<div class="flex flex-row justify-end ">
				<Button class="bg-green-500 hover:bg-green-600" on:click={sendReq}>Send Friend Request</Button>
			</div>
			{:else if status === "sent"}
			<div class="flex flex-row justify-end ">
				<Button class="bg-red-500 hover:bg-red-600" on:click={cancelReq}>Cancel Friend Request</Button>
			</div>
			{:else if status === "received"}
			<div class="flex flex-row justify-between">
				<Button class="bg-green-500 hover:bg-green-600" on:click={accReq}>Accept Friend Request</Button>
				<Button class="bg-red-500 hover:bg-red-600" on:click={cancelReq}>Cancel Friend Request</Button>
			</div>
			{:else if status === "friend"}
			<div class="flex flex-row justify-end ">
				<Button class="bg-red-500 hover:bg-red-600" on:click={unfriend}>Unfriend</Button>
			</div>
			{/if}
		{/if}
	</div>
</div>

<style>
	.blog-count {
		border: 4px; /* Border color */
		margin-bottom: 20px;
	}

	.count-container {
		display: flex; /* Use Flexbox layout */
		justify-content: space-between; /* Align items with space between them */
		margin-bottom: 20px; /* Add margin to create space between count containers and other items */
	}

	/* Style for individual count container */
	.count-container .count {
		width: calc(50% - 10px); /* Set width for each count container */
		border: 4px; /* Border color */
		text-align: center;
		padding: 10px;
	}
</style>
