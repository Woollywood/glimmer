import { NextPage } from 'next';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { auth } from '@/auth';
import { Card, CardContent, CardFooter } from '../ui/card';
import Link from 'next/link';

export const Sidebar: NextPage = async ({}) => {
	const session = await auth();

	return (
		<aside className='sticky top-[calc(var(--header-height)+1.5rem)]'>
			<Card>
				<div className='h-14 bg-black'></div>
				<CardContent>
					<div className='-mt-10 mb-4 flex items-center justify-center'>
						<Avatar className='h-16 w-16 cursor-pointer' rounded={false}>
							<AvatarImage src={session?.user.image} />
							<AvatarFallback>A</AvatarFallback>
						</Avatar>
					</div>
					<h5 className='text-center'>
						<Link href='/'>{session?.user.name}</Link>
					</h5>
					<hr />

					<hr className='!mb-0' />
				</CardContent>
				<CardFooter className='!py-2 text-center'>
					<Link href='/profile'>View Profile</Link>
				</CardFooter>
			</Card>
		</aside>
	);
};
