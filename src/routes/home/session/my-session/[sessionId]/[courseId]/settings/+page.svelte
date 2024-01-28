<script lang="ts">
	import { page } from '$app/stores';
	import Breadcrumb from '$lib/components/others/breadcrumb.svelte';
	import type { LayoutData } from '../../../../$types';
	import type { session, course } from '$lib/server/schema';
    import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import Setting from '$lib/components/others/setting.svelte';
	import Notebook from '$lib/components/others/notebook.svelte';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
	export let data: LayoutData;
	
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
		console.log(course.courseId+" "+$page.params.courseId)
		return course.courseId?.toString() == $page.params.courseId;
	})[0];
	let courseIndex = sessionCoursess.findIndex(
		(course: course) => course.courseId?.toString() == $page.params.courseId
	);

	let items = [
		{ href: '../../', text: 'My Sessions' },
		{ href: '../', text: currentSession.sessionName },
		{
			href: './',
			text: currentCourse.courseName
		},
        {
            href: './settings',
            text: "Settings"
        }

	];

	let courseName = currentCourse.courseName;
	let description = currentCourse.description;
	let isLock = currentCourse.isLock
	let theme = currentCourse.theme;

	let timerId: any;

	let showMessage = false;
	let isLoading = false;
	async function onSubmit() {
		isLoading = true;
		timerId = setTimeout(() => {
			isLoading = false;
		}, 10000);
	}

	$: {
		if (form?.success) {
			isLoading = false;
			clearTimeout(timerId);
			
			data.user[0].sessions[sessionIndex].courses[courseIndex].courseName = courseName 
			data.user[0].sessions[sessionIndex].courses[courseIndex].description = description 
			data.user[0].sessions[sessionIndex].courses[courseIndex].isLock = isLock 
			data.user[0].sessions[sessionIndex].courses[courseIndex].tags = chips 
			data.user[0].sessions[sessionIndex].courses[courseIndex].theme = theme 

			userData = data.user[0];
			userSessions = userData.sessions;
			currentSession = userSessions.filter((session: session) => {
				return session.sessionId?.toString() == $page.params.sessionId;
			})[0];
			sessionCoursess = currentSession.courses as course[];
			currentCourse = sessionCoursess.filter((course: course) => {
				return course.courseId?.toString() == $page.params.courseId;
			})[0];

			showMessage = true;
			form.success = false;
		}
	}
	

	let chipInput = '';
	let chips: string[] = currentCourse.tags || [];

	function addChip() {
		if (chipInput.trim() !== '') {
			chips = [...chips, chipInput.trim()];
			chipInput = '';
		}
	}

	function removeChip(index: number) {
		chips = chips.filter((_, i) => i !== index);
	}
</script>

<link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<div class="container mx-auto p-8 bg-white shadow-lg rounded-lg">
    <div class="max-w-3xl mx-auto">
        <div class="flex items-center justify-between mb-6">
            <Breadcrumb {items} />
            <a href="./settings" class="text-blue-500 hover:underline">Settings</a>
        </div>
        <h1 class="text-4xl font-semibold mb-8">{currentSession.sessionName}/Courses/{currentCourse.courseName}/Settings</h1>

        {#if showMessage}
            <div class="bg-green-100 border border-green-500 text-green-500 px-4 py-2 mb-8 rounded">
                Course Successfully Updated
            </div>
        {/if}

        <form
            use:enhance={() => {
                return async ({ update }) => {
                    update({ reset: false });
                };
            }}
            action="?/update"
            method="post"
            on:submit={() => {
                onSubmit();
            }}
            class="bg-white p-6 rounded shadow-md"
        >
            <button type="submit" disabled style="display: none" aria-hidden="true"></button>

            <!-- Your hidden inputs -->

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Course Name -->
                <div>
                    <label for="courseName" class="block text-sm font-medium text-gray-600">Course Name</label>
                    <input
                        required
                        class="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        id="courseName"
                        name="courseName"
                        placeholder="Type course name"
                        type="text"
                        autocapitalize="none"
                        disabled={isLoading}
                        bind:value={courseName}
                    />
                </div>

                <!-- Course Description -->
                <div>
                    <label for="description" class="block text-sm font-medium text-gray-600">Course Description (Optional)</label>
                    <textarea
                        class="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        id="description"
                        name="description"
                        placeholder="Type description here."
                        autocapitalize="none"
                        disabled={isLoading}
                        bind:value={description}
                    ></textarea>
                </div>

                <!-- Lock Setting -->
                <div>
                    <label for="isLock" class="block text-sm font-medium text-gray-600">Lock Setting</label>
                    <select
                        disabled={isLoading}
                        name="isLock"
                        id="isLock"
                        bind:value={isLock}
                        required
                        class="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                        <option value="" disabled selected hidden>--Please choose an option--</option>
                        <option value={true}>Locked</option>
                        <option value={false}>Open</option>
                    </select>
                </div>

                <!-- Color Theme -->
                <div>
                    <label for="theme" class="block text-sm font-medium text-gray-600">Color Theme</label>
                    <div class="flex items-center">
                        <Notebook {theme} size="w-24" />
                        <input
                            class="w-36 rounded-md bg-gray-100 border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
                            type="color"
                            id="theme"
                            name="theme"
                            bind:value={theme}
                        />
                    </div>
                </div>

                <!-- Tags (Optional) -->
                <div>
                    <label for="tags" class="block text-sm font-medium text-gray-600">Tags (Optional)</label>
                    <!-- Your tags input and chips -->
                </div>
            </div>

            <Button type="submit" disabled={isLoading} class="mt-8">
                {#if isLoading}
                    <i class="fa fa-spinner fa-spin px-3" style="font-size:24px"></i>
                {/if}
                Update
            </Button>
        </form>
    </div>
</div>

<style>
    /* Additional styles for a more elegant look */
    .container {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .bg-gray-100 {
        background-color: #f8f9fa;
    }

    .text-gray-600 {
        color: #495057;
    }

    .text-blue-500 {
        color: #007bff;
    }

    .border-blue-500 {
        border-color: #007bff;
    }
</style>

