'use server';

import { prisma } from '@/lib/prisma';
import { forgotPassword as _forgotPassword } from '../service';
import { v4 as uuid } from 'uuid';
import { resend } from '@/lib/resend';

export const forgotPassword = async (email: string) => {
	try {
		await _forgotPassword(email);
	} catch (error) {
		throw error;
	}
};

export const getPasswordResetTokenByToken = async (token: string) =>
	await prisma.passwordResetToken.findUnique({ where: { token } });

export const getPasswordResetTokenByEmail = async (email: string) =>
	await prisma.passwordResetToken.findFirst({ where: { email } });

export const generatePasswordResetToken = async (email: string) => {
	const token = uuid();
	const expires = new Date(new Date().getTime() + 60 * 5 * 1000);

	const existingToken = await getPasswordResetTokenByEmail(email);
	if (existingToken) {
		await prisma.passwordResetToken.delete({ where: { id: existingToken.id } });
	}

	return await prisma.passwordResetToken.create({ data: { email, expires, token } });
};

export const sendPasswordResetTokenEmail = async (email: string, token: string) => {
	const resetLink = `http://localhost:3000/reset-password?token=${token}`;
	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: '2FA Code',
		html: `<p>To reset password follow this link: ${resetLink}</p>`,
	});
};
