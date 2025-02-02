'use client';

import React from 'react';
import { providerMap } from '@/auth.config';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSignUpForm } from '@/hooks/useSignUpForm';
import { signInWithOAuth } from '@/app/api/auth/sign-in/actions';
import { SignForm } from '../../_components/SignForm';
import { SignUpDto } from '@/app/api/auth/sign-up/dto';
import { signUp } from './actions';

interface Props {
	callbackUrl?: string;
}
export const SignUpForm: React.FC<Props> = ({ callbackUrl }) => {
	const hasOtherProviders = Object.keys(providerMap).length > 0;
	const form = useSignUpForm();
	const submitHandler = async (values: SignUpDto) => await signUp(values);

	return (
		<SignForm
			title='Sign up'
			type='signup'
			callbackUrl={callbackUrl}
			credentials={{
				fields: () => (
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input autoComplete='username' placeholder='Enter your username' {...field} />
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
									<span>Sign up with {provider.name}</span>
								</Button>
							</form>
						))}
					</div>
				) : undefined
			}
		/>
	);
};
