<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import 'quill/dist/quill.snow.css';
	import type { ActionData } from './$types';
    import Breadcrumb from '$lib/components/others/breadcrumb.svelte';
    import type { blog } from '$lib/server/schema';
	import { page } from '$app/stores';
	import type { LayoutData } from '../../../$types';

	export let form: ActionData;
	export let data: LayoutData;

	const userData = data.user[0];
	const userBlogs = userData.blogs as blog[];
	const currentBlog = userBlogs.filter((blog: blog) => {
		return blog.blogId?.toString() == $page.params.blogId;
	})[0];

	let items = [
		{ href: '../', text: 'My Blogs' },
		{ href: '.', text: currentBlog.blogTitle },
        { href: './settings', text: 'Settings' }
	];

	let quill: any;
	let editor: any;
    
	let blogName = currentBlog.blogTitle;
	let blogContent = '';

	let timerId: any;
	let showMessage = false;
	let isLoading = false;

	async function onSubmit() {
		showMessage = false
		isLoading = true;
		timerId = setTimeout(() => {
			isLoading = false;
		}, 5000);
	}

	$: {
		if (form?.success=='success') {
			isLoading = false;
			clearTimeout(timerId);
			chips = [];
			// blogContent = ''
			showMessage = true
			form.success=''
			// quill.root.innerHTML=''
		}
	}

	let chipInput = '';
	let chips: string[] = currentBlog.tags;

	function addChip() {
		if (chipInput.trim() !== '') {
			chips = [...chips, chipInput.trim()];
			chipInput = '';
		}
	}

	function removeChip(index: number) {
		chips = chips.filter((_, i) => i !== index);
	}

	onMount(async () => {
		const Quill = await import('quill');
		quill = new Quill.default(editor, {
			theme: 'snow',
			modules: {
				toolbar: [
					[{ header: [1, 2, false] }],
					['bold', 'italic', 'underline'],
					['image', 'code-block', 'link']
				]
			},
			placeholder: 'Body of the article goes here...'
		});
        quill.root.innerHTML = currentBlog.blogContent
	});

	function makeStrong() {
		blogContent = quill.root.innerHTML;

		currentBlog.blogContent = blogContent
		currentBlog.tags = chips
		currentBlog.blogTitle = blogName
	}

</script>

<link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<div class="flex grow flex-col items-center space-y-6">
    <div class="flex w-full flex-row flex-wrap justify-between">
		<Breadcrumb {items} />
	</div>
	<div>
		<h3 class="mt-10 text-center text-3xl font-medium">Edit Blog</h3>
		<p class="text-sm text-gray-800 text-center">Edit previous blog and post it</p>
	</div>
	{#if showMessage}
		<div
			class="w-[400px] rounded-sm border-2 border-green-500 bg-green-100 px-2 py-2 text-base text-green-500"
		>
			Blog Successfully Edited
		</div>
	{/if}
	<Separator />
	<form
	use:enhance={() => {
		return async ({ update }) => {
			update({ reset: false, invalidateAll:false });
		};
	}}
		action="?/update"
		method="post"
		on:submit={() => {
			onSubmit();
		}}
		class="w-[800px]"
	>
		<button type="submit" disabled style="display: none" aria-hidden="true"></button>
		<!-- svelte-ignore empty-block -->
		<input hidden id="blogId" name="blogId" value={currentBlog.blogId} />
		<input hidden id="writerId" name="writerId" value={data.user[0].userId} />
		<input hidden id="blogContent" name="blogContent" bind:value={blogContent} />
		<div class="grid gap-10">
			<div class="flex flex-row justify-between">
				<div class="grid gap-2">
					<Label for="blogTitle">Blog Title</Label>
					<Input
						required
						class="bg-white"
						id="blogTitle"
						name="blogTitle"
						placeholder="Type blog name"
						type="text"
						autocapitalize="none"
						disabled={isLoading}
						bind:value={blogName}
					/>
				</div>

				<div class="grid gap-2">
					<Label for="tags">Tags (Optional)</Label>

					<input
						disabled={isLoading}
						bind:value={chipInput}
						on:keydown={(event) => event.key === 'Enter' && addChip()}
						placeholder="Add a tag"
						class="rounded-md border border-gray-300 px-2 py-1"
					/>

					{#each chips as chip, index (chip)}
						<div class="chip">
							<span>{chip}</span>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<span class="remove-button" on:click={() => removeChip(index)}>X</span>
						</div>
					{/each}
				</div>

				<input
					hidden
					class="bg-white"
					id="tags"
					name="tags"
					type="text"
					disabled={isLoading}
					bind:value={chips}
				/>
			</div>
			<div class="grid gap-2">
				<Label for="blogContent">Blog Content</Label>
				<div bind:this={editor} id="editor"/>
			</div>
            <div class="flex flex-row justify-center">
			<Button type="submit" disabled={isLoading} class="mb-20 min-w-40" on:click={makeStrong}>
				{#if isLoading}
					<i class="fa fa-spinner fa-spin px-3" style="font-size:24px" />
				{/if}
				Update
			</Button>
        </div>
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

