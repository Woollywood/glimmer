'use client';

import React, { Suspense, useTransition } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormSignUp, SignUpSchema } from '@/hooks/forms/auth/useFormSignUp';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authClient } from '@/lib/authClient';
import { useToast } from '@/hooks/useToast';

const ContentPage: React.FC = () => {
	const router = useRouter();
	const { toast } = useToast();

	const params = useSearchParams();
	const callbackURL = params.get('callbackURL');

	const form = useFormSignUp();
	const [isPending, startTransition] = useTransition();
	const submitHandler = async ({ email, password, name }: SignUpSchema) => {
		startTransition(async () => {
			await authClient.signUp.email(
				{
					email,
					password,
					name,
				},
				{
					onSuccess: () => {
						toast({
							title: 'Success',
							description: 'Your account has been created. Check your email for a verification link',
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

	const handleSignInWithGithub = async () => {
		startTransition(async () => {
			await authClient.signIn.social(
				{
					provider: 'github',
				},
				{
					onSuccess: () => {
						router.push('/');
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

	const handleSignInWithGoogle = async () => {
		startTransition(async () => {
			await authClient.signIn.social(
				{
					provider: 'google',
				},
				{
					onSuccess: () => {
						router.push('/');
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
		<Card className='w-[32rem] p-12'>
			<CardHeader>
				<CardTitle className='text-center'>
					<h1>Sign up</h1>
				</CardTitle>
				<CardDescription className='text-center'>
					<p>
						Already have an account?{' '}
						<Link
							href={
								callbackURL
									? { pathname: '/sign-in', query: { callbackURL } }
									: { pathname: '/sign-in' }
							}
							className='text-link'>
							Sign in here
						</Link>
					</p>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(submitHandler)} className='space-y-4'>
						<div className='space-y-4'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												autoComplete='username'
												placeholder='Enter your username'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
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
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												autoComplete='current-password'
												type='password'
												placeholder='Enter your password'
												{...field}
											/>
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
											<Input type='password' {...field} placeholder='Confirm password' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='flex items-center justify-center'>
							<Button disabled={isPending} className='w-full' size='lg'>
								Sign me up
							</Button>
						</div>
					</form>
				</Form>
				<div className='py-4'>
					<p className='text-center text-gray-400'>Or</p>
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
