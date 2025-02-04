import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Input } from '../ui/input';
import { UserButton } from './UserButton';
import { auth } from '@/auth';

export const Header: React.FC<React.HTMLAttributes<HTMLHeadElement>> = async ({ className, ...props }) => {
	const session = await auth();

	return (
		<header className={cn(className, 'h-header-height fixed top-0 w-full bg-dark')} {...props}>
			<div className='container flex h-full items-center justify-between gap-8'>
				<div className='flex items-center gap-4'>
					<Link href='/' className='py-3 text-2xl font-bold'>
						Logo
					</Link>
					<Input placeholder='Search' />
				</div>
				<div className='flex items-center gap-2'>
					<UserButton user={session?.user} />
				</div>
			</div>
		</header>
	);
};
