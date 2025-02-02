import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';

const inter = Inter({
	variable: '--font-primary',
});

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={cn(inter.variable, 'antialiased')}>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
					<div className='grid h-full min-h-screen'>{children}</div>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
