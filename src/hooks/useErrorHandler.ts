import { useState, useCallback, useEffect } from 'react';
import { useToast } from './use-toast';

export const useErrorHandler = () => {
	const { toast } = useToast();
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

	useEffect(() => {
		if (error) {
			toast({
				variant: 'destructive',
				title: 'Error',
				description: error.message,
			});
		}
	}, [error, toast]);

	return { handleError, error };
};
