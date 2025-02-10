import React from 'react';

export interface Field {
	icon: React.ReactNode;
	label: string | undefined | null;
}

export const ProfileField: React.FC<Field> = ({ icon, label }) => {
	if (!label) {
		return null;
	}

	return (
		<div className='flex items-center gap-1'>
			{icon}
			<span>{label}</span>
		</div>
	);
};
