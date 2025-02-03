'use server';

import { prisma } from '@/lib/prisma';
import { forgotPassword as _forgotPassword } from '../service';
import { v4 as uuid } from 'uuid';
import { getPasswordResetTokenByEmail } from '@/data/passwordResetToken';

export const forgotPassword = async (email: string) => {
	try {
		await _forgotPassword(email);
	} catch (error) {
		throw error;
	}
};

export const generatePasswordResetToken = async (email: string) => {
	const token = uuid();
	const expires = new Date(new Date().getTime() + 60 * 5 * 1000);

	const existingToken = await getPasswordResetTokenByEmail(email);
	if (existingToken) {
		await prisma.passwordResetToken.delete({ where: { id: existingToken.id } });
	}

	return await prisma.passwordResetToken.create({ data: { email, expires, token } });
};
