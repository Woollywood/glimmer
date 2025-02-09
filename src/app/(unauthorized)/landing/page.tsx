import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';

interface Props {
	searchParams: Promise<{ callbackURL?: string }>;
}

const Landing: NextPage<Props> = async ({ searchParams }) => {
	const { callbackURL } = await searchParams;

	return (
		<>
			<section className='container'>
				<h1 className='mx-auto mb-2 max-w-xl text-center text-5xl font-bold'>Download The Best Social App</h1>
				<p className='mx-auto mb-4 max-w-xl text-center text-lg'>
					See resolved goodness felicity shy civility domestic had but perceive laughing six did far.{' '}
				</p>
				<div className='flex items-center justify-center gap-4'>
					<Button asChild>
						<Link href={{ pathname: '/sign-up', query: { callbackURL } }}>Sign up free</Link>
					</Button>
					<div className='flex flex-col justify-center'>
						<div className='flex items-center gap-0.5'>
							{Array.from({ length: 5 }).map((_, index) => (
								<Star key={index} className='size-4 fill-warning stroke-warning' />
							))}
						</div>
						<i>&quot;I can&apos;t believe it&apos;s free!&quot;</i>
					</div>
				</div>
			</section>
		</>
	);
};

export default Landing;
