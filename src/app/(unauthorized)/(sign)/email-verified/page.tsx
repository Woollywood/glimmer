import { NextPage } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Page: NextPage = () => {
	return (
		<div className='flex h-full items-center justify-center'>
			<Card>
				<CardHeader>
					<CardTitle className='text-center'>
						<h1>Email verified!</h1>
					</CardTitle>
					<CardDescription className='text-center'>
						Your email has been successfully verified.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='flex items-center justify-center'>
						<Button asChild>
							<Link href='/'>Go to home</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Page;
