import { z } from 'zod';

export type ForgotPasswordDto = z.infer<typeof forgotPasswordDto>;
export const forgotPasswordDto = z.object({
	email: z.string().email(),
});
