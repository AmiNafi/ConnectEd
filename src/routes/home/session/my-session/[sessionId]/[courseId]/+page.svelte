<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { page } from '$app/stores';
	import Breadcrumb from '$lib/components/others/breadcrumb.svelte';
	import type { session, course, lecture, resource, link, note } from '$lib/server/schema';
	import { Button} from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Tabs from '$lib/components/ui/tabs';
	import Setting from '$lib/components/others/setting.svelte';
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import DropdownMenuItem from '$lib/components/ui/dropdown-menu/dropdown-menu-item.svelte';

	export let form: ActionData;
	export let data: PageData;

	let userData = data.user[0];
	let userSessions = userData.sessions;
	let currentSession = userSessions.filter((session: session) => {
		return session.sessionId?.toString() == $page.params.sessionId;
	})[0];
	let sessionIndex = userSessions.findIndex(
		(session: session) => session.sessionId?.toString() == $page.params.sessionId
	);
	let sessionCoursess = currentSession.courses as course[];
	let currentCourse = sessionCoursess.filter((course: course) => {
		return course.courseId?.toString() == $page.params.courseId;
	})[0];
	let courseIndex = sessionCoursess.findIndex(
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

	let timestamp = Date.now()

	let lectureData = data.courseData[0].lectures as lecture[];
	let filteredLectureData = lectureData;

	let resourceData = data.courseData[0].resources as resource[];
	let filteredResourceData = resourceData;

	let linkData = data.courseData[0].links as link[];
	let filteredLinkData = linkData;

	let noteData = data.courseData[0].notes as note[];
	let filteredNoteData = noteData;

	let nameL = '';
	let sortByL = '';

	let lectureName = '';
	let lectureDescription = '';
	let fileL: File | null;
	let file2L: File | null;

	let timerIdL: any;
	let showMessageL = false;
	let isLoadingL = false;

	let nameR = '';
	let sortByR = '';

	let resourceName = '';
	let resourceDescription = '';
	let fileR: File | null;
	let file2R: File | null;

	let timerIdR: any;
	let showMessageR = false;
	let isLoadingR = false;

	let nameLi = '';
	let sortByLi = '';

	let linkName = '';
	let linkDescription = '';
	let fileLi: File | null;
	let file2Li: File | null;

	let timerIdLi: any;
	let showMessageLi = false;
	let isLoadingLi = false;

	let nameN = '';
	let sortByN = '';

	let noteName = '';
	let noteDescription = '';
	let fileN: File | null;
	let file2N: File | null;

	let timerIdN: any;
	let showMessageN = false;
	let isLoadingN = false;

	$: {
		filteredLectureData = lectureData.filter((lecture) => {
			return (
				lecture.lectureName.toLowerCase().includes(nameL.toLowerCase()) ||
				(lecture.description && lecture.description.toLowerCase().includes(nameL.toLowerCase()))
			);
		});

		filteredLectureData = filteredLectureData.sort(function (x, y) {
			if (sortByL == 'newest') {
				if (x.createdAt! < y.createdAt!) {
					return -1;
				}
				if (x.createdAt! > y.createdAt!) {
					return 1;
				}
				return 0;
			} else if (sortByL == 'oldest') {
				if (x.createdAt! < y.createdAt!) {
					return 1;
				}
				if (x.createdAt! > y.createdAt!) {
					return -1;
				}
				return 0;
			} else {
				return 0;
			}
		});
	}

	$: {
		if (form?.success == 'lectureUpload') {
			isLoadingL = false;
			clearTimeout(timerIdL);

			data.courseData[0].lectures = data.courseData[0].lectures;
			lectureData = data.courseData[0].lectures as lecture[];

			lectureName = '';
			lectureDescription = '';
			fileL = null;

			showMessageL = true;
			form.success = '';
		} else if (form?.success == 'lectureDelete') {
			clearTimeout(timerIdLD);
			data.courseData[0].lectures.splice(selectedLectureIndex, 1);
			lectureData = data.courseData[0].lectures as lecture[];

			isLoadingLD = false;
			showMessageLD = true;
			form.success = '';
		} else if (form?.success == 'lectureUpdate') {
			clearTimeout(timerIdLE);
			data.courseData[0].lectures = lectureData;

			isLoadingLE = false;
			showMessageLE = true;
			file2L = null
			form.success = '';
		} 
		///////////
		else if (form?.success == 'resourceUpload') {
			isLoadingR = false;
			clearTimeout(timerIdR);

			data.courseData[0].resources = data.courseData[0].resources;
			resourceData = data.courseData[0].resources as resource[];

			resourceName = '';
			resourceDescription = '';
			fileR = null;

			showMessageR = true;
			form.success = '';
		} else if (form?.success == 'resourceDelete') {
			clearTimeout(timerIdRD);
			data.courseData[0].resources.splice(selectedResourceIndex, 1);
			resourceData = data.courseData[0].resources as resource[];

			isLoadingRD = false;
			showMessageRD = true;
			form.success = '';
		} else if (form?.success == 'resourceUpdate') {
			clearTimeout(timerIdRE);
			data.courseData[0].resources = resourceData;

			isLoadingRE = false;
			showMessageRE = true;
			file2R = null
			form.success = '';
		}
		///////////
		else if (form?.success == 'linkUpload') {
			isLoadingLi = false;
			clearTimeout(timerIdLi);

			data.courseData[0].links = data.courseData[0].links;
			linkData = data.courseData[0].links as link[];

			linkName = '';
			linkDescription = '';
			fileLi = null;

			showMessageLi = true;
			form.success = '';
		} else if (form?.success == 'linkDelete') {
			clearTimeout(timerIdLiD);
			data.courseData[0].links.splice(selectedLinkIndex, 1);
			linkData = data.courseData[0].links as link[];

			isLoadingLiD = false;
			showMessageLiD = true;
			form.success = '';
		} else if (form?.success == 'linkUpdate') {
			clearTimeout(timerIdLiE);
			data.courseData[0].links = linkData;

			isLoadingLiE = false;
			showMessageLiE = true;
			file2Li = null
			form.success = '';
		}
		///////////
		else if (form?.success == 'noteUpload') {
			isLoadingN = false;
			clearTimeout(timerIdN);

			data.courseData[0].notes = data.courseData[0].notes;
			noteData = data.courseData[0].notes as note[];

			noteName = '';
			noteDescription = '';
			fileN = null;

			showMessageN = true;
			form.success = '';
		} else if (form?.success == 'noteDelete') {
			clearTimeout(timerIdND);
			data.courseData[0].notes.splice(selectedNoteIndex, 1);
			noteData = data.courseData[0].notes as note[];

			isLoadingND = false;
			showMessageND = true;
			form.success = '';
		} else if (form?.success == 'noteUpdate') {
			clearTimeout(timerIdNE);
			data.courseData[0].notes = noteData;

			isLoadingNE = false;
			showMessageNE = true;
			file2N = null
			form.success = '';
		}
	}

	let isLectureEditDialogOpen = false;
	let isLectureDeleteDialogOpen = false;
	let selectedLecture: lecture;
	let selectedLectureIndex: number;

	let isLoadingLE = false;
	let showMessageLE = false;
	let timerIdLE: any;

	let isLoadingLD = false;
	let showMessageLD = false;
	let timerIdLD: any;

	let isResourceEditDialogOpen = false;
	let isResourceDeleteDialogOpen = false;
	let selectedResource: lecture;
	let selectedResourceIndex: number;

	let isLoadingRE = false;
	let showMessageRE = false;
	let timerIdRE: any;

	let isLoadingRD = false;
	let showMessageRD = false;
	let timerIdRD: any;

	let isLinkEditDialogOpen = false;
	let isLinkDeleteDialogOpen = false;
	let selectedLink: lecture;
	let selectedLinkIndex: number;

	let isLoadingLiE = false;
	let showMessageLiE = false;
	let timerIdLiE: any;

	let isLoadingLiD = false;
	let showMessageLiD = false;
	let timerIdLiD: any;

	let isNoteEditDialogOpen = false;
	let isNoteDeleteDialogOpen = false;
	let selectedNote: lecture;
	let selectedNoteIndex: number;

	let isLoadingNE = false;
	let showMessageNE = false;
	let timerIdNE: any;

	let isLoadingND = false;
	let showMessageND = false;
	let timerIdND: any;
</script>

<link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<div class="flex grow flex-col items-center">
	<div class="flex w-full flex-row flex-wrap justify-between">
		<Breadcrumb {items} />
		<a href="./{currentCourse.courseId}/settings"><Setting /></a>
	</div>
	<Label class="mb-10 mt-10 text-center text-3xl font-medium">
		{currentSession.sessionName}/Courses/{currentCourse.courseName}
	</Label>
	<!-- Lecture Tab -->
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
						<Input type="text" placeholder="name" bind:value={nameL} class="max-w-xs bg-muted" />
						<select
							bind:value={sortByL}
							required
							class="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-muted px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
			focus-visible:ring-ring
			focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
						>
							<option value="" disabled selected hidden>-- sort by --</option>
							<option value="newest">Newest</option>
							<option value="oldest">Oldest</option>
						</select>
					</div>
					<div>
						<Dialog.Root
							onOpenChange={() => {
								showMessageL = false;
							}}
						>
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
										Add new lecture. Click save when you're done.
										{#if showMessageL}
											<div
												class="mb-10 w-[300px] rounded-sm border-2 border-green-500 bg-green-100 px-2 py-2 text-base text-green-500"
											>
												Lecture Successfully Uploaded
											</div>
										{/if}
									</Dialog.Description>
								</Dialog.Header>
								<form
									use:enhance={() => {
										return async ({ update }) => {
											update({ reset: false });
										};
									}}
									action="?/uploadLecture"
									method="post"
									enctype="multipart/form-data"
									on:submit={() => {
										isLoadingL = true;
										timerIdL = setTimeout(() => {
											isLoadingL = false;
										}, 10000);
									}}
								>
									<button type="submit" disabled style="display: none" aria-hidden="true"></button>

									<input hidden id="userId" name="userId" value={userData.userId} />
									<input hidden id="sessionId" name="sessionId" value={currentSession.sessionId} />
									<input hidden id="courseId" name="courseId" value={currentCourse.courseId} />

									<div class="grid gap-4 py-4">
										<div class="grid grid-cols-4 items-center gap-4">
											<Label class="text-right">Lecture Name</Label>
											<Input
												required
												id="lectureName"
												name="lectureName"
												class="col-span-3"
												bind:value={lectureName}
												disabled={isLoadingL}
											/>
										</div>

										<div class="grid grid-cols-4 items-center gap-4">
											<Label class="text-right">Description</Label>
											<Textarea
												id="description"
												name="description"
												class="col-span-3"
												bind:value={lectureDescription}
												disabled={isLoadingL}
											/>
										</div>

										<div class="grid grid-cols-4 items-center gap-4">
											<Label class="text-right">File</Label>
											<Input
												required
												id="file"
												name="file"
												class="col-span-3"
												type="file"
												bind:value={fileL}
												disabled={isLoadingL}
												accept=".png, .jpg, .jpeg, .pdf"
											/>
										</div>
									</div>

									<Dialog.Footer>
										<Button type="submit" disabled={isLoadingL}>
											{#if isLoadingL}
												<i class="fa fa-spinner fa-spin px-3" style="font-size:24px" />
											{/if}
											Upload</Button
										>
									</Dialog.Footer>
								</form>
							</Dialog.Content>
						</Dialog.Root>
					</div>
				</div>
			</div>
			<Table.Root class="m-5 max-w-[1000px]">
				<Table.Caption>A list of your lectures.</Table.Caption>
				<Table.Header>
					<Table.Row>
						<Table.Head>Lecture name</Table.Head>
						<Table.Head>Description</Table.Head>
						<Table.Head>Date</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each filteredLectureData as lecture, i (i)}
						<Table.Row>
							<Table.Cell class="font-medium"
								><a
									href={lecture.lectureLink+'?'+timestamp}
									class="text-[#0891B2] no-underline hover:underline"
									target="_blank"
									on:click={()=>{timestamp = Date.now()}}
									>{lecture.lectureName}</a
								></Table.Cell
							>
							<Table.Cell class="max-w-72"
								><p class="break-all">{lecture.description}</p></Table.Cell
							>

							{#if lecture.createdAt != null}
								<Table.Cell>{lecture.createdAt.toString().split('T')[0]}</Table.Cell>
							{/if}
							<Table.Cell class="w-5">
								<!-- <Dialog.Root>
									
								</Dialog.Root> -->
								<DropdownMenu.Root>
									<DropdownMenu.Trigger>
										<svg
											class="h-5 w-5 hover:bg-muted"
											fill="#000000"
											viewBox="0 0 32 32"
											enable-background="new 0 0 32 32"
											id="Glyph"
											version="1.1"
											xml:space="preserve"
											xmlns="http://www.w3.org/2000/svg"
											xmlns:xlink="http://www.w3.org/1999/xlink"
											><path
												d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z"
												id="XMLID_294_"
											/><path
												d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z"
												id="XMLID_295_"
											/><path
												d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z"
												id="XMLID_297_"
											/></svg
										></DropdownMenu.Trigger
									>
									<DropdownMenu.Content>
										<DropdownMenu.Group>
											<!-- <DropdownMenu.Label>Settings</DropdownMenu.Label> -->
											<!-- <DropdownMenu.Separator /> -->
											<DropdownMenuItem
												on:click={() => {
													isLectureEditDialogOpen = true;
													selectedLectureIndex = i;
													selectedLecture = lecture;
												}}
											>
												<svg
													class="ml-2 mr-5 h-5 w-5"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
														stroke="#000000"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
													/>
													<path
														d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
														stroke="#000000"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
													/>
												</svg>
												Edit
											</DropdownMenuItem>
											<DropdownMenuItem
												on:click={() => {
													isLectureDeleteDialogOpen = true;
													selectedLectureIndex = i;
													selectedLecture = lecture;
												}}
											>
												<svg
													version="1.0"
													id="Layer_1"
													xmlns="http://www.w3.org/2000/svg"
													xmlns:xlink="http://www.w3.org/1999/xlink"
													class="ml-2 mr-5 h-5 w-5"
													viewBox="0 0 64 64"
													enable-background="new 0 0 64 64"
													xml:space="preserve"
												>
													<g>
														<path
															fill="#231F20"
															d="M56,4H40c0-2.211-1.789-4-4-4h-8c-2.211,0-4,1.789-4,4H8C5.789,4,4,5.789,4,8v5c0,0.553,0.447,1,1,1h54
c0.553,0,1-0.447,1-1V8C60,5.789,58.211,4,56,4z"
														/>
														<path
															fill="#231F20"
															d="M20,24c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1V25C21,24.447,20.553,24,20,24z"
														/>
														<path
															fill="#231F20"
															d="M32,24c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1V25C33,24.447,32.553,24,32,24z"
														/>
														<path
															fill="#231F20"
															d="M44,24c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1V25C45,24.447,44.553,24,44,24z"
														/>
														<path
															fill="#231F20"
															d="M9,16H7v44c0,2.211,1.789,4,4,4h42c2.211,0,4-1.789,4-4V16h-2H9z M23,51c0,1.657-1.343,3-3,3s-3-1.343-3-3
V25c0-1.657,1.343-3,3-3s3,1.343,3,3V51z M35,51c0,1.657-1.343,3-3,3s-3-1.343-3-3V25c0-1.657,1.343-3,3-3s3,1.343,3,3V51z M47,51
c0,1.657-1.343,3-3,3s-3-1.343-3-3V25c0-1.657,1.343-3,3-3s3,1.343,3,3V51z"
														/>
													</g>
												</svg>
												Delete
											</DropdownMenuItem>
										</DropdownMenu.Group>
									</DropdownMenu.Content>
								</DropdownMenu.Root>
							</Table.Cell>
						</Table.Row>
					{/each}
					<Dialog.Root
						open={isLectureEditDialogOpen}
						onOpenChange={() => {
							isLectureEditDialogOpen = false;
							showMessageLE = false;
						}}
					>
						<Dialog.Trigger class="flex w-full flex-row hover:bg-muted"></Dialog.Trigger>
						<Dialog.Content class="sm:max-w-[425px]">
							<Dialog.Header>
								<Dialog.Title>Add New Lecture</Dialog.Title>
								<Dialog.Description>
									Add new lecture. Click save when you're done.
									{#if showMessageLE}
										<div
											class="mb-10 w-[300px] rounded-sm border-2 border-green-500 bg-green-100 px-2 py-2 text-base text-green-500"
										>
											Lecture Successfully Updated
										</div>
									{/if}
								</Dialog.Description>
							</Dialog.Header>
							<form
								use:enhance={() => {
									return async ({ update }) => {
										update({ reset: false });
									};
								}}
								action="?/updateLecture"
								method="post"
								enctype="multipart/form-data"
								on:submit={() => {
									isLoadingLE = true;
									timerIdLE = setTimeout(() => {
										isLoadingLE = false;
									}, 10000);
								}}
							>
								<button type="submit" disabled style="display: none" aria-hidden="true"></button>

								<input hidden id="lectureId" name="lectureId" value={selectedLecture.lectureId} />
								<input hidden id="savedName" name="savedName" value={selectedLecture.savedName} />

								<div class="grid gap-4 py-4">
									<div class="grid grid-cols-4 items-center gap-4">
										<Label class="text-right">Lecture Name</Label>
										<Input
											id="lectureName"
											name="lectureName"
											class="col-span-3"
											bind:value={selectedLecture.lectureName}
											disabled={isLoadingLE}
										/>
									</div>

									<div class="grid grid-cols-4 items-center gap-4">
										<Label class="text-right">Description</Label>
										<Textarea
											id="description"
											name="description"
											class="col-span-3"
											bind:value={selectedLecture.description}
											disabled={isLoadingLE}
										/>
									</div>

									<div class="grid grid-cols-4 items-center gap-4">
										<Label class="text-right">File</Label>
										<Input
											id="file"
											name="file"
											class="col-span-3"
											type="file"
											bind:value={file2L}
											disabled={isLoadingLE}
											accept=".png, .jpg, .jpeg, .pdf"
										/>
									</div>
								</div>

								<Dialog.Footer>
									<Button type="submit" disabled={isLoadingLE}>
										{#if isLoadingLE}
											<i class="fa fa-spinner fa-spin px-3" style="font-size:24px" />
										{/if}
										Save changes</Button
									>
								</Dialog.Footer>
							</form>
						</Dialog.Content>
					</Dialog.Root>

					<Dialog.Root
						open={isLectureDeleteDialogOpen}
						onOpenChange={() => {
							isLectureDeleteDialogOpen = false;
							showMessageLD = false;
						}}
					>
						<Dialog.Trigger class="flex w-full flex-row hover:bg-muted"></Dialog.Trigger>
						<Dialog.Content class="flex flex-col items-center">
							<Dialog.Header class="flex flex-col items-center">
								<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
								<Dialog.Description>
									This action cannot be undone. This will permanently delete your account and remove
									your data from our servers.
								</Dialog.Description>
							</Dialog.Header>
							<form
								use:enhance={() => {
									return async ({ update }) => {
										update({ reset: false });
									};
								}}
								action="?/deleteLecture"
								method="post"
								on:submit={() => {
									isLoadingLD = true;
									timerIdLD = setTimeout(() => {
										isLoadingLD = false;
									}, 10000);
								}}
							>
								<input hidden id="lectureId" name="lectureId" value={selectedLecture.lectureId} />
								<input hidden id="savedName" name="savedName" value={selectedLecture.savedName} />

								{#if showMessageLD}
									<div
										class="w-[300px] rounded-sm border-2 border-red-500 bg-red-100 px-2 py-2 text-base text-red-500"
									>
										Lecture Successfully Deleted
									</div>
								{:else}
									<Button type="submit" class="w-48 justify-items-center" disabled={isLoadingLD}>
										{#if isLoadingLD}
											<i class="fa fa-spinner fa-spin px-3" style="font-size:24px" />
										{/if}
										Sure</Button
									>
								{/if}
							</form>
						</Dialog.Content>
					</Dialog.Root>
				</Table.Body>
			</Table.Root>
		</Tabs.Content>
		<!-- Resouce Tab -->
		<Tabs.Content value="resource">
				<div class="flex flex-col">
					<div class="mt-5 flex flex-row justify-between">
						<div class="flex flex-row justify-between gap-20">
							<Input type="text" placeholder="name" bind:value={nameL} class="max-w-xs bg-muted" />
							<select
								bind:value={sortByL}
								required
								class="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-muted px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2
				focus-visible:ring-ring
				focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
							>
								<option value="" disabled selected hidden>-- sort by --</option>
								<option value="newest">Newest</option>
								<option value="oldest">Oldest</option>
							</select>
						</div>
						<div>
							<Dialog.Root
								onOpenChange={() => {
									showMessageL = false;
								}}
							>
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
											Add new lecture. Click save when you're done.
											{#if showMessageL}
												<div
													class="mb-10 w-[300px] rounded-sm border-2 border-green-500 bg-green-100 px-2 py-2 text-base text-green-500"
												>
													Lecture Successfully Uploaded
												</div>
											{/if}
										</Dialog.Description>
									</Dialog.Header>
									<form
										use:enhance={() => {
											return async ({ update }) => {
												update({ reset: false });
											};
										}}
										action="?/uploadLecture"
										method="post"
										enctype="multipart/form-data"
										on:submit={() => {
											isLoadingL = true;
											timerIdL = setTimeout(() => {
												isLoadingL = false;
											}, 10000);
										}}
									>
										<button type="submit" disabled style="display: none" aria-hidden="true"></button>
	
										<input hidden id="userId" name="userId" value={userData.userId} />
										<input hidden id="sessionId" name="sessionId" value={currentSession.sessionId} />
										<input hidden id="courseId" name="courseId" value={currentCourse.courseId} />
	
										<div class="grid gap-4 py-4">
											<div class="grid grid-cols-4 items-center gap-4">
												<Label class="text-right">Lecture Name</Label>
												<Input
													required
													id="lectureName"
													name="lectureName"
													class="col-span-3"
													bind:value={lectureName}
													disabled={isLoadingL}
												/>
											</div>
	
											<div class="grid grid-cols-4 items-center gap-4">
												<Label class="text-right">Description</Label>
												<Textarea
													id="description"
													name="description"
													class="col-span-3"
													bind:value={lectureDescription}
													disabled={isLoadingL}
												/>
											</div>
	
											<div class="grid grid-cols-4 items-center gap-4">
												<Label class="text-right">File</Label>
												<Input
													required
													id="file"
													name="file"
													class="col-span-3"
													type="file"
													bind:value={fileL}
													disabled={isLoadingL}
													accept=".png, .jpg, .jpeg, .pdf"
												/>
											</div>
										</div>
	
										<Dialog.Footer>
											<Button type="submit" disabled={isLoadingL}>
												{#if isLoadingL}
													<i class="fa fa-spinner fa-spin px-3" style="font-size:24px" />
												{/if}
												Upload</Button
											>
										</Dialog.Footer>
									</form>
								</Dialog.Content>
							</Dialog.Root>
						</div>
					</div>
				</div>
				<Table.Root class="m-5 max-w-[1000px]">
					<Table.Caption>A list of your lectures.</Table.Caption>
					<Table.Header>
						<Table.Row>
							<Table.Head>Lecture name</Table.Head>
							<Table.Head>Description</Table.Head>
							<Table.Head>Date</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each filteredLectureData as lecture, i (i)}
							<Table.Row>
								<Table.Cell class="font-medium"
									><a
										href={lecture.lectureLink+'?'+timestamp}
										class="text-[#0891B2] no-underline hover:underline"
										target="_blank"
										on:click={()=>{timestamp = Date.now()}}
										>{lecture.lectureName}</a
									></Table.Cell
								>
								<Table.Cell class="max-w-72"
									><p class="break-all">{lecture.description}</p></Table.Cell
								>
	
								{#if lecture.createdAt != null}
									<Table.Cell>{lecture.createdAt.toString().split('T')[0]}</Table.Cell>
								{/if}
								<Table.Cell class="w-5">
									<!-- <Dialog.Root>
										
									</Dialog.Root> -->
									<DropdownMenu.Root>
										<DropdownMenu.Trigger>
											<svg
												class="h-5 w-5 hover:bg-muted"
												fill="#000000"
												viewBox="0 0 32 32"
												enable-background="new 0 0 32 32"
												id="Glyph"
												version="1.1"
												xml:space="preserve"
												xmlns="http://www.w3.org/2000/svg"
												xmlns:xlink="http://www.w3.org/1999/xlink"
												><path
													d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z"
													id="XMLID_294_"
												/><path
													d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z"
													id="XMLID_295_"
												/><path
													d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z"
													id="XMLID_297_"
												/></svg
											></DropdownMenu.Trigger
										>
										<DropdownMenu.Content>
											<DropdownMenu.Group>
												<!-- <DropdownMenu.Label>Settings</DropdownMenu.Label> -->
												<!-- <DropdownMenu.Separator /> -->
												<DropdownMenuItem
													on:click={() => {
														isLectureEditDialogOpen = true;
														selectedLectureIndex = i;
														selectedLecture = lecture;
													}}
												>
													<svg
														class="ml-2 mr-5 h-5 w-5"
														viewBox="0 0 24 24"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
															stroke="#000000"
															stroke-width="1.5"
															stroke-linecap="round"
															stroke-linejoin="round"
														/>
														<path
															d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
															stroke="#000000"
															stroke-width="1.5"
															stroke-linecap="round"
															stroke-linejoin="round"
														/>
													</svg>
													Edit
												</DropdownMenuItem>
												<DropdownMenuItem
													on:click={() => {
														isLectureDeleteDialogOpen = true;
														selectedLectureIndex = i;
														selectedLecture = lecture;
													}}
												>
													<svg
														version="1.0"
														id="Layer_1"
														xmlns="http://www.w3.org/2000/svg"
														xmlns:xlink="http://www.w3.org/1999/xlink"
														class="ml-2 mr-5 h-5 w-5"
														viewBox="0 0 64 64"
														enable-background="new 0 0 64 64"
														xml:space="preserve"
													>
														<g>
															<path
																fill="#231F20"
																d="M56,4H40c0-2.211-1.789-4-4-4h-8c-2.211,0-4,1.789-4,4H8C5.789,4,4,5.789,4,8v5c0,0.553,0.447,1,1,1h54
	c0.553,0,1-0.447,1-1V8C60,5.789,58.211,4,56,4z"
															/>
															<path
																fill="#231F20"
																d="M20,24c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1V25C21,24.447,20.553,24,20,24z"
															/>
															<path
																fill="#231F20"
																d="M32,24c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1V25C33,24.447,32.553,24,32,24z"
															/>
															<path
																fill="#231F20"
																d="M44,24c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1V25C45,24.447,44.553,24,44,24z"
															/>
															<path
																fill="#231F20"
																d="M9,16H7v44c0,2.211,1.789,4,4,4h42c2.211,0,4-1.789,4-4V16h-2H9z M23,51c0,1.657-1.343,3-3,3s-3-1.343-3-3
	V25c0-1.657,1.343-3,3-3s3,1.343,3,3V51z M35,51c0,1.657-1.343,3-3,3s-3-1.343-3-3V25c0-1.657,1.343-3,3-3s3,1.343,3,3V51z M47,51
	c0,1.657-1.343,3-3,3s-3-1.343-3-3V25c0-1.657,1.343-3,3-3s3,1.343,3,3V51z"
															/>
														</g>
													</svg>
													Delete
												</DropdownMenuItem>
											</DropdownMenu.Group>
										</DropdownMenu.Content>
									</DropdownMenu.Root>
								</Table.Cell>
							</Table.Row>
						{/each}
						<Dialog.Root
							open={isLectureEditDialogOpen}
							onOpenChange={() => {
								isLectureEditDialogOpen = false;
								showMessageLE = false;
							}}
						>
							<Dialog.Trigger class="flex w-full flex-row hover:bg-muted"></Dialog.Trigger>
							<Dialog.Content class="sm:max-w-[425px]">
								<Dialog.Header>
									<Dialog.Title>Add New Lecture</Dialog.Title>
									<Dialog.Description>
										Add new lecture. Click save when you're done.
										{#if showMessageLE}
											<div
												class="mb-10 w-[300px] rounded-sm border-2 border-green-500 bg-green-100 px-2 py-2 text-base text-green-500"
											>
												Lecture Successfully Updated
											</div>
										{/if}
									</Dialog.Description>
								</Dialog.Header>
								<form
									use:enhance={() => {
										return async ({ update }) => {
											update({ reset: false });
										};
									}}
									action="?/updateLecture"
									method="post"
									enctype="multipart/form-data"
									on:submit={() => {
										isLoadingLE = true;
										timerIdLE = setTimeout(() => {
											isLoadingLE = false;
										}, 10000);
									}}
								>
									<button type="submit" disabled style="display: none" aria-hidden="true"></button>
	
									<input hidden id="lectureId" name="lectureId" value={selectedLecture.lectureId} />
									<input hidden id="savedName" name="savedName" value={selectedLecture.savedName} />
	
									<div class="grid gap-4 py-4">
										<div class="grid grid-cols-4 items-center gap-4">
											<Label class="text-right">Lecture Name</Label>
											<Input
												id="lectureName"
												name="lectureName"
												class="col-span-3"
												bind:value={selectedLecture.lectureName}
												disabled={isLoadingLE}
											/>
										</div>
	
										<div class="grid grid-cols-4 items-center gap-4">
											<Label class="text-right">Description</Label>
											<Textarea
												id="description"
												name="description"
												class="col-span-3"
												bind:value={selectedLecture.description}
												disabled={isLoadingLE}
											/>
										</div>
	
										<div class="grid grid-cols-4 items-center gap-4">
											<Label class="text-right">File</Label>
											<Input
												id="file"
												name="file"
												class="col-span-3"
												type="file"
												bind:value={file2L}
												disabled={isLoadingLE}
												accept=".png, .jpg, .jpeg, .pdf"
											/>
										</div>
									</div>
	
									<Dialog.Footer>
										<Button type="submit" disabled={isLoadingLE}>
											{#if isLoadingLE}
												<i class="fa fa-spinner fa-spin px-3" style="font-size:24px" />
											{/if}
											Save changes</Button
										>
									</Dialog.Footer>
								</form>
							</Dialog.Content>
						</Dialog.Root>
	
						<Dialog.Root
							open={isLectureDeleteDialogOpen}
							onOpenChange={() => {
								isLectureDeleteDialogOpen = false;
								showMessageLD = false;
							}}
						>
							<Dialog.Trigger class="flex w-full flex-row hover:bg-muted"></Dialog.Trigger>
							<Dialog.Content class="flex flex-col items-center">
								<Dialog.Header class="flex flex-col items-center">
									<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
									<Dialog.Description>
										This action cannot be undone. This will permanently delete your account and remove
										your data from our servers.
									</Dialog.Description>
								</Dialog.Header>
								<form
									use:enhance={() => {
										return async ({ update }) => {
											update({ reset: false });
										};
									}}
									action="?/deleteLecture"
									method="post"
									on:submit={() => {
										isLoadingLD = true;
										timerIdLD = setTimeout(() => {
											isLoadingLD = false;
										}, 10000);
									}}
								>
									<input hidden id="lectureId" name="lectureId" value={selectedLecture.lectureId} />
									<input hidden id="savedName" name="savedName" value={selectedLecture.savedName} />
	
									{#if showMessageLD}
										<div
											class="w-[300px] rounded-sm border-2 border-red-500 bg-red-100 px-2 py-2 text-base text-red-500"
										>
											Lecture Successfully Deleted
										</div>
									{:else}
										<Button type="submit" class="w-48 justify-items-center" disabled={isLoadingLD}>
											{#if isLoadingLD}
												<i class="fa fa-spinner fa-spin px-3" style="font-size:24px" />
											{/if}
											Sure</Button
										>
									{/if}
								</form>
							</Dialog.Content>
						</Dialog.Root>
					</Table.Body>
				</Table.Root>
		</Tabs.Content>
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
