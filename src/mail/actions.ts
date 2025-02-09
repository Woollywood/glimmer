import { env } from '@/configs/env';
import { resend } from '@/lib/resend';
import { User } from 'better-auth';

export const sendResetPassword = async ({ user: { email }, url }: { user: User; url: string }) => {
	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'Reset your password',
		html: `<p>Click the link to reset your password: ${url}</p>`,
	});
};

export const sendVerificationEmail = async ({ user: { email }, url }: { user: User; url: string }) => {
	const newURL = new URL(url);
	newURL.searchParams.set('callbackURL', env.EMAIL_VERIFICATION_CALLBACK_URL);

	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: 'Email Verification',
		html: `<p>Click the link to verify your email: ${newURL.href}</p>`,
	});
};
