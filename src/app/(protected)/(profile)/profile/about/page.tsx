import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getProfileByUserId } from '@/data/profile';
import { currentUser } from '@/data/session';
import { NextPage } from 'next';
import { PageForm } from './_components/form/Form';

const Page: NextPage = async () => {
	const user = await currentUser();
	const profile = await getProfileByUserId(user?.id || '');

	if (!profile) {
		throw new Error('Profile not found');
	}

	return (
		<div>
			<Card>
				<CardHeader>
					<h2>Profile Info</h2>
				</CardHeader>
				<CardContent>
					<PageForm {...profile} />
				</CardContent>
			</Card>
		</div>
	);
};

export default Page;
