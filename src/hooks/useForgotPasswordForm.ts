import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export const forgotPasswordSchema = z.object({
	email: z.string().email(),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ForgotPasswordFormReturn = UseFormReturn<ForgotPasswordSchema>;

export const useForgotPasswordForm = () => {
	return useForm<ForgotPasswordSchema>({
		defaultValues: { email: '' },
		resolver: zodResolver(forgotPasswordSchema),
	});
};
