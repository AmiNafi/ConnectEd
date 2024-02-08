<script lang="ts">
	import { onMount } from 'svelte';
	import 'quill/dist/quill.snow.css';
	
	export let blogContent: string

	let quill: any;
	let editor: any;

	// function contentToBlob(content: any) {
	// 	return new Blob([content], { type: 'text/html' });
	// }

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
	});
	// let me
	function makeStrong() {
		blogContent = '<strong>' + quill.root.innerHTML + '</strong>';
	}
</script>

<div bind:this={editor} id="editor"/>
<button on:click={makeStrong}>Click</button>

<style>
	.editor {
		height: 800px;
	}
	.saved-content {
		border: 1px solid #ccc;
		padding: 20px;
		margin-top: 20px;
		margin-bottom: 10px;
	}
	.btn {
		margin-top: 20px;
	}
</style>
