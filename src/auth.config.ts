import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import type { NextAuthConfig } from 'next-auth';
import type { Provider } from 'next-auth/providers';

const providers: Provider[] = [GitHub, Google];

export const providerMap = providers
	.map((provider) => {
		if (typeof provider === 'function') {
			const providerData = provider();
			return { id: providerData.id, name: providerData.name };
		} else {
			return { id: provider.id, name: provider.name };
		}
	})
	.filter((provider) => provider.id !== 'credentials');

export default {
	providers,
	pages: {
		signIn: '/sign-in',
		error: '/error',
	},
} satisfies NextAuthConfig;
