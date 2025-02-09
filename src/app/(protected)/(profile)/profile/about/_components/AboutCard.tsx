import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Profile } from '@prisma/client';
import { ProfileField } from './ProfileField';
import { User } from 'lucide-react';
import moment from 'moment';

type Props = Omit<Profile, 'id' | 'userId' | 'education' | 'livesIn' | 'rank' | 'workplace'>;

export const AboutCard: React.FC<Props> = ({ overview, born, status }) => {
	const profileInfo = [born, status].filter(Boolean);
	const hasProfileInfo = profileInfo.length > 0;

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
			{hasProfileInfo && (
				<CardContent>
					<ul>
						{profileInfo.map((info, index) => (
							<li key={index}>
								<ProfileField icon={<User />}>
									{typeof info === 'object' ? moment(info).format('LL') : info}
								</ProfileField>
							</li>
						))}
					</ul>
				</CardContent>
			)}
		</Card>
	);
};
