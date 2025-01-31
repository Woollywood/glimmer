import Link from 'next/link';
import { NextPage } from 'next';
import { Button } from '@/components/ui/button';

const Page: NextPage = async () => {
	return (
		<main className='flex h-full flex-col items-center justify-center'>
			<div className='space-y-6 text-center'>
				<h1 className='text-6xl font-semibold text-black drop-shadow-md'>Auth</h1>
				<p className='text-lg text-black'>A simple authentication service</p>
				<div>
					<Link href='/sign-in'>
						<Button size='lg'>Sign in</Button>
					</Link>
				</div>
			</div>
		</main>
	);
};

export default Page;
