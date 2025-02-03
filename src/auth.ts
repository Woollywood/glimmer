import NextAuth, { DefaultSession } from 'next-auth';
import authConfig from './auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { User as PrismaUser } from '@prisma/client';

import { signInDto } from './actions/auth/sign-in/dto';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail, getUserById } from '@/data/user';

declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: PrismaUser;
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },
	...authConfig,
	providers: [
		...authConfig.providers,
		Credentials({
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const validatedFields = signInDto.safeParse(credentials);
				if (!validatedFields.success) {
					throw new Error('Invalid credentials');
				}

				return await getUserByEmail(validatedFields.data.email);
			},
		}),
	],
	callbacks: {
		async jwt({ token }) {
			if (token.sub) {
				const user = await getUserById(token.sub!);
				token = { ...token, user };
			}

			return token;
		},
		async session({ token, session }) {
			session.user = token.user as PrismaUser;
			return session;
		},
	},
});
