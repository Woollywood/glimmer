'use client';

import React, { useTransition } from 'react';
import { providerMap } from '@/auth.config';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSignUpForm } from '@/hooks/useSignUpForm';
import { signInWithOAuth } from '@/app/api/auth/sign-in/actions';
import { SignUpDto } from '@/app/api/auth/sign-up/dto';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { signUpWithCredentials } from '@/app/api/auth/sign-up/actions';
import { useErrorHandler } from '@/hooks/useErrorHandler';

interface Props {
	callbackUrl?: string;
}
export const SignUpForm: React.FC<Props> = ({ callbackUrl }) => {
	const { handleError } = useErrorHandler();
	const hasOtherProviders = Object.keys(providerMap).length > 0;
	const form = useSignUpForm();

	const [isPending, startTransition] = useTransition();
	const submitHandler = async (values: SignUpDto) => {
		startTransition(async () => {
			try {
				await signUpWithCredentials({ ...values, email: values.email.toLocaleLowerCase() }, callbackUrl);
			} catch (error) {
				handleError(error);
			}
		});
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-center'>
					<h1>Sign up</h1>
				</CardTitle>
				<CardDescription className='text-center'>
					<p>
						Already have an account?{' '}
						<Link
							href={
								callbackUrl
									? { pathname: '/sign-in', query: { callbackUrl } }
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
					<form onSubmit={form.handleSubmit(submitHandler)} className='min-w-[22.5rem] space-y-4'>
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
			</CardContent>
			{hasOtherProviders && (
				<>
					<div className='py-4'>
						<p className='text-center text-gray-400'>Or continue with</p>
					</div>
					<div className='flex items-center gap-4'>
						{Object.values(providerMap).map((provider) => (
							<form
								key={provider.id}
								className='flex w-full items-center gap-x-4'
								action={() => signInWithOAuth(provider, callbackUrl)}>
								<Button className='w-full'>
									<span>Sign up with {provider.name}</span>
								</Button>
							</form>
						))}
					</div>
				</>
			)}
		</Card>
	);
};
