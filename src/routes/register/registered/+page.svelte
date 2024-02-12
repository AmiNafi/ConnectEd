<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<div
	class="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<Button
		href="/login"
		variant="ghost"
		class="invisible right-4 top-4 md:right-8 md:top-8 lg:visible lg:absolute">Login</Button
	>
	<Button
		href="/register"
		variant="ghost"
		class="invisible right-24 top-4 md:right-28 md:top-8 lg:visible lg:absolute">Register</Button
	>

	<div
		class="relative hidden h-full flex-col items-center justify-center bg-muted p-10 text-white dark:border-r lg:flex"
	>
		<div
			class="absolute inset-0 h-full min-h-screen w-full bg-gradient-to-b from-gray-800 to-gray-900 bg-cover"
		></div>
		<div class="relative z-20 flex items-center font-mono text-5xl font-black text-white">
			Connected
		</div>
		<div class="relative z-20">
			<blockquote class="space-y-2">
				<p class="text-center font-mono text-2xl text-white">
					A study resource management and collaborative study platform.
				</p>
				<!-- <footer class="text-sm">Sofia Davis</footer> -->
			</blockquote>
		</div>
	</div>

	<div class="flex flex-row justify-center lg:p-8">
		<div>
			<img
				alt="The project logo"
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/64px-Eo_circle_green_checkmark.svg.png"
			/>
		</div>
		<div class="flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Registration Completed</h1>
				<p class="text-sm text-muted-foreground">Please wait for verification email</p>
			</div>

			<div class={cn('grid gap-6', className)} {...$$restProps}></div>
		</div>
	</div>
</div>
