import React from 'react';

interface Props extends React.PropsWithChildren {
	icon: React.ReactNode;
}

export const ProfileField: React.FC<Props> = ({ icon, children }) => {
	return (
		<div className='flex items-center gap-1'>
			{icon}
			<span>{children}</span>
		</div>
	);
};
