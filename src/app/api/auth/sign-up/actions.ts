'use server';

import { signIn as _signIn } from '@/auth';
import { signUp } from '../service';
import { SignUpDto } from './dto';

export const signUpWithCredentials = async (dto: SignUpDto) => {
	try {
		await signUp(dto);
		await _signIn('credentials', dto);
	} catch (error) {
		throw error;
	}
};
