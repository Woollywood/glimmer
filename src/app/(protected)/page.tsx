import { NextPage } from 'next';
import { permanentRedirect } from 'next/navigation';

const Page: NextPage = async () => {
	permanentRedirect('/home');
};

export default Page;
