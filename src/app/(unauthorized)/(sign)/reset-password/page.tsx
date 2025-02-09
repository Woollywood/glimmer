'use client';

import React, { useTransition } from 'react';
import { NextPage } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormResetPassword, ResetPasswordSchema } from '@/hooks/forms/auth/useFormResetPassword';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/useToast';
import { authClient } from '@/lib/authClient';
import Link from 'next/link';

const Page: NextPage = () => {
	const router = useRouter();
	const { toast } = useToast();

	const params = useSearchParams();
	const callbackURL = params.get('callbackURL');
	const error = params.get('error');
	const isInvalidToken = error === 'invalid_token';

	const [isPending, startTransition] = useTransition();
	const form = useFormResetPassword();
	const submitHandler = async ({ password }: ResetPasswordSchema) => {
		startTransition(async () => {
			await authClient.resetPassword(
				{ newPassword: password },
				{
					onSuccess: () => {
						router.push('/sign-in');
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
						<h1>Reset password</h1>
					</CardTitle>
					<CardDescription className='text-center'>Enter a new account password</CardDescription>
				</CardHeader>
				<CardContent>
					{isInvalidToken ? (
						<p>This password reset link is invalid or has expired</p>
					) : (
						<Form {...form}>
							<form onSubmit={form.handleSubmit(submitHandler)} className='space-y-4'>
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

								<div className='flex items-center justify-center'>
									<Button disabled={isPending} className='w-full' size='lg'>
										Reset password
									</Button>
								</div>
							</form>
						</Form>
					)}
					<p className='pt-6 text-center text-sm'>
						Back to{' '}
						<Link
							href={
								callbackURL
									? { pathname: '/sign-in', query: { callbackURL } }
									: { pathname: '/sign-in' }
							}
							className='text-link'>
							sign in
						</Link>
					</p>
				</CardContent>
			</Card>
		</div>
	);
};

export default Page;
