'use client';

import React, { useTransition } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/useToast';
import { authClient } from '@/lib/authClient';
import { useFormForgotPassword, ForgotPasswordSchema } from '@/hooks/forms/auth/useFormForgotPassword';

const Page: NextPage = () => {
	const { toast } = useToast();

	const params = useSearchParams();
	const callbackURL = params.get('callbackURL');

	const [isPending, startTransition] = useTransition();
	const form = useFormForgotPassword();
	const submitHandler = async ({ email }: ForgotPasswordSchema) => {
		startTransition(async () => {
			await authClient.forgetPassword(
				{ email, redirectTo: '/reset-password' },
				{
					onSuccess: () => {
						toast({
							variant: 'destructive',
							title: 'Success',
							description: 'Email sent',
						});
					},
					onError: ({ error }) => {
						toast({
							variant: 'destructive',
							title: 'Something went wrong',
							description: error.message,
						});
					},
				},
			);
		});
	};

	return (
		<div className='flex h-full items-center justify-center'>
			<Card className='w-[32rem] p-12'>
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
						<form onSubmit={form.handleSubmit(submitHandler)} className='space-y-4'>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input autoComplete='email' placeholder='Enter your email' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='flex items-center justify-center'>
								<Button disabled={isPending} size='lg' className='w-full'>
									Send link to email
								</Button>
							</div>
						</form>
						<p className='pt-6 text-center text-sm'>
							Back to{' '}
							<Link
								href={
									callbackURL
										? { pathname: '/sign-in', query: { callbackURL } }
										: { pathname: '/sign-in' }
								}
								className='text-link'>
								Sign in
							</Link>
						</p>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default Page;
