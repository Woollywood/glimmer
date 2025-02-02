import { Button } from '@/components/ui/button';
import { NextPage } from 'next';
import Link from 'next/link';

interface Props {
	searchParams: Promise<{ callbackUrl?: string }>;
}

const Landing: NextPage<Props> = async ({ searchParams }) => {
	const { callbackUrl } = await searchParams;

	return (
		<div className='flex items-center justify-center'>
			<Button asChild>
				<Link href={{ pathname: '/sign-in', query: { callbackUrl } }}>Sign in</Link>
			</Button>
		</div>
	);
};

export default Landing;
