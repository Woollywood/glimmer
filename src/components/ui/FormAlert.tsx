'use client';

import React from 'react';
import { Badge } from './badge';
import { AlertCircle } from 'lucide-react';

export const FormAlert: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<Badge variant='danger' className='grid grid-cols-[auto_1fr] gap-x-4'>
			<AlertCircle className='size-8' />
			<p>{children}</p>
		</Badge>
	);
};
