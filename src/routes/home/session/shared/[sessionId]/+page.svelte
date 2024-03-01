<script lang="ts">
	import { page } from '$app/stores';
	import Breadcrumb from '$lib/components/others/breadcrumb.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import type { session, course } from '$lib/server/schema';
	import Notebook from '$lib/components/others/notebook.svelte';
	import Setting from '$lib/components/others/setting.svelte';
	import type { LayoutData, PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: LayoutData;
	const userData = data.user[0];
	const successStatus = data.success;
	let currentSession :any = null
	// const sessionIndex = userSessions.findIndex((session: session)=> session.sessionId?.toString() == $page.params.sessionId)
	let sessionCoursess :any = null

	let items :any = null

	onMount(() => {
		if (successStatus) {
			currentSession = data.otherSessionData[0];
			sessionCoursess = currentSession.courses as course[];
			items = [
				// { href: './', text: 'Shared Session' },
				{ href: './' + $page.params.sessionId, text: currentSession.sessionName }
			];
		}
	});
</script>

{#if !successStatus}
	<div class="flex h-full w-full items-center justify-center">
		<Label class="mb-10 mt-10 text-center text-3xl font-medium">This is not a shared Session</Label>
	</div>
{:else}
	<div class="flex grow flex-col items-center">
		<div class="flex w-full flex-row flex-wrap justify-between">
			<Breadcrumb {items} />
			<!-- <a href="./{currentSession.sessionId}/settings"><Setting/></a> -->
		</div>
		<Label class="mb-10 mt-10 text-center text-3xl font-medium"
			>{currentSession.sessionName}/Courses</Label
		>
		<!-- <Button href="./{$page.params.sessionId}/new-course" class="bg-green-600 hover:bg-green-900 mb-20">Add New Course</Button> -->
		<div class="flex w-full flex-row flex-wrap items-start justify-start gap-10">
			{#each sessionCoursess as course}
				<div class="flex w-52 flex-col">
					<a href="./{$page.params.sessionId}/{course.courseId}"
						><Notebook cl="hover:scale-105" theme={course.theme} /></a
					>
					<Label class="mt-5 text-center text-xl font-medium">{course.courseName}</Label>
				</div>
			{/each}
		</div>
	</div>
{/if}
