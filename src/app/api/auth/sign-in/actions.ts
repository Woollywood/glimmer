'use server';

import { signIn as _signIn } from '@/auth';
import { SignInDto } from './dto';
import { providerMap } from '@/auth.config';
import { signIn } from '../service';
import { env } from '@/configs/env';

export const signInWithCredentials = async (dto: SignInDto, callbackUrl?: string) => {
	try {
		await signIn(dto);
		await _signIn('credentials', { ...dto, redirectTo: callbackUrl || env.AUTH_DEFAULT_REDIRECT_URL });
	} catch (error) {
		throw error;
	}
};

export const signInWithOAuth = async (provider: (typeof providerMap)[number], callbackUrl?: string) => {
	try {
		await _signIn(provider.id, {
			redirectTo: callbackUrl ?? env.AUTH_DEFAULT_REDIRECT_URL,
		});
	} catch (error) {
		throw error;
	}
};
