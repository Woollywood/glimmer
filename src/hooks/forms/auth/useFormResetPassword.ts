import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export const resetPasswordSchema = z
	.object({
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

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type ResetPasswordFormReturn = UseFormReturn<ResetPasswordSchema>;

export const useFormResetPassword = () => {
	return useForm<ResetPasswordSchema>({
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
		resolver: zodResolver(resetPasswordSchema),
	});
};
