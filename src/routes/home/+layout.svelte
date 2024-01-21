<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<body
	class="flex flex-col inset-0 w-full min-h-screen bg-gradient-to-br from-blue-300 to-blue-500"
>
	<nav class="w-full flex items-center justify-between flex-wrap bg-blue-800 p-6">
		<div class="flex items-center flex-shrink-0 text-white mr-6">
			<svg
				class="fill-current h-8 w-8 mr-2"
				width="54"
				height="54"
				viewBox="0 0 54 54"
				xmlns="http://www.w3.org/2000/svg"
				><path
					d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"
				/></svg
			>
			<span class="font-semibold text-xl tracking-tight">Connected</span>
		</div>

		<div class="flex-grow flex items-center w-auto">
			<div class="text-sm flex-grow">
				<a
					href="/home"
					class="text-base text-blue-200 hover:text-white hover:scale-110 mr-4"
				>
					My Sessions
				</a>
				<a
					href="#responsive-header"
					class="text-base text-blue-200 hover:text-white hover:scale-110 mr-4"
				>
					SessionBank
				</a>
				<a
					href="#responsive-header"
					class="text-base text-blue-200 hover:text-white hover:scale-110 mr-4"
				>
					My Groups
				</a>
				<a
					href="#responsive-header"
					class="text-base text-blue-200 hover:text-white hover:scale-110 mr-4"
				>
					About
				</a>
			</div>
			<div>
				<form action="/logout" method="post">
					<Button type="submit" class="bg-blue-300 text-base text-black hover:bg-blue-500"
						>Logout</Button
					>
				</form>
			</div>
		</div>
	</nav>

	<slot />
</body>
