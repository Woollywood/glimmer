import { NextPage } from 'next';
import { ResetForm } from './components/ResetForm';

interface Props {
	searchParams: Promise<{ token?: string }>;
}

const Page: NextPage<Props> = async ({ searchParams }) => {
	const { token } = await searchParams;

	return (
		<div className='flex h-full items-center justify-center'>
			<ResetForm token={token} />
		</div>
	);
};

export default Page;
