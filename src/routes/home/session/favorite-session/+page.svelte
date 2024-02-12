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

    let items = [{ href: '../', text: 'Favorite Sessions' }];

    export let data: PageData;
	const userData = data.user[0];
    let favoriteSessions = data.favoriteSession
	let perPage = 5;

	function onUnFav(index: number, sessionId: number) {
		favoriteSessions.splice(index, 1)
		favoriteSessions = favoriteSessions
	}

</script>

<div class="flex grow flex-col items-center">
	<div class="flex w-full flex-row flex-wrap items-start justify-start">
		<Breadcrumb {items} />
	</div>
    <Label class="mb-10 mt-10 text-center text-3xl font-medium">
		Favorite Sessions
	</Label>

    <Pagination.Root count={Object.keys(favoriteSessions).length} {perPage} let:pages let:currentPage>
		{#each Array(perPage) as _, i}
			{#if i < Object.keys(favoriteSessions).length}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="session-card" on:click={()=>{goto('favorite-session/'+favoriteSessions[perPage * ((currentPage || 1) - 1) + i].sessionId)}}>
				<!-- <div class="session-card"> -->
					<div class="flex justify-end">
						<button class="flex items-center rounded-full px-4 py-2 text-white">
                            <form
                                use:enhance
                                action="?/unfavorite"
                                method="post"
                                on:submit={() => {
                                    onUnFav(
                                        perPage * ((currentPage || 1) - 1) + i,
                                        favoriteSessions[perPage * ((currentPage || 1) - 1) + i].sessionId
                                    );
                                }}
                            >
                                <input hidden id="userId" name="userId" value={userData.userId} />
                                <input
                                    hidden
                                    id="sessionId"
                                    name="sessionId"
                                    value={favoriteSessions[perPage * ((currentPage || 1) - 1) + i].sessionId}
                                />
                                <button type="submit"><Favorited design="hover:scale-110" /></button>
                            </form>
						</button>
					</div>
					<h2>{favoriteSessions[perPage * ((currentPage || 1) - 1) + i].session.sessionName}</h2>
					<p class="session-info">
						Created by {favoriteSessions[perPage * ((currentPage || 1) - 1) + i].session.user.userName} on 
                        {favoriteSessions[perPage * ((currentPage || 1) - 1) + i].session.createdAt.split('T')[0]}
					</p>

					<div class="tags">
						{#if favoriteSessions[perPage * ((currentPage || 1) - 1) + i].session.tags != null}
							{#each favoriteSessions[perPage * ((currentPage || 1) - 1) + i].session.tags as tag (tag)}
								<span class="tag">{tag}</span>
							{/each}
						{:else}
							<p class="message">No tags available</p>
						{/if}
					</div>

					{#if Object.keys(favoriteSessions[perPage * ((currentPage || 1) - 1) + i].session.courses).length > 0}
						<p class="session-info">
							Courses: {favoriteSessions[perPage * ((currentPage || 1) - 1) + i].session.courses
								.map((course) => course.courseName)
								.join(', ')}
						</p>
					{:else}
						<p class="message">No courses available</p>
					{/if}
				</div>
			{/if}
		{/each}
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.PrevButton />
			</Pagination.Item>
			{#each pages as page (page.key)}
				{#if page.type === 'ellipsis'}
					<Pagination.Item>
						<Pagination.Ellipsis />
					</Pagination.Item>
				{:else}
					<Pagination.Item>
						<Pagination.Link {page} isActive={currentPage == page.value}>
							{page.value}
						</Pagination.Link>
					</Pagination.Item>
				{/if}
			{/each}
			<Pagination.Item>
				<Pagination.NextButton />
			</Pagination.Item>
		</Pagination.Content>
	</Pagination.Root>
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
