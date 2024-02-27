<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { enhance } from '$app/forms';
	import { Textarea } from '$lib/components/ui/textarea';
	import Breadcrumb from '$lib/components/others/breadcrumb.svelte';
	import { onMount } from 'svelte';
	import { Circle } from 'svelte-loading-spinners';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData

	const userData = data.user[0];
	let imageLink = userData.imageLink + "?" + Date.now().toString();

	let isLoading = false;
	let showMessage = false;
	let successStatus: boolean;
	let message: string;

	$:{
		// console.log(form)
		if(form){
			successStatus = form.success
			message = form.message
			showMessage = true
			form=null
			imageLink = userData.imageLink + "?" + Date.now().toString()
		}
	}
</script>

<link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<div class="flex grow flex-col items-center space-y-6">
	<div>
		<h3 class="mt-10 text-center text-3xl font-medium">Settings</h3>
		<p class="text-sm text-gray-800">Change user info</p>
	</div>
	{#if showMessage}
		{#if successStatus}
			<div
				class="w-[400px] rounded-sm border-2 border-green-500 bg-green-100 px-2 py-2 text-base text-green-500"
			>
				{message}
			</div>
		{:else}
			<div
				class="w-[400px] rounded-sm border-2 border-red-500 bg-red-100 px-2 py-2 text-base text-red-500"
			>
				{message}
			</div>
		{/if}
	{/if}
	<Separator />
	<form
		use:enhance={() => {
			isLoading = true;
			return async ({ update, result }) => {
				isLoading = false;
				update({ reset: false, invalidateAll: false });
			};
		}}
		method="post"
		action="?/update"
		enctype="multipart/form-data"
		on:submit={()=>{showMessage=false}}
	>
		<button type="submit" disabled style="display: none" aria-hidden="true"></button>
		<!-- svelte-ignore empty-block -->
		<input hidden name="userId" value={userData.userId} />
        <input hidden name="email" value={userData.email} />
		<div class="grid gap-10">
			<div class="grid gap-2">
				<Label>User Name</Label>
				<Input
					required
					class="w-[400px] bg-white"
					name="userName"
					type="text"
					autocapitalize="none"
					disabled={isLoading}
                    bind:value={userData.userName}
				/>
			</div>

			<div class="grid gap-2">
				<Label for="image">Cover Photo</Label>
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img src={imageLink} alt="cover photo" width="300px" class="border border-muted" />
				<Input
					class="w-[400px] bg-white"
					id="image"
					name="image"
					type="file"
					disabled={isLoading}
				/>
			</div>

			<Button type="submit" disabled={isLoading} class="mb-20">
				{#if isLoading}
					<i class="fa fa-spinner fa-spin px-3" style="font-size:24px" />
				{/if}
				Update
			</Button>
		</div>
	</form>
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
	.chip {
		background-color: #3490dc;
		color: #fff;
		padding: 0.5rem;
		margin-right: 0.5rem;
		border-radius: 0.25rem;
		display: flex;
		align-items: center;
	}

	.remove-button {
		cursor: pointer;
		margin-left: 0.5rem;
	}
</style>
