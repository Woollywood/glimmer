'use server';

import { prisma } from '@/lib/prisma';

export const getProfileByUserId = async (userId: string) => await prisma.profile.findUnique({ where: { userId } });
