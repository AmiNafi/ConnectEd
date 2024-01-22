import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

export const load = async (event) => {
	const form = await superValidate(event, newUserSchema);
	return {
		form
	};
};

const deployPath="https://connect-5m13on4i7-saadmrp-gmailcom.vercel.app/register/verified"
const localPath="http://localhost:5173/register/verified"

const newUserSchema = z
	.object({
		username: z
			.string({ required_error: 'Username is required' })
			.min(1, { message: 'Username is required' })
			.max(64, { message: 'Username must be less than 64 characters' })
			.trim(),
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

export const actions = {
	register: async (event) => {
		const form = await superValidate(event, newUserSchema);
		// console.log(form);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const body = form.data;
		// console.log(body)

		const { data, error: err } = await event.locals.supabase.auth.signUp({
			email: body.email as string,
			password: body.password as string,
			options: {
				emailRedirectTo: deployPath
			}
		});

		// console.log(data);
		// console.log(err);
		
		if (data.user && data.user.identities && data.user.identities.length === 0){
			return message(form, 'Email already in use', {
				status: 400
			});
		}

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return message(form, 'Invalid credentials', {
					status: 400
				});
			}
			return message(form, 'Server error. Try again later', {
				status: 500
			});
		}

		//Redirect to a page telling about wait for email verification
		throw redirect(303, '/register/registered');
	}
};
