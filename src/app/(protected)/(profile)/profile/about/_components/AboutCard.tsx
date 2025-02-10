import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Profile } from '@prisma/client';
import { Field } from './ProfileField';
import { User } from 'lucide-react';
import moment from 'moment';
import { ProfileFields } from './ProfileFields';

type Props = Pick<Profile, 'overview' | 'born' | 'status'>;

export const AboutCard: React.FC<Props> = ({ overview, born, status }) => {
	const existingFields = [overview, born, status].filter(Boolean);

	if (existingFields.length === 0) {
		return null;
	}

	const profileFields: Field[] = [
		{ icon: <User />, label: overview },
		{ icon: <User />, label: born && moment(born).format('LL') },
		{ icon: <User />, label: status },
	];

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<h2>About</h2>
				</CardTitle>
				<CardDescription>
					<p>{overview}</p>
				</CardDescription>
			</CardHeader>
			{existingFields && (
				<CardContent>
					<ProfileFields fields={profileFields} direction='vertical' />
				</CardContent>
			)}
		</Card>
	);
};
