'use server';

import { prisma } from '@/lib/prisma';
import { RequestError } from '@/helpers/requestError';
import { getHashedPassword } from '@/helpers/getHashedPassword';
import { NextResponse } from 'next/server';
import { SignInDto } from './sign-in/dto';
import { SignUpDto } from './sign-up/dto';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import { getUserByEmail } from '../user/service';
import { resend } from '@/lib/resend';

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

	const verificationToken = await generateVerificationToken(email);
	await sendVerificationEmail(verificationToken.email, verificationToken.token);

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

	if (!user.emailVerified) {
		const verificationToken = await generateVerificationToken(email);
		await sendVerificationEmail(verificationToken.email, verificationToken.token);
		return NextResponse.json(null, { status: 201 });
	}

	return NextResponse.json(null, { status: 200 });
};

export const generateVerificationToken = async (email: string) => {
	const token = uuid();
	const expires = new Date(new Date().getTime() + 3600 * 1000);

	const existingToken = await getVerificationTokenByEmail(email);
	if (existingToken) {
		await prisma.verificationToken.delete({
			where: {
				id: existingToken.id,
			},
		});
	}

	const verificationToken = await prisma.verificationToken.create({
		data: {
			email,
			token,
			expires,
		},
	});

	return verificationToken;
};

export const getVerificationTokenByToken = async (token: string) =>
	await prisma.verificationToken.findFirst({ where: { token } });

export const getVerificationTokenByEmail = async (email: string) =>
	await prisma.verificationToken.findFirst({ where: { email } });

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = `http://localhost:3000/new-verification?token=${token}`;

	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'Confirm your email',
		html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
	});
};

export const verifyToken = async (token: string) => {
	const existingToken = await getVerificationTokenByToken(token);

	if (!existingToken) {
		throw new RequestError('Token does not exists', 500);
	}

	const hasExpired = new Date(existingToken.expires) < new Date();
	if (hasExpired) {
		throw new RequestError('Token has expired', 500);
	}

	const existingUser = await getUserByEmail(existingToken.email);
	if (!existingUser) {
		throw new RequestError('Email does not exist', 500);
	}

	await prisma.user.update({
		where: { id: existingUser.id },
		data: {
			emailVerified: new Date(),
			email: existingToken.email,
		},
	});

	await prisma.verificationToken.delete({ where: { id: existingToken.id } });

	return NextResponse.json(null, { status: 200 });
};
