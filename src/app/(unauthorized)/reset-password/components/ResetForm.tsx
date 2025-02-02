'use client';

import { resetPassword } from '@/app/api/auth/resetPassword/actions';
import { ResetPasswordDto } from '@/app/api/auth/resetPassword/dto';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useResetPasswordForm } from '@/hooks/useResetPasswordForm';
import React, { useTransition } from 'react';

interface Props {
	token?: string;
}

export const ResetForm: React.FC<Props> = ({ token }) => {
	const { handleError } = useErrorHandler();
	const form = useResetPasswordForm();
	const [isPending, startTransition] = useTransition();
	const handleSubmit = ({ password }: ResetPasswordDto) => {
		startTransition(async () => {
			try {
				await resetPassword(password, token);
			} catch (error) {
				handleError(error);
			}
		});
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Reset Password</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className='min-w-[22.5rem] space-y-4'>
						<div>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>New password</FormLabel>
										<FormControl>
											<Input type='password' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='confirmPassword'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm password</FormLabel>
										<FormControl>
											<Input type='password' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='flex items-center justify-center pt-6'>
								<Button disabled={isPending}>Reset</Button>
							</div>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
