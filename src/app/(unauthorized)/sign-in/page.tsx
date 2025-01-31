import { NextPage } from 'next';
import { SignInForm } from './components/SignInForm';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

interface Props {
	searchParams: Promise<{ callbackUrl?: string }>;
}

const Page: NextPage<Props> = async ({ searchParams }) => {
	const { callbackUrl } = await searchParams;

	const session = await auth();
	if (session) {
		redirect(callbackUrl ?? '/');
	}

	return (
		<div className='flex h-full items-center justify-center'>
			<SignInForm callbackUrl={callbackUrl} />
		</div>
	);
};

export default Page;
