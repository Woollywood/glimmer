'use client';

import React from 'react';
import { providerMap } from '@/auth.config';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSignInForm } from '@/hooks/useSignInForm';
import { SignInDto } from '@/app/api/auth/sign-in/dto';
import { signInWithOAuth } from '@/app/api/auth/sign-in/actions';
import { SignForm } from '../../components/SignForm';
import { signIn } from './actions';

interface Props {
	callbackUrl?: string;
}
export const SignInForm: React.FC<Props> = ({ callbackUrl }) => {
	const hasOtherProviders = Object.keys(providerMap).length > 0;
	const form = useSignInForm();
	const submitHandler = async (values: SignInDto) => await signIn(values);

	return (
		<>
			<SignForm
				title='Sign in'
				credentials={{
					fields: () => (
						<>
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
						</>
					),
					form,
					onSubmit: submitHandler,
				}}
				providers={() =>
					hasOtherProviders ? (
						<div>
							{Object.values(providerMap).map((provider) => (
								<form
									key={provider.id}
									className='flex w-full items-center gap-x-4'
									action={() => signInWithOAuth(provider, callbackUrl)}>
									<Button className='w-full'>
										<span>Sign in with {provider.name}</span>
									</Button>
								</form>
							))}
						</div>
					) : undefined
				}
				footer={() => (
					<div className='flex items-center justify-center'>
						<Button variant='link' asChild>
							<Link href='/sign-up'>Don&apos;t have an account?</Link>
						</Button>
					</div>
				)}
			/>
		</>
	);
};
