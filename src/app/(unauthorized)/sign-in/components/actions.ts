'use server';

import { signInWithCredentials } from '@/app/api/auth/sign-in/actions';
import { SignInDto } from '@/app/api/auth/sign-in/dto';
import { getTwoFactorTokenByEmail } from '@/app/api/auth/twoFactor/actions';

export const signIn = async (dto: SignInDto) => {
	await signInWithCredentials(dto);
	const token = await getTwoFactorTokenByEmail(dto.email);
	return !!token;
};
