<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { cn } from '$lib/utils';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { z } from 'zod';

	let className: string | undefined | null = undefined;
	export { className as class };

	export let data: PageData;

	const userSchema = z.object({
		email: z
			.string({ required_error: 'Email is required' })
			.min(1, { message: 'Email is required' })
			.max(256, { message: 'Email must be less than 256 characters' })
			.email({ message: 'Email must be a valid email address' }),
		password: z
			.string({ required_error: 'Password is required' })
			.min(8, { message: 'Password must be at least 8 characters' })
			.max(32, { message: 'Password must be less than 32 characters' })
			.regex(new RegExp('.*[A-Z].*'), 'Password must contain at least one uppercase character')
			.regex(new RegExp('.*[a-z].*'), 'Password must contain at least one lowercase character')
			.regex(new RegExp('.*\\d.*'), 'Password must contain at least one number')
			.regex(
				new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
				'Password must contain at least one special character'
			)
			.trim()
	});

	const { form, errors, enhance, constraints, message } = superForm(data.form, {
		validators: userSchema,
	});

	let isLoading = false;
	async function onSubmit() {
		isLoading = true;
		setTimeout(() => {
			isLoading = false;
		}, 10000);
	}
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
		class="invisible lg:visible lg:absolute right-4 top-4 md:right-8 md:top-8">Login</Button
	>
	<Button
		href="/register"
		variant="ghost"
		class="invisible lg:visible lg:absolute right-24 top-4 md:right-28 md:top-8">Register</Button
	>
	<!-- <Button href="/landing-page" class="invisible lg:visible lg:absolute right-44 top-4 md:right-48 md:top-8">Test Landing Page</Button> -->
	<div
		class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex justify-center items-center"
	>

		<!-- <div class="absolute inset-0 bg-cover w-full h-full bg-gradient-to-b from-purple-500 to-blue-500 min-h-screen"></div> -->
		<!-- <div class="absolute inset-0 bg-cover w-full h-full bg-gradient-to-b from-indigo-800 to-blue-900 min-h-screen"></div> -->
		<div class="absolute inset-0 bg-cover w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen"></div>
		<div class="relative z-20 flex items-center text-5xl font-black text-white font-mono">Connected</div>
		<div class="relative z-20">
			<blockquote class="space-y-2">
				<p class="text-2xl text-white font-mono text-center">A study resource management and collaborative study platform.</p>
				<!-- <footer class="text-sm">Sofia Davis</footer> -->
			</blockquote>
		</div>
	</div>

	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Login to your account</h1>
				<p class="text-sm text-muted-foreground">Enter your email below to login to your account</p>
			</div>

			<div class={cn('grid gap-6', className)} {...$$restProps}>
				<form use:enhance action="?/login" method="post" on:submit={()=>{onSubmit()}}>
					<div class="grid gap-2">
						{#if $message}
							<div class="text-red-500 border-red-500 border-2 bg-red-100 py-2 px-2 rounded-sm text-base">{$message}</div>
						{/if}
						<div class="grid gap-2">
							<Label for="email">Email</Label>
							<Input
								id="email"
								name="email"
								placeholder="name@example.com"
								type="email"
								autocapitalize="none"
								autocomplete="email"
								autocorrect="off"
								disabled={isLoading}
								bind:value={$form.email}
								class={$errors.email ? 'border-red-500' : null}
							/>
							{#if $errors.email}
								<small class="text-red-500">{$errors.email[0]}</small>
							{/if}
						</div>
						<div class="grid gap-2">
							<Label for="password">Password</Label>
							<Input
								id="password"
								name="password"
								placeholder="**********"
								type="password"
								disabled={isLoading}
								bind:value={$form.password}
								class={$errors.password ? 'border-red-500' : null}
							/>
							{#if $errors.password}
								<small class="text-red-500">{$errors.password[0]}</small>
							{/if}
						</div>
						<Button type="submit" disabled={isLoading}>
							{#if isLoading}
								<i class="fa fa-spinner fa-spin px-3" style="font-size:24px" />
							{/if}
							Sign In
						</Button>
					</div>
				</form>
			</div>
			<div class="flex justify-between">
				<p class="text-sm text-muted-foreground">
					Don't have an account? <a href="/register" class="text-sky-600 hover:underline"
						>Register</a
					>
				</p>

				<p class="text-sm text-sky-600 hover:underline">Reset Password</p>
			</div>
		</div>
	</div>
</div>
