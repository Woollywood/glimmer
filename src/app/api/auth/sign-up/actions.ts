'use server';

import { signUp } from '../service';
import { SignUpDto } from './dto';

export const signUpWithCredentials = async (dto: SignUpDto) => {
	try {
		await signUp(dto);
	} catch (error) {
		throw error;
	}
};
