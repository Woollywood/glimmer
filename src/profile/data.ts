'use server';

import { prisma } from '@/lib/prisma';
import { getUser } from '@/session/data';

export const getProfileByUserId = async (userId: string) => await prisma.profile.findUnique({ where: { userId } });

export const getProfile = async () => {
	const user = await getUser();
	return await getProfileByUserId(user?.id || '');
};
