'use server';

import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/resend';
import crypto from 'crypto';
import { twoFactorCheckCode } from '../service';
import { SignInDto } from '../sign-in/dto';
import { signIn } from '@/auth';
import { getUserByEmail } from '../../user/service';

export const twoFactorSignIn = async (dto: SignInDto, token?: string) => {
	try {
		if (token) {
			await twoFactorCheckCode(token);
			const user = await getUserByEmail(dto.email);
			await prisma.twoFactorConfirmation.create({ data: { userId: user?.id || '' } });
			await prisma.twoFactorToken.delete({ where: { token } });
		}
		await signIn('credentials', dto);
	} catch (error) {
		throw error;
	}
};

export const getTwoFactorTokenByToken = async (token: string) =>
	await prisma.twoFactorToken.findUnique({ where: { token } });

export const getTwoFactorTokenByEmail = async (email: string) =>
	await prisma.twoFactorToken.findFirst({ where: { email } });

export const getTwoFactorConfirmationByUserId = async (userId: string) =>
	await prisma.twoFactorConfirmation.findUnique({ where: { userId } });

export const generateTwoFactorToken = async (email: string) => {
	const token = crypto.randomInt(100_000, 1_000_000).toString();
	const expires = new Date(new Date().getTime() + 60 * 5 * 1000);

	const existingToken = await getTwoFactorTokenByEmail(email);
	if (existingToken) {
		await prisma.twoFactorToken.delete({
			where: {
				id: existingToken.id,
			},
		});
	}

	return await prisma.twoFactorToken.create({ data: { email, token, expires } });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: '2FA Code',
		html: `<p>Your 2FA code: ${token}</p>`,
	});
};
