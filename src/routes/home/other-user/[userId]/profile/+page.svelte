<script lang="ts">
	import Profile from '$lib/components/others/profile.svelte';
	import { Circle } from 'svelte-loading-spinners';
	import Breadcrumb from '$lib/components/others/breadcrumb.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;
	let userData = data.user[0];
	let otherUserData: any = null;

	let items = [
		{ href: './', text: 'User Profile' }
		// { href: './', text: currentSession.sessionName },
	];

	onMount(() => {
		data.otherUser.then((res) => {
			otherUserData = res[0];
			console.log(otherUserData)
		});
	});
</script>

<link
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
	rel="stylesheet"
/>

<div class="flex grow flex-col items-center">
	<div class="flex w-full flex-row flex-wrap justify-between">
		<Breadcrumb {items} />
	</div>
	{#if !otherUserData}
		<div class="flex h-full w-full items-center justify-center">
			<Circle size="60" color="#FF3E00" unit="px" duration="1s" />
		</div>
	{:else}
		<Profile viewerData={userData} userData={otherUserData} />
	{/if}
</div>
<!-- <Profile bind:userData/> -->
