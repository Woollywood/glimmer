import { z } from 'zod';

export type TwoFactorCodeDto = z.infer<typeof twoFactorCodeDto>;
export const twoFactorCodeDto = z.object({
	token: z.string(),
});
