import { NextPage } from 'next';
import { auth } from '@/auth';

const Page: NextPage = async () => {
	const session = await auth();

	return <div>{JSON.stringify(session)}</div>;
};

export default Page;
