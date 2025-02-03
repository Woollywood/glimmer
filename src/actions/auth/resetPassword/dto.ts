import { z } from 'zod';

export type ResetPasswordDto = z.infer<typeof resetPasswordDto>;
export const resetPasswordDto = z.object({
	password: z.string().min(3),
});
