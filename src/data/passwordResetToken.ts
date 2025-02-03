'use server';

import { prisma } from '@/lib/prisma';

export const getPasswordResetTokenByToken = async (token: string) =>
	await prisma.passwordResetToken.findUnique({ where: { token } });

export const getPasswordResetTokenByEmail = async (email: string) =>
	await prisma.passwordResetToken.findFirst({ where: { email } });
