'use server';

import { signIn as _signIn } from '@/auth';
import { SignInDto } from './dto';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import { providerMap } from '@/auth.config';
import { signIn } from '../service';

export const signInWithCredentials = async (dto: SignInDto) => {
	try {
		await signIn(dto);
	} catch (error) {
		throw error;
	}
};

export const signInWithOAuth = async (provider: (typeof providerMap)[number], callbackUrl?: string) => {
	try {
		await _signIn(provider.id, {
			redirectTo: callbackUrl ?? '/',
		});
	} catch (error) {
		// Signin can fail for a number of reasons, such as the user
		// not existing, or the user not having the correct role.
		// In some cases, you may want to redirect to a custom error
		if (error instanceof AuthError) {
			return redirect(`${process.env.AUTH_ERROR_URL}?error=${error.type}`);
		}

		// Otherwise if a redirects happens Next.js can handle it
		// so you can just re-thrown the error and let Next.js handle it.
		// Docs:
		// https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
		throw error;
	}
};
