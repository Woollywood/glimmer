import { NextPage } from 'next';
import { SignInForm } from './components/SignInForm';

interface Props {
	searchParams: Promise<{ callbackUrl?: string }>;
}

const Page: NextPage<Props> = async ({ searchParams }) => {
	const { callbackUrl } = await searchParams;

	return (
		<div className='flex h-full items-center justify-center'>
			<SignInForm callbackUrl={callbackUrl} />
		</div>
	);
};

export default Page;
