'use client';

import React from 'react';
import { providerMap } from '@/auth.config';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSignUpForm } from '@/hooks/useSignUpForm';
import { signInWithOAuth } from '@/app/api/auth/sign-in/actions';
import { SignForm } from '../../components/SignForm';
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
			credentials={{
				fields: () => (
					<>
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
									<span>Sign up with {provider.name}</span>
								</Button>
							</form>
						))}
					</div>
				) : undefined
			}
			footer={() => (
				<div className='flex items-center justify-center'>
					<Button variant='link' asChild>
						<Link href='/sign-in'>Already have an account?</Link>
					</Button>
				</div>
			)}
		/>
	);
};
