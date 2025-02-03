'use client';

import { resetPassword } from '@/actions/auth/resetPassword/actions';
import { ResetPasswordDto } from '@/actions/auth/resetPassword/dto';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useResetPasswordForm } from '@/hooks/useResetPasswordForm';
import Link from 'next/link';
import React, { useTransition } from 'react';
import { useToast } from '@/hooks/useToast';

interface Props {
	token?: string;
}

export const ResetForm: React.FC<Props> = ({ token }) => {
	const { toast } = useToast();
	const { handleError } = useErrorHandler();
	const form = useResetPasswordForm();
	const [isPending, startTransition] = useTransition();
	const handleSubmit = ({ password }: ResetPasswordDto) => {
		startTransition(async () => {
			try {
				await resetPassword(password, token);
				toast({ title: 'Notifications', description: 'Password changed' });
			} catch (error) {
				handleError(error);
			}
		});
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-center'>
					<h1>Forgot password?</h1>
				</CardTitle>
				<CardDescription className='text-center'>
					Enter the email address associated with account.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className='min-w-[22.5rem] space-y-4'>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input type='password' placeholder='Enter new password' {...field} />
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
									<FormControl>
										<Input type='password' placeholder='Confirm password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<p className='pt-6 text-center text-sm'>
							Back to{' '}
							<Link href='/sign-in' className='text-link'>
								Sign in
							</Link>
						</p>
						<div className='flex items-center justify-center'>
							<Button disabled={isPending} size='lg' className='w-full'>
								Reset password
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
