import { NextPage } from 'next';
import { VerificationForm } from './components/VerificationForm';

interface Props {
	searchParams: Promise<{ token: string }>;
}

const Page: NextPage<Props> = async ({ searchParams }) => {
	const { token } = await searchParams;

	return <VerificationForm token={token} />;
};

export default Page;
