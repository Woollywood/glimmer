'use client';

import React, { useState, useTransition } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
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
	footer?: () => React.ReactNode;
	title: string;
	type?: 'signin' | 'signup';
}

export const SignForm = <TFieldValues extends SignInDto>({
	credentials,
	providers,
	footer,
	title,
	type = 'signin',
}: Props<TFieldValues>) => {
	const [stage, setStage] = useState<Stage>(Stage._2FA1);
	const { handleError } = useErrorHandler();

	const twoFactorForm = useForm<TwoFactorCodeDto>({
		defaultValues: { token: '' },
		resolver: zodResolver(twoFactorCodeDto),
	});

	const hasCredentials = !!credentials;
	const hasProviders = !!providers;
	const hasFooter = hasProviders && !!footer;
	const secondStageHandler = async (token?: string) => {
		try {
			if (!credentials?.form.getValues()) {
				throw new Error('Invalid credentials');
			}
			await twoFactorSignIn(credentials?.form.getValues(), token);
		} catch (error) {
			handleError(error);
		}
	};

	const [isPending, startTransition] = useTransition();
	const submitHandler = async (values: TFieldValues) => {
		startTransition(async () => {
			try {
				const response = await credentials?.onSubmit(values);
				if (response) {
					setStage(Stage._2FA2);
				} else {
					await secondStageHandler();
				}
			} catch (error) {
				handleError(error);
			}
		});
	};

	const secondStageSubmit = async ({ token }: TwoFactorCodeDto) => {
		startTransition(async () => {
			await secondStageHandler(token);
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
				<CardTitle className='text-center'>{title}</CardTitle>
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
										<Button
											type='button'
											variant='link'
											onClick={() => setStage(Stage.FORGOT_PASS)}>
											Forgot password?
										</Button>
									)}
									<div className='flex items-center justify-center'>
										<Button disabled={isPending}>
											{type === 'signin' ? 'Sign in' : 'Sign up'}
										</Button>
									</div>
								</form>
							</Form>
						)}
						{stage === Stage._2FA2 && (
							<Form {...twoFactorForm}>
								<form onSubmit={twoFactorForm.handleSubmit(secondStageSubmit)}>
									<FormField
										control={twoFactorForm.control}
										name='token'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Code</FormLabel>
												<FormControl>
													<Input placeholder='code' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<div className='flex items-center justify-center'>
										<Button disabled={isPending}>Confirm</Button>
									</div>
								</form>
							</Form>
						)}
						{stage === Stage.FORGOT_PASS && (
							<Form {...forgotPasswordForm}>
								<form onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)}>
									<FormField
										control={forgotPasswordForm.control}
										name='email'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input autoComplete='email' placeholder='john@mail.ru' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<div className='flex items-center justify-center'>
										<Button disabled={isPending}>Send reset link</Button>
									</div>
								</form>
							</Form>
						)}
					</>
				)}
			</CardContent>
			{hasFooter && stage === Stage._2FA1 && (
				<CardFooter className='flex-col gap-4'>
					{providers?.()}
					{footer?.()}
				</CardFooter>
			)}
		</Card>
	);
};
