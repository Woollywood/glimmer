import { z } from 'zod';

export type SignUpDto = z.infer<typeof signUpDto>;

export const signUpDto = z.object({
	name: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(6),
});
