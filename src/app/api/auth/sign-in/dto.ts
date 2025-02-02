import { z } from 'zod';

export type SignInDto = z.infer<typeof signInDto>;
export const signInDto = z.object({
	email: z.string().email(),
	password: z.string(),
});
