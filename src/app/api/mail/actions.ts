import { env } from '@/configs/env';
import { resend } from '@/lib/resend';

export const sendPasswordResetTokenEmail = async (email: string, token: string) => {
	const resetLink = `${env.APP_URL}/reset-password?token=${token}`;
	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: '2FA Code',
		html: `<p>To reset password follow this link: ${resetLink}</p>`,
	});
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: email,
		subject: '2FA Code',
		html: `<p>Your 2FA code: ${token}</p>`,
	});
};
