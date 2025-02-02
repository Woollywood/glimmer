'use client';

import React, { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { Input } from '@/components/ui/input';
import { twoFactorCodeDto, TwoFactorCodeDto } from '@/app/api/auth/twoFactor/dto';
import { twoFactorSignIn } from '@/app/api/auth/twoFactor/actions';
import { SignInDto } from '@/app/api/auth/sign-in/dto';
import { forgotPasswordDto, ForgotPasswordDto } from '@/app/api/auth/forgot-password/dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPassword } from '@/app/api/auth/forgot-password/actions';
import Link from 'next/link';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

enum Stage {
	_2FA1 = 1,
	_2FA2 = 2,
	FORGOT_PASS = 3,
}

interface Props<TFieldValues extends SignInDto> {
	credentials?: {
		fields: () => React.ReactNode;
		form: UseFormReturn<TFieldValues>;
		onSubmit: (values: TFieldValues) => Promise<boolean>;
	};
	providers?: () => React.ReactNode;
	title: string;
	type?: 'signin' | 'signup';
	callbackUrl?: string;
}

export const SignForm = <TFieldValues extends SignInDto>({
	credentials,
	providers,
	title,
	type = 'signin',
	callbackUrl,
}: Props<TFieldValues>) => {
	const [stage, setStage] = useState<Stage>(Stage._2FA1);
	const { handleError } = useErrorHandler();

	const twoFactorForm = useForm<TwoFactorCodeDto>({
		defaultValues: { token: '' },
		resolver: zodResolver(twoFactorCodeDto),
	});

	const hasCredentials = !!credentials;
	const hasProviders = !!providers;

	const [isPending, startTransition] = useTransition();
	const submitHandler = async (values: TFieldValues) => {
		startTransition(async () => {
			try {
				const response = await credentials?.onSubmit(values);
				if (response) {
					setStage(Stage._2FA2);
				} else {
					if (!credentials?.form.getValues()) {
						throw new Error('Invalid credentials');
					}
					await twoFactorSignIn({ dto: credentials?.form.getValues(), callbackUrl });
				}
			} catch (error) {
				handleError(error);
			}
		});
	};

	const secondStageSubmit = async ({ token }: TwoFactorCodeDto) => {
		startTransition(async () => {
			try {
				if (!credentials?.form.getValues()) {
					throw new Error('Invalid credentials');
				}
				await twoFactorSignIn({ dto: credentials?.form.getValues(), token, callbackUrl });
			} catch (error) {
				handleError(error);
			}
		});
	};

	const forgotPasswordForm = useForm<ForgotPasswordDto>({
		defaultValues: { email: '' },
		resolver: zodResolver(forgotPasswordDto),
	});
	const handleForgotPassword = async ({ email }: ForgotPasswordDto) => {
		startTransition(async () => {
			try {
				await forgotPassword(email);
			} catch (error) {
				handleError(error);
			}
		});
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-center'>
					<h1>{title}</h1>
				</CardTitle>
				<CardDescription className='text-center'>
					{type === 'signin' ? (
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
					) : (
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
					)}
				</CardDescription>
			</CardHeader>
			<CardContent>
				{hasCredentials && (
					<>
						{stage === Stage._2FA1 && (
							<Form {...credentials.form}>
								<form
									onSubmit={credentials.form.handleSubmit(submitHandler)}
									className='min-w-[22.5rem] space-y-4'>
									{credentials.fields()}
									{type === 'signin' && (
										<button
											type='button'
											className='text-link hover:text-link-hover font-bold transition-colors'
											onClick={() => setStage(Stage.FORGOT_PASS)}>
											Forgot password?
										</button>
									)}
									<div className='flex items-center justify-center'>
										<Button disabled={isPending} className='w-full' size='lg'>
											{type === 'signin' ? 'Sign in' : 'Sign me up'}
										</Button>
									</div>
								</form>
							</Form>
						)}
						{stage === Stage._2FA2 && (
							<Form {...twoFactorForm}>
								<form onSubmit={twoFactorForm.handleSubmit(secondStageSubmit)} className='space-y-4'>
									<FormField
										control={twoFactorForm.control}
										name='token'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<div className='flex items-center justify-center'>
														<InputOTP maxLength={6} {...field}>
															<InputOTPGroup>
																<InputOTPSlot index={0} />
																<InputOTPSlot index={1} />
																<InputOTPSlot index={2} />
																<InputOTPSlot index={3} />
																<InputOTPSlot index={4} />
																<InputOTPSlot index={5} />
															</InputOTPGroup>
														</InputOTP>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Button disabled={isPending} className='w-full'>
										Confirm
									</Button>
								</form>
							</Form>
						)}
						{stage === Stage.FORGOT_PASS && (
							<Form {...forgotPasswordForm}>
								<form
									onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)}
									className='space-y-4'>
									<FormField
										control={forgotPasswordForm.control}
										name='email'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														autoComplete='email'
														placeholder='Enter your email'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Button disabled={isPending} className='w-full'>
										Send reset link
									</Button>
								</form>
							</Form>
						)}
					</>
				)}
			</CardContent>
			{hasProviders && stage === Stage._2FA1 && (
				<CardFooter className='flex-col gap-4'>
					<p>Or continue with</p>
					{providers?.()}
				</CardFooter>
			)}
		</Card>
	);
};
