'use client';

import React from 'react';
import { providerMap } from '@/auth.config';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSignInForm } from '@/hooks/useSignInForm';
import { SignInDto } from '@/app/api/auth/sign-in/dto';
import { signInWithOAuth } from '@/app/api/auth/sign-in/actions';
import { SignForm } from '../../_components/SignForm';
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
				callbackUrl={callbackUrl}
				credentials={{
					fields: () => (
						<>
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
						</>
					),
					form,
					onSubmit: submitHandler,
				}}
				providers={() =>
					hasOtherProviders ? (
						<div className='flex items-center gap-4'>
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
			/>
		</>
	);
};
