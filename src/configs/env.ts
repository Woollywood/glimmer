export const env = {
	DATABASE_URL: process.env.DATABASE_URL!,
	BCRYPT_SALT: process.env.BCRYPT_SALT!,

	AUTH_ERROR_URL: process.env.AUTH_ERROR_URL!,
	AUTH_DEFAULT_URL: process.env.AUTH_DEFAULT_URL!,

	RESEND_API_KEY: process.env.RESEND_API_KEY!,
};
