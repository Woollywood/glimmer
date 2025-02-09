import { NextPage } from 'next';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent, CardFooter } from '../ui/card';
import { getUser } from '@/session/data';

export const Sidebar: NextPage = async ({}) => {
	const user = await getUser();

	return (
		<aside className='sticky top-[calc(var(--header-height)+1.5rem)]'>
			<Card>
				<div className='h-14 bg-black'></div>
				<CardContent>
					<div className='-mt-10 mb-4 flex items-center justify-center'>
						<Avatar className='h-16 w-16 cursor-pointer'>
							<AvatarImage src={user?.image} />
							<AvatarFallback>A</AvatarFallback>
						</Avatar>
					</div>
					<h5 className='text-center'>
						<Link href='/'>{user?.name}</Link>
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
