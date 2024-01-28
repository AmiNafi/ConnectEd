<script lang="ts">
	export let items: { href: string; text: string }[];
</script>

<ul class="breadcrumb">
	{#each items as item, i}
		<li>
			{#if i === items.length - 1}
				{item.text}
			{:else}
				<a href={item.href}>{item.text}</a>
			{/if}
		</li>
	{/each}
</ul>

<style>
	/* Style the list */
	ul.breadcrumb {
		padding: 10px 16px;
		list-style: none;
		/* background-color: #eee; */
	}
	/* Display list items side by side */
	ul.breadcrumb li {
		display: inline;
		font-size: 18px;
	}
	/* Add a slash symbol (/) before/behind each list item */
	ul.breadcrumb li + li:before {
		padding: 8px;
		color: black;
		content: '/\00a0';
	}
	/* Add a color to all links inside the list */
	ul.breadcrumb li a {
		color: #08467d;
		text-decoration: none;
	}
	/* Add a color on mouse-over */
	ul.breadcrumb li a:hover {
		color: #01447e;
		text-decoration: underline;
	}
</style>
