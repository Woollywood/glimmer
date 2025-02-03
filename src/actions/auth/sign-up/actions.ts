'use server';

import { signIn } from '@/auth';
import { signUp } from '../service';
import { SignUpDto } from './dto';
import { env } from '@/configs/env';

export const signUpWithCredentials = async (dto: SignUpDto, callbackUrl?: string) => {
	try {
		await signUp(dto);
		await signIn('credentials', { ...dto, redirectTo: callbackUrl || env.AUTH_DEFAULT_REDIRECT_URL });
	} catch (error) {
		throw error;
	}
};
