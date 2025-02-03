'use client';

import React, { useState, useTransition } from 'react';
import { providerMap } from '@/auth.config';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSignInForm } from '@/hooks/useSignInForm';
import { SignInDto } from '@/actions/auth/sign-in/dto';
import { signInWithCredentials, signInWithOAuth } from '@/actions/auth/sign-in/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { ForgotPasswordSchema, useForgotPasswordForm } from '@/hooks/useForgotPasswordForm';
import { forgotPassword } from '@/actions/auth/forgot-password/actions';
import { useToast } from '@/hooks/useToast';
import { useAuthErrorHandler } from '../../hooks/useAuthErrorHandler';
import { FormAlert } from '@/components/ui/FormAlert';

enum Stage {
	SIGN_IN = 1,
	FORGOT_PASS = 2,
}

interface Props {
	callbackUrl?: string;
}
export const SignInForm: React.FC<Props> = ({ callbackUrl }) => {
	const { handleError } = useErrorHandler();
	const { error } = useAuthErrorHandler();

	const { toast } = useToast();
	const [stage, setStage] = useState<Stage>(Stage.SIGN_IN);
	const [isPending, startTransition] = useTransition();

	const form = useSignInForm();
	const submitHandler = async (values: SignInDto) => {
		startTransition(async () => {
			try {
				await signInWithCredentials({ ...values, email: values.email.toLocaleLowerCase() }, callbackUrl);
			} catch (error) {
				handleError(error);
			}
		});
	};

	const forgotPasswordForm = useForgotPasswordForm();
	const handleForgotPassword = async ({ email }: ForgotPasswordSchema) => {
		startTransition(async () => {
			try {
				await forgotPassword(email.toLocaleLowerCase());
				toast({ title: 'Notifications', description: 'Password reset link sent to your email' });
			} catch (error) {
				handleError(error);
			}
		});
	};

	const handleOAuth = async (provider: (typeof providerMap)[number], callbackUrl?: string) => {
		try {
			await signInWithOAuth(provider, callbackUrl);
		} catch (error) {
			handleError(error);
		}
	};

	const hasOtherProviders = Object.keys(providerMap).length > 0;

	return (
		<Card className='w-[32rem]'>
			<CardHeader>
				<CardTitle className='text-center'>
					<h1>Sign in</h1>
				</CardTitle>
				<CardDescription className='text-center'>
					<p>
						Don&apos;t have an account?{' '}
						<Link
							href={
								callbackUrl
									? { pathname: '/sign-up', query: { callbackUrl } }
									: { pathname: '/sign-up' }
							}
							className='text-link'>
							Click here to sign up
						</Link>
					</p>
				</CardDescription>
			</CardHeader>
			<CardContent>
				{stage === Stage.SIGN_IN && (
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
							{error && (
								<div className='py-4'>
									<FormAlert>{error}</FormAlert>
								</div>
							)}
							<button
								type='button'
								className='font-bold text-link transition-colors hover:text-link-hover'
								onClick={() => setStage(Stage.FORGOT_PASS)}>
								Forgot password?
							</button>
							<div className='flex items-center justify-center'>
								<Button disabled={isPending} className='w-full' size='lg'>
									Sign in
								</Button>
							</div>
						</form>
					</Form>
				)}
				{stage === Stage.FORGOT_PASS && (
					<Form {...forgotPasswordForm}>
						<form onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)} className='space-y-4'>
							<FormField
								control={forgotPasswordForm.control}
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
							<button
								type='button'
								className='font-bold text-link transition-colors hover:text-link-hover'
								onClick={() => setStage(Stage.SIGN_IN)}>
								Back to form
							</button>
							<Button disabled={isPending} className='w-full'>
								Send reset link
							</Button>
						</form>
					</Form>
				)}
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
								action={() => handleOAuth(provider, callbackUrl)}>
								<Button className='w-full'>
									<span>Sign in with {provider.name}</span>
								</Button>
							</form>
						))}
					</div>
				</>
			)}
		</Card>
	);
};
