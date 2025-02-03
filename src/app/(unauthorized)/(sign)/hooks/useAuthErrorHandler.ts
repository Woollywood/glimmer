import { useEffect, useState } from 'react';
import { authErrorDescription, AuthErrors } from '@/constants/errors/AuthErrors';
import { useSearchParams } from 'next/navigation';

export const useAuthErrorHandler = () => {
	const [error, setError] = useState<string | null>(null);
	const params = useSearchParams();

	useEffect(() => {
		const errorFromParams = params.get('error') as AuthErrors;
		if (errorFromParams) {
			const currentError = authErrorDescription[errorFromParams];
			if (!currentError) {
				setError(authErrorDescription.AuthError);
			} else {
				setError(currentError);
			}
		}
	}, [params]);

	return { error };
};
