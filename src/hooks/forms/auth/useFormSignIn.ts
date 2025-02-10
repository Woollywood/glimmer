import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export const signInSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignInFormReturn = UseFormReturn<SignInSchema>;

export const useFormSignIn = () => {
	return useForm<SignInSchema>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: zodResolver(signInSchema),
	});
};
