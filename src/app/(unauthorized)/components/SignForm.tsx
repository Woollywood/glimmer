'use client';

import React, { useState, useTransition } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { Input } from '@/components/ui/input';
import { TwoFactorCodeDto } from '@/app/api/auth/twoFactor/dto';
import { twoFactorSignIn } from '@/app/api/auth/twoFactor/actions';
import { SignInDto } from '@/app/api/auth/sign-in/dto';

enum TwoFactorStage {
	FIRST = 1,
	SECOND = 2,
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
	const [stage, setStage] = useState<TwoFactorStage>(TwoFactorStage.FIRST);

	const form = useForm<TwoFactorCodeDto>({ defaultValues: { token: '' } });
	const twoFactor = async (token?: string) => {
		if (!credentials?.form.getValues()) {
			throw new Error('Invalid credentials');
		}
		await twoFactorSignIn(credentials?.form.getValues(), token);
	};

	const hasCredentials = !!credentials;
	const hasProviders = !!providers;
	const hasFooter = hasProviders && !!footer;

	const { handleError, error } = useErrorHandler();
	const [isPending, startTransition] = useTransition();
	const submitHandler = async (values: TFieldValues) => {
		startTransition(async () => {
			try {
				const response = await credentials?.onSubmit(values);
				if (response) {
					setStage(TwoFactorStage.SECOND);
				} else {
					twoFactor();
				}
			} catch (error) {
				handleError(error);
			}
		});
	};

	const secondStage = async ({ token }: TwoFactorCodeDto) => {
		startTransition(async () => {
			try {
				twoFactor(token);
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
				{hasCredentials ? (
					<>
						{stage === TwoFactorStage.FIRST && (
							<Form {...credentials.form}>
								<form
									onSubmit={credentials.form.handleSubmit(submitHandler)}
									className='min-w-[22.5rem] space-y-4'>
									{credentials.fields()}
									{!!error && <p>{error?.message}</p>}
									<div className='flex items-center justify-center'>
										<Button disabled={isPending}>
											{type === 'signin' ? 'Sign in' : 'Sign up'}
										</Button>
									</div>
								</form>
							</Form>
						)}
						{stage === TwoFactorStage.SECOND && (
							<div>
								<Form {...form}>
									<form onSubmit={form.handleSubmit(secondStage)}>
										<FormField
											control={form.control}
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
								{!!error && <p>{error?.message}</p>}
							</div>
						)}
					</>
				) : (
					!!error && <p>{error?.message}</p>
				)}
			</CardContent>
			{hasFooter && stage === TwoFactorStage.FIRST && (
				<CardFooter className='flex-col gap-4'>
					{providers?.()}
					{footer?.()}
				</CardFooter>
			)}
		</Card>
	);
};
