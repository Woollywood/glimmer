import { $Enums } from '@prisma/client';
import { z } from 'zod';

export const updateDto = z.object({
	born: z.date().nullable(),
	education: z.string().nullable(),
	livesIn: z.string().min(1).nullable(),
	overview: z.string().min(1).nullable(),
	rank: z.string().min(1).nullable(),
	status: z.custom<$Enums.Status>().nullable(),
	workplace: z.string().nullable(),
});
export type UpdateDto = z.infer<typeof updateDto>;
