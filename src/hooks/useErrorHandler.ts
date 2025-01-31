import { useState, useCallback } from 'react';

export const useErrorHandler = () => {
	const [error, setError] = useState<Error>();

	const handleError = useCallback((error: unknown) => {
		if (error instanceof Error) {
			if (error.message === 'NEXT_REDIRECT') {
				return;
			}

			setError(error);
		} else {
			setError(new Error('unknown error'));
		}
	}, []);

	return { handleError, error };
};
