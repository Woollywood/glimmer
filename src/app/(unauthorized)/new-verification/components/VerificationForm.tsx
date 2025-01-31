'use client';

import { verifyToken } from '@/app/api/auth/service';
import { Button } from '@/components/ui/button';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Props {
	token?: string;
}

export const VerificationForm: React.FC<Props> = ({ token }) => {
	const router = useRouter();
	const [isLoading, setLoading] = useState(true);

	const { handleError, error } = useErrorHandler();
	const hasError = !!error;

	useEffect(() => {
		const init = async () => {
			try {
				await verifyToken(token!);
			} catch (error) {
				handleError(error);
			} finally {
				setLoading(false);
			}
		};

		init();
	}, [handleError, router, token]);

	return (
		<div className='flex h-full items-center justify-center'>
			<div className='space-y-6'>
				<h1 className='text-center text-6xl font-bold'>Verification Form</h1>
				{!hasError ? (
					<div className='text-center text-lg font-medium'>
						{isLoading ? 'Verificating...' : 'Verificated'}
					</div>
				) : (
					<div className='text-center text-lg font-medium'>{error.message}</div>
				)}
				<div className='flex items-center justify-center'>
					<Button asChild variant='link'>
						<Link href='/landing'>Back to default</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};
