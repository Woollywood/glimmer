'use server';

import { prisma } from '@/lib/prisma';
import { UpdateDto } from './dto';
import { revalidatePath } from 'next/cache';

export const update = async (id: string, dto: UpdateDto) => {
	await prisma.profile.update({ where: { id }, data: dto });
	revalidatePath('/profile');
};
