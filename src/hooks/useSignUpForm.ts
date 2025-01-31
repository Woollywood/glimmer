import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export const signUpSchema = z
	.object({
		name: z.string().min(3),
		email: z.string().email(),
		password: z.string().min(6),
		confirmPassword: z.string(),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				code: 'custom',
				message: 'Passwords do not match',
				path: ['confirmPassword'],
			});
		}
	});

type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignUpFormReturn = UseFormReturn<SignUpSchema>;

export const useSignUpForm = () => {
	return useForm<SignUpSchema>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: zodResolver(signUpSchema),
	});
};
