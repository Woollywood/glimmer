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
	sendTwoFactorTokenEmail,
} from './twoFactor/actions';

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

	if (user.password) {
		const isPasswwwordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswwwordCorrect) {
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
	const prismaToken = await getTwoFactorTokenByToken(token);
	if (!prismaToken) {
		throw new RequestError('Invalid token', 500);
	}

	return NextResponse.json(null, { status: 200 });
};
