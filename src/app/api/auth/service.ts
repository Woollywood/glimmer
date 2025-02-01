'use server';

import { prisma } from '@/lib/prisma';
import { RequestError } from '@/helpers/requestError';
import { getHashedPassword } from '@/helpers/getHashedPassword';
import { NextResponse } from 'next/server';
import { SignInDto } from './sign-in/dto';
import { SignUpDto } from './sign-up/dto';
import bcrypt from 'bcrypt';
import { getUserByEmail } from '../user/service';

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

	return NextResponse.json(null, { status: 200 });
};
