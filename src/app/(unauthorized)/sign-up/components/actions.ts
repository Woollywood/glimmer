'use server';

import { signUpWithCredentials } from '@/app/api/auth/sign-up/actions';
import { SignUpDto } from '@/app/api/auth/sign-up/dto';

export const signUp = async (dto: SignUpDto) => {
	await signUpWithCredentials(dto);
	return true;
};
