import React from 'react';
import { Field, ProfileField } from './ProfileField';
import { cn } from '@/lib/utils';

interface Props {
	fields: Field[];
	direction?: 'horizontal' | 'vertical';
}

export const ProfileFields: React.FC<Props> = ({ fields, direction = 'horizontal' }) => {
	const existingFields = fields.filter(({ label }) => Boolean(label));

	if (existingFields.length === 0) {
		return null;
	}

	return (
		<ul className={cn('flex items-center gap-2', { 'flex-col items-start': direction === 'vertical' })}>
			{existingFields.map(({ icon, label }, index) => (
				<li key={index}>
					<ProfileField icon={icon} label={label} />
				</li>
			))}
		</ul>
	);
};
