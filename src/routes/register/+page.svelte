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

	const newUserSchema = z
		.object({
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
				.trim(),
			passwordConfirm: z
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
		})
		.superRefine(({ passwordConfirm, password }, ctx) => {
			if (passwordConfirm != password) {
				ctx.addIssue({
					code: 'custom',
					message: 'Password and Confirm Password must match',
					path: ['password']
				});
				ctx.addIssue({
					code: 'custom',
					message: 'Password and Confirm Password must match',
					path: ['passwordConfirm']
				});
			}
		});

	const { form, errors, enhance, constraints, message } = superForm(data.form, {
		validators: newUserSchema
	});

	let isLoading = false;
	async function onSubmit() {
		isLoading = true;
		setTimeout(() => {
			isLoading = false;
		}, 3000);
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
		<!-- <div class="absolute inset-0 bg-cover w-full h-full bg-gradient-to-b from-purple-500 to-blue-500 min-h-screen"></div> -->
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

	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
				<p class="text-sm text-muted-foreground">Enter your email below to create your account</p>
			</div>

			<div class={cn('grid gap-6', className)} {...$$restProps}>
				<form
					use:enhance
					action="?/register"
					method="post"
					enctype="multipart/form-data"
				>
					<div class="grid gap-2">
						{#if $message}
							<div
								class="rounded-sm border-2 border-red-500 bg-red-100 px-2 py-2 text-base text-red-500"
							>
								{$message}
							</div>
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
						<div class="grid gap-2">
							<Label for="passwordConfirm">Confirm Password</Label>
							<Input
								id="passwordConfirm"
								name="passwordConfirm"
								placeholder="**********"
								type="password"
								disabled={isLoading}
								bind:value={$form.passwordConfirm}
								class={$errors.passwordConfirm ? 'border-red-500' : null}
							/>
							{#if $errors.passwordConfirm}
								<small class="text-red-500">{$errors.passwordConfirm[0]}</small>
							{/if}
						</div>
						<Button type="submit" disabled={isLoading}>
							{#if isLoading}
								<i class="fa fa-spinner fa-spin px-3" style="font-size:24px" />
							{/if}
							Register
						</Button>
					</div>
				</form>
			</div>

			<div>
				<p class="text-sm text-muted-foreground">
					Alread have an account? <a href="/login" class="text-sky-600 hover:underline">Log In</a>
				</p>
			</div>
		</div>
	</div>
</div>
