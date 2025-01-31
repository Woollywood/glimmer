'use client';

import React, { useTransition } from 'react';
import { providerMap } from '@/auth.config';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSignInForm } from '@/hooks/useSignInForm';
import { SignInDto } from '@/app/api/auth/sign-in/dto';
import { signInWithCredentials, signInWithOAuth } from '@/app/api/auth/sign-in/actions';
import { useErrorHandler } from '@/hooks/useErrorHandler';

interface Props {
	callbackUrl?: string;
}
export const SignInForm: React.FC<Props> = ({ callbackUrl }) => {
	const hasOtherProviders = Object.keys(providerMap).length > 0;

	const form = useSignInForm();
	const { handleError, error } = useErrorHandler();

	const [isPending, startTransition] = useTransition();
	const onSubmit = async (values: SignInDto) => {
		startTransition(async () => {
			try {
				await signInWithCredentials(values);
			} catch (error) {
				handleError(error);
			}
		});
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-center'>Sign in</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='min-w-[22.5rem] space-y-4'>
						<FormField
							control={form.control}
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
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input autoComplete='current-password' type='password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{!!error && <p>{error?.message}</p>}
						<div className='flex items-center justify-center'>
							<Button disabled={isPending}>Sign in</Button>
						</div>
					</form>
				</Form>
			</CardContent>
			<CardFooter className='flex-col gap-4'>
				{hasOtherProviders && (
					<div>
						{Object.values(providerMap).map((provider) => (
							<form
								key={provider.id}
								className='flex w-full items-center gap-x-4'
								action={() => signInWithOAuth(provider, callbackUrl)}>
								<Button className='w-full' disabled={isPending}>
									<span>Sign in with {provider.name}</span>
								</Button>
							</form>
						))}
					</div>
				)}
				<div className='flex items-center justify-center'>
					<Button variant='link' asChild>
						<Link href='/sign-up'>Don&apos;t have an account?</Link>
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
};
