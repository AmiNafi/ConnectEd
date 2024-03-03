<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import Breadcrumb from '$lib/components/others/breadcrumb.svelte';
	import * as Pagination from '$lib/components/ui/pagination';
	import type { session } from '$lib/server/schema';
	import Favorite from '$lib/components/svg/favorite.svelte';
	import Favorited from '$lib/components/svg/favorited.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { Circle } from 'svelte-loading-spinners';
	import Button from '$lib/components/ui/button/button.svelte';
	import RightArrow from '$lib/components/others/right-arrow.svelte';
	import * as Card from '$lib/components/ui/card';
	import { onMount } from 'svelte';

	let items = [{ href: '../', text: 'Public Sessions' }];

	export let data: PageData;
	const userData = data.user[0];
	let otherUserData :any = null
	let sessionList: any = null;

	onMount(() => {
		data.otherUser.then((res) => {
			otherUserData = res[0]
			sessionList = res[0].sessions;
			// console.log(res);
		});
	});

	function onFav(index: number, sessionId: number) {
		sessionList[index].sessionFavs.push({ userId: userData.userId });
		sessionList = sessionList;
	}

	function onUnFav(index: number, sessionId: number) {
		sessionList[index].sessionFavs = [];
		sessionList = sessionList;
	}
</script>

<div class="flex grow flex-col items-center">
	<div class="flex w-full flex-row flex-wrap items-start justify-start">
		<Breadcrumb {items} />
	</div>
	<Label class="mb-10 mt-10 text-center text-3xl font-medium">Public Sessions</Label>

	{#if !sessionList}
		<div class="flex h-full w-full items-center justify-center">
			<Circle size="60" color="#FF3E00" unit="px" duration="1s" />
		</div>
	{:else}
		{#each sessionList as session, index}
			<div class="session-card">
				<!-- <div class="session-card"> -->
				<div class="flex justify-end">
					<button class="flex items-center rounded-full px-4 py-2 text-white">
						{#if session.sessionFavs[0] == undefined}
							<form
								use:enhance={() => {
									return async ({ update }) => {
										update({ invalidateAll: false });
									};
								}}
								action="?/favorite"
								method="post"
								on:submit={() => {
									onFav(index, session.sessionId);
								}}
							>
								<input hidden id="userId" name="userId" value={userData.userId} />
								<input hidden id="sessionId" name="sessionId" value={session.sessionId} />
								<button type="submit"><Favorite design="hover:scale-110" /></button>
							</form>
						{:else}
							<form
								use:enhance={() => {
									return async ({ update }) => {
										update({ invalidateAll: false });
									};
								}}
								action="?/unfavorite"
								method="post"
								on:submit={() => {
									onUnFav(index, session.sessionId);
								}}
							>
								<input hidden id="userId" name="userId" value={userData.userId} />
								<input hidden id="sessionId" name="sessionId" value={session.sessionId} />
								<button type="submit"><Favorited design="hover:scale-110" /></button>
							</form>
						{/if}
					</button>
				</div>
				<div class="flex flex-row justify-between">
					<div>
						<h2>{session.sessionName}</h2>
						<p class="session-info">
							Created by {otherUserData.userName} on
							{session.createdAt.split('T')[0]}
						</p>

						<div class="tags">
							{#if session.tags != null}
								{#each session.tags as tag (tag)}
									<span class="tag">{tag}</span>
								{/each}
							{:else}
								<p class="message">No tags available</p>
							{/if}
						</div>

						{#if Object.keys(session.courses).length > 0}
							<p class="session-info">
								Courses: {session.courses.map((course) => course.courseName).join(', ')}
							</p>
						{:else}
							<p class="message">No courses available</p>
						{/if}
					</div>
					<div class="my-auto">
						<Button href="./session/{session.sessionId}" class="bg-white hover:bg-muted"
							><RightArrow /></Button
						>
					</div>
				</div>
			</div>
		{/each}
	{/if}
</div>

<style>
	/* Add your styles here */
	.session-card {
		width: 90%;
		border: 1px solid #ccc;
		padding: 16px;
		margin: 16px;
		border-radius: 8px;
		transition: box-shadow 0.2s ease;
	}

	.session-card:hover {
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Shadow effect on hover */
	}

	.session-info {
		font-size: 14px;
		color: #555;
	}

	.tags {
		margin-top: 8px;
		display: flex;
		flex-wrap: wrap;
	}

	.tag {
		background-color: #eee;
		padding: 4px 8px;
		margin: 4px;
		border-radius: 4px;
	}

	.message {
		font-style: italic;
		color: #888;
	}
</style>
