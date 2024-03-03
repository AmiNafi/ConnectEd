<script lang="ts">
	import type { LayoutData } from '../$types';
	import Profile from '$lib/components/others/profile.svelte'
	export let data: LayoutData;
	let userData = data.user[0];

</script>

<link
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
	rel="stylesheet"
/>
<title>My Profile</title>

<Profile bind:userData/>
