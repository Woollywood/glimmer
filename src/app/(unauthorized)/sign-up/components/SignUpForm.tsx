'use client';

import React, { useTransition } from 'react';
import { providerMap } from '@/auth.config';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSignUpForm } from '@/hooks/useSignUpForm';
import { SignUpDto } from '@/app/api/auth/sign-up/dto';
import { signUpWithCredentials } from '@/app/api/auth/sign-up/actions';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { signInWithOAuth } from '@/app/api/auth/sign-in/actions';

interface Props {
	callbackUrl?: string;
}
export const SignUpForm: React.FC<Props> = ({ callbackUrl }) => {
	const hasOtherProviders = Object.keys(providerMap).length > 0;

	const form = useSignUpForm();
	const { handleError, error } = useErrorHandler();

	const [isPending, startTransition] = useTransition();
	const onSubmit = async (values: SignUpDto) => {
		startTransition(async () => {
			try {
				await signUpWithCredentials(values);
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
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input autoComplete='username' placeholder='woollywood' {...field} />
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
						<FormField
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm password</FormLabel>
									<FormControl>
										<Input type='password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{form.formState.errors.root?.message && <p>{form.formState.errors.root.message}</p>}
						{!!error && <p>{error?.message}</p>}
						<div className='flex items-center justify-center'>
							<Button disabled={isPending}>Create an account</Button>
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
									<span>Sign up with {provider.name}</span>
								</Button>
							</form>
						))}
					</div>
				)}
				<div className='flex items-center justify-center'>
					<Button variant='link' asChild>
						<Link href='/sign-in'>Already have an account?</Link>
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
};
