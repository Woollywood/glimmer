'use server';

import { signIn as _signIn } from '@/auth';
import { signUp } from '../service';
import { SignUpDto } from './dto';

export const signUpWithCredentials = async (dto: SignUpDto) => {
	try {
		const response = await signUp(dto);
		if (response.status === 201) {
			await _signIn('credentials', dto);
		}
	} catch (error) {
		throw error;
	}
};
