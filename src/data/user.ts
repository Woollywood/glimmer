'use server';

import { prisma } from '@/lib/prisma';

export const getUserByEmail = async (email: string) =>
	await prisma.user.findUnique({ where: { email }, include: { accounts: true } });

export const getUserById = async (id: string) => await prisma.user.findUnique({ where: { id } });
