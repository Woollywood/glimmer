import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authErrorDescription, AuthErrors } from '@/constants/errors/AuthErrors';
import { NextPage } from 'next';
import Link from 'next/link';

interface Props {
	searchParams: Promise<{ error?: AuthErrors }>;
}

const Page: NextPage<Props> = async ({ searchParams }) => {
	const { error } = await searchParams;
	const errorDescription = error ? authErrorDescription[error] : 'Unknown error';

	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-center'>
					<h1>Error</h1>
				</CardTitle>
				<CardDescription className='text-center'>An error occurred during authentication</CardDescription>
			</CardHeader>
			<CardContent>{errorDescription}</CardContent>
			<div className='flex items-center justify-center pt-6'>
				<Link href='/sign-in' className='text-link'>
					Back to sign in
				</Link>
			</div>
		</Card>
	);
};

export default Page;
