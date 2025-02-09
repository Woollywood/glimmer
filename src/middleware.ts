import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth';
import { env } from './configs/env';

const authRoutes = ['/sign-in', '/sign-up', '/landing'];
const passwordRoutes = ['/reset-password', '/forgot-password'];

export async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const isAuthRoute = authRoutes.includes(pathname);
	const isPasswordRoute = passwordRoutes.includes(pathname);

	const session = getSessionCookie(request);

	if (!session) {
		if (isAuthRoute || isPasswordRoute) {
			return NextResponse.next();
		}

		const redirectUrl = new URL(env.DEFAULT_REDIRECT_URL, request.url);
		redirectUrl.searchParams.set('callbackURL', pathname);
		return NextResponse.redirect(redirectUrl);
	}

	if (isAuthRoute || isPasswordRoute) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
