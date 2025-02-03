'use server';

import { resetPassword as _resetPassword } from '../service';

export const resetPassword = async (password: string, token?: string) => {
	try {
		await _resetPassword(password, token);
	} catch (error) {
		throw error;
	}
};
