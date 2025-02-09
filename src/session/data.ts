'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const getSession = async () =>
	await auth.api.getSession({
		headers: await headers(),
	});

export const getUser = async () => {
	const session = await getSession();
	return session?.user;
};
