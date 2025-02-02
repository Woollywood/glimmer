import { NextPage } from 'next';
import { SignUpForm } from './components/SignUpForm';

interface Props {
	searchParams: Promise<{ callbackUrl?: string }>;
}

const Page: NextPage<Props> = async ({ searchParams }) => {
	const { callbackUrl } = await searchParams;

	return (
		<div className='flex h-full items-center justify-center'>
			<SignUpForm callbackUrl={callbackUrl} />
		</div>
	);
};

export default Page;
