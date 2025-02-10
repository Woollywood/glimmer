'use client';

import React, { Suspense, useTransition } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SignInSchema, useFormSignIn } from '@/hooks/forms/auth/useFormSignIn';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/useToast';
import { authClient } from '@/lib/authClient';

const ContentPage: React.FC = () => {
	const { toast } = useToast();

	const params = useSearchParams();
	const callbackURL = params.get('callbackURL') || '/';

	const [isPending, startTransition] = useTransition();
	const form = useFormSignIn();
	const submitHandler = async ({ email, password }: SignInSchema) => {
		startTransition(async () => {
			await authClient.signIn.email(
				{ email, password, callbackURL },
				{
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

	const handleSignInWithGithub = async () => {
		startTransition(async () => {
			await authClient.signIn.social(
				{
					provider: 'github',
					callbackURL,
				},
				{
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

	const handleSignInWithGoogle = async () => {
		startTransition(async () => {
			await authClient.signIn.social(
				{
					provider: 'google',
					callbackURL,
				},
				{
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
		<Card className='w-[32rem] p-12'>
			<CardHeader>
				<CardTitle className='text-center'>
					<h1>Sign in</h1>
				</CardTitle>
				<CardDescription className='text-center'>
					<p>
						Don&apos;t have an account?{' '}
						<Link
							href={
								callbackURL
									? { pathname: '/sign-up', query: { callbackURL } }
									: { pathname: '/sign-up' }
							}
							className='text-link'>
							Click here to sign up
						</Link>
					</p>
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
										<Input autoComplete='email' placeholder='Enter email' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											autoComplete='current-password'
											type='password'
											placeholder='Enter password'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div>
							<Link
								href={
									callbackURL
										? { pathname: '/forgot-password', query: { callbackURL } }
										: { pathname: '/forgot-password' }
								}
								type='button'
								className='font-bold text-link transition-colors hover:text-link-hover'>
								Forgot password?
							</Link>
						</div>
						<div className='flex items-center justify-center'>
							<Button disabled={isPending} className='w-full' size='lg'>
								Sign in
							</Button>
						</div>
					</form>
				</Form>
				<div className='py-4'>
					<p className='text-center text-gray-400'>Or continue with</p>
				</div>
				<div className='flex items-center gap-x-4'>
					<Button disabled={isPending} className='w-full' onClick={handleSignInWithGithub}>
						<span>Github</span>
					</Button>
					<Button disabled={isPending} className='w-full' onClick={handleSignInWithGoogle}>
						<span>Google</span>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

const Page: NextPage = () => {
	return (
		<div className='flex h-full items-center justify-center'>
			<Suspense>
				<ContentPage />
			</Suspense>
		</div>
	);
};

export default Page;
