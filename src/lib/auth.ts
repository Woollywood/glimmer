import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './prisma';
import { sendResetPassword, sendVerificationEmail } from '@/mail/actions';
import { openAPI } from 'better-auth/plugins';

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'postgresql',
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		sendResetPassword,
	},
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		sendVerificationEmail,
	},
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		},
		google: {
			clientId: process.env.GOOGLE_ID!,
			clientSecret: process.env.GOOGLE_SECRET!,
		},
	},
	databaseHooks: {
		user: {
			create: {
				after: async ({ id }) => {
					await prisma.profile.create({
						data: { userId: id },
					});
				},
			},
		},
	},
	plugins: [openAPI()],
});
