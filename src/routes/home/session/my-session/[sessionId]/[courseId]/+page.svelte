<script lang="ts">
	import { page } from '$app/stores';
	import Breadcrumb from '$lib/components/others/breadcrumb.svelte';
	import type { LayoutData } from '../../../$types';
	import type { session, course } from '$lib/server/schema';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Tabs from '$lib/components/ui/tabs';
	import Setting from '$lib/components/others/setting.svelte';
	import { enhance } from '$app/forms';

	export let data: LayoutData;
	const userData = data.user[0];
	const userSessions = userData.sessions;
	const currentSession = userSessions.filter((session: session) => {
		return session.sessionId?.toString() == $page.params.sessionId;
	})[0];
	const sessionIndex = userSessions.findIndex(
		(session: session) => session.sessionId?.toString() == $page.params.sessionId
	);
	const sessionCoursess = currentSession.courses as course[];
	const currentCourse = sessionCoursess.filter((course: course) => {
		return course.courseId?.toString() == $page.params.courseId;
	})[0];
	const courseIndex = sessionCoursess.findIndex(
		(course: course) => course.courseId?.toString() == $page.params.courseId
	);

	let items = [
		{ href: '../', text: 'My Sessions' },
		{ href: './', text: currentSession.sessionName },
		{
			href: './' + currentCourse.courseId,
			text: currentCourse.courseName
		}
	];

	let name = '';
	let tag = ''

	let lectureName = ''
	let file: File;

</script>

<div class="flex grow flex-col items-center">
	<div class="flex w-full flex-row flex-wrap justify-between">
		<Breadcrumb {items} />
		<a href="./{currentCourse.courseId}/settings"><Setting /></a>
	</div>
	<Label class="mb-10 mt-10 text-center text-3xl font-medium"
		>{currentSession.sessionName}/Courses/{currentCourse.courseName}</Label
	>
	<Tabs.Root value="lecture" class="w-5/6 min-w-8">
		<Tabs.List class="grid w-full grid-cols-4">
			<Tabs.Trigger value="lecture">Lectures</Tabs.Trigger>
			<Tabs.Trigger value="resource">Resources</Tabs.Trigger>
			<Tabs.Trigger value="link">Links</Tabs.Trigger>
			<Tabs.Trigger value="note">Notes</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="lecture">
			<div class="flex flex-col">
				<div class="mt-5 flex flex-row justify-between">
					<div class="flex flex-row justify-between gap-20">
						<Input type="text" placeholder="name" bind:value={name} class="max-w-xs bg-muted" />
						<select
							bind:value={tag}
							required
							class="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-muted px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
			focus-visible:ring-ring
			focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
						>
							<option value="" disabled selected hidden>-- select tag --</option>
							<option value="private">Private</option>
							<option value="public">Public</option>
							<option value="publish">Publish</option>
						</select>
					</div>
					<div>
						<Dialog.Root>
							<Dialog.Trigger
								class="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white ring-offset-background transition-colors
						hover:bg-green-900
						focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
						focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
								>Add New Lecture</Dialog.Trigger
							>

							<Dialog.Content class="sm:max-w-[425px]">
								<Dialog.Header>
									<Dialog.Title>Add New Lecture</Dialog.Title>
									<Dialog.Description>
										Make changes to your profile here. Click save when you're done.
									</Dialog.Description>
								</Dialog.Header>
								<form use:enhance action="?/upload" method="post" enctype="multipart/form-data">
									<input hidden id="userId" name="userId" value={userData.userId} />
									<input hidden id="sessionId" name="sessionId" value={currentSession.sessionId} />
									<input hidden id="courseId" name="courseId" value={currentCourse.courseId} />

									<div class="grid gap-4 py-4">
										<div class="grid grid-cols-4 items-center gap-4">
											<Label class="text-right">Lecture Name</Label>
											<Input id="lectureName" name="lectureName" class="col-span-3" bind:value={lectureName}/>
										</div>
			
										<div class="grid grid-cols-4 items-center gap-4">
											<Label class="text-right">File</Label>
											<Input id="file" name="file" class="col-span-3" type="file" bind:value={file} 
											accept=".png, .jpg, .jpeg, .pdf"/>
										</div>
									</div>

									<Dialog.Footer>
										<Button type="submit">Save changes</Button>
									</Dialog.Footer>
								</form>
							</Dialog.Content>
						</Dialog.Root>
					</div>
				</div>
			</div>
		</Tabs.Content>
		<Tabs.Content value="resource"></Tabs.Content>
		<Tabs.Content value="link"></Tabs.Content>
		<Tabs.Content value="note"></Tabs.Content>
	</Tabs.Root>
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
