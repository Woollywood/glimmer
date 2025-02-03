import authConfig from '@/auth.config';
import NextAuth from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { publicRoutes, authRoutes } from '@/configs/routes';
import { env } from './configs/env';

const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req: NextRequest) {
	const { nextUrl } = req;
	const isLoggedIn = 'auth' in req && !!req.auth;
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);
	const isApiRoute = nextUrl.pathname.includes('/api');

	if (isApiRoute) {
		return NextResponse.next();
	}

	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(env.AUTH_DEFAULT_REDIRECT_URL, nextUrl));
		}
		return NextResponse.next();
	}

	if (!isLoggedIn && !isPublicRoute) {
		let callbackUrl = nextUrl.pathname;
		if (nextUrl.search) {
			callbackUrl += nextUrl.search;
		}
		const encodedCallbackUrl = encodeURI(callbackUrl);
		return Response.redirect(new URL(`${env.AUTH_DEFAULT_URL}?callbackUrl=${encodedCallbackUrl}`, nextUrl));
	}

	return NextResponse.next();
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)',
	],
};
