'use server';

import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { twoFactorCheckCode } from '../service';
import { SignInDto } from '../sign-in/dto';
import { signIn } from '@/auth';
import { getUserByEmail } from '../../user/service';
import { env } from '@/configs/env';

export const twoFactorSignIn = async ({
	dto,
	token,
	callbackUrl,
}: {
	dto: SignInDto;
	token?: string;
	callbackUrl?: string;
}) => {
	try {
		if (token) {
			await twoFactorCheckCode(token);
			const user = await getUserByEmail(dto.email);
			await prisma.twoFactorConfirmation.create({ data: { userId: user?.id || '' } });
			await prisma.twoFactorToken.delete({ where: { token } });
		}
		await signIn('credentials', { ...dto, redirectTo: callbackUrl || env.AUTH_DEFAULT_REDIRECT_URL });
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
