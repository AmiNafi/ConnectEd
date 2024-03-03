<script lang="ts">
	import { page } from '$app/stores';
	import Breadcrumb from '$lib/components/others/breadcrumb.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import type { session, course } from '$lib/server/schema';
	import Notebook from '$lib/components/others/notebook.svelte';
	import Setting from '$lib/components/others/setting.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import type { LayoutData, PageData } from './$types';

	export let data: LayoutData;
	const userData = data.user[0];
	const userSessions = userData.sessions;
	const currentSession = data.otherSessionData[0];

	const currentCourses = currentSession.courses as course[];
	let filteredCourses = currentCourses;

	let items = [
		{ href: './', text: 'Public Sessions' },
		{ href: './' + $page.params.sessionId, text: currentSession.sessionName }
	];

	let name = '';
	let tag = '';
	let instructor = '';

	$: {
		if (name.length >= 0) {
			filteredCourses = currentCourses.filter((course) => {
				return course.courseName.toLowerCase().includes(name.toLowerCase());
			});
		}

		if (instructor.length >= 0) {
			filteredCourses = filteredCourses.filter((course) => {
				if (course.instructor) {
					if (course.instructor.toLowerCase().includes(instructor.toLowerCase())) {
						return true;
					}
					return false;
				}
				return true;
			});
		}

		if (tag.length >= 0) {
			filteredCourses = filteredCourses.filter((course) => {
				if (course.tags) {
					for (let i = 0; i < course.tags.length; i++) {
						if (course.tags[i].toLowerCase().includes(tag.toLowerCase())) {
							return true;
						}
					}
					return false;
				}
				if (tag.length == 0) return true;
				else return false;
			});
		}
	}
</script>

<div class="flex grow flex-col items-center">
	<div class="flex w-full flex-row flex-wrap justify-between">
		<Breadcrumb {items} />
		<!-- <a href="./{currentSession.sessionId}/settings"><Setting /></a> -->
	</div>
	<Label class="mb-10 mt-10 text-center text-3xl font-medium"
		>{currentSession.sessionName}/Courses</Label
	>
	<!-- <Button href="./{$page.params.sessionId}/new-course" class="mb-8 bg-green-600 hover:bg-green-900"
		>Add New Course</Button
	> -->
	<div class="mb-4 flex w-[90%] flex-row justify-between gap-20">
		<Input type="text" placeholder="name" name="name" bind:value={name} class="max-w-xs bg-muted" />
		<Input type="text" placeholder="tag" name="tag" bind:value={tag} class="max-w-xs bg-muted" />
		<Input
			type="text"
			placeholder="instructor"
			name="instructor"
			bind:value={instructor}
			class="max-w-xs bg-muted"
		/>
	</div>
	<Separator class="mb-4" />
	<div class="flex w-full flex-row flex-wrap items-start justify-start gap-10">
		{#each filteredCourses as course}
			<div class="flex w-52 flex-col">
				<a href="./{$page.params.sessionId}/{course.courseId}"
					><Notebook cl="hover:scale-105" theme={course.theme} /></a
				>
				<Label class="mt-2 text-center text-xl font-medium">{course.courseName}</Label>
				{#if course.instructor}
				<Label class="mt-2 text-center text-sm font-normal">{course.instructor}</Label>
				{/if}
				{#if course.tags}
					<div class="mt-2 flex flex-row flex-wrap justify-center gap-2">
						{#each course.tags as tag}
							<span
								class="rounded-full border border-black px-2 text-xs transition-colors hover:bg-gray-200"
								>{tag}</span
							>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
