'use server';

import { prisma } from '@/lib/prisma';
import { RequestError } from '@/helpers/requestError';
import { getHashedPassword } from '@/helpers/getHashedPassword';
import { NextResponse } from 'next/server';
import { SignInDto } from './sign-in/dto';
import { SignUpDto } from './sign-up/dto';
import bcrypt from 'bcrypt';
import { getUserByEmail } from '../user/service';
import {
	generateTwoFactorToken,
	getTwoFactorConfirmationByUserId,
	getTwoFactorTokenByToken,
} from './twoFactor/actions';
import { generatePasswordResetToken, getPasswordResetTokenByToken } from './forgot-password/actions';
import { sendPasswordResetTokenEmail, sendTwoFactorTokenEmail } from '../mail/actions';

export const signUp = async ({ name, email, password }: SignUpDto) => {
	const existingUser = await getUserByEmail(email);
	if (existingUser) {
		throw new RequestError('Email already exists', 400);
	}

	const hashedPassword = await getHashedPassword(password);
	await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	});

	await twoFactorToken(email);

	return NextResponse.json(null, { status: 201 });
};

export const signIn = async ({ email, password }: SignInDto) => {
	const user = await getUserByEmail(email);
	if (!user) {
		throw new RequestError('User not found', 400);
	}

	if (user.accounts) {
		return NextResponse.json(null, { status: 200 });
	}

	if (user.password) {
		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			throw new RequestError('Invalid password', 400);
		}
	}

	const existingTwoFactorConfirmation = await getTwoFactorConfirmationByUserId(user.id);
	if (!existingTwoFactorConfirmation) {
		await twoFactorToken(email);
	}

	return NextResponse.json(null, { status: 200 });
};

const twoFactorToken = async (email: string) => {
	const { token } = await generateTwoFactorToken(email);
	await sendTwoFactorTokenEmail(email, token);
};

export const twoFactorCheckCode = async (token: string) => {
	const existingToken = await getTwoFactorTokenByToken(token);
	if (!existingToken) {
		throw new RequestError('Invalid token', 500);
	}

	if (existingToken.expires < new Date()) {
		throw new RequestError('Token has expired', 500);
	}

	return NextResponse.json(null, { status: 200 });
};

export const forgotPassword = async (email: string) => {
	const user = await getUserByEmail(email);
	if (!user) {
		throw new RequestError('User not exists', 500);
	}

	const token = await generatePasswordResetToken(email);
	await sendPasswordResetTokenEmail(token.email, token.token);

	return NextResponse.json(null, { status: 200 });
};

export const resetPassword = async (password: string, token?: string) => {
	if (!token) {
		throw new RequestError('Missing token', 500);
	}

	const existingToken = await getPasswordResetTokenByToken(token);
	if (!existingToken) {
		throw new RequestError('Invalid token', 500);
	}

	if (existingToken.expires < new Date()) {
		throw new RequestError('Token has expired', 500);
	}

	const existingUser = await getUserByEmail(existingToken.email);
	if (!existingUser) {
		throw new RequestError('Email does not exists!', 500);
	}

	const hashedPassword = await getHashedPassword(password);
	await prisma.user.update({
		where: { id: existingUser.id },
		data: { password: hashedPassword },
	});
	await prisma.passwordResetToken.delete({ where: { id: existingToken.id } });
	return NextResponse.json(null, { status: 200 });
};
