'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { User } from 'better-auth';
import { useTheme } from 'next-themes';
import { HelpCircle, HelpCircleIcon, LogOut, Moon, Settings, Sun, SunMedium } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { authClient } from '@/lib/authClient';

interface Props {
	user: User | undefined;
}

export const UserButton: React.FC<Props> = ({ user }) => {
	const { setTheme, theme } = useTheme();
	const router = useRouter();
	const pathname = usePathname();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='cursor-pointer'>
					<AvatarImage src={user?.image} />
					<AvatarFallback>A</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<div className='mb-2 flex items-center gap-2'>
					<Avatar className='cursor-pointer'>
						<AvatarImage src={user?.image} />
						<AvatarFallback>A</AvatarFallback>
					</Avatar>
					<div>
						<Link href='/home' className='h1'>
							{user?.name?.split(' ')[0]}
						</Link>
					</div>
				</div>
				<div className='my-4'>
					<Button className='w-full' asChild>
						<Link href='/profile'>View profile</Link>
					</Button>
				</div>

				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Settings />
						<span>Settings & Privacy</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<HelpCircle />
						<span>Support</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<HelpCircleIcon />
						<span>Documentation</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() =>
						authClient.signOut({
							fetchOptions: {
								onSuccess: () => {
									const redirectURL = new URL(pathname, window.location.origin);
									redirectURL.searchParams.set('callbackURL', pathname);
									router.push(redirectURL.href);
								},
							},
						})
					}>
					<LogOut />
					<span>Sign out</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<div className='flex items-center gap-4 p-2'>
					<span>Mode:</span>
					<div className='flex w-full items-center justify-between gap-4'>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant={theme === 'light' ? 'default' : 'ghost'}
									size='icon'
									onClick={() => setTheme('light')}>
									<Sun />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Light</p>
							</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant={theme === 'dark' ? 'default' : 'ghost'}
									size='icon'
									onClick={() => setTheme('dark')}>
									<Moon />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Dark</p>
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant={theme === 'system' ? 'default' : 'ghost'}
									size='icon'
									onClick={() => setTheme('system')}>
									<SunMedium />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>System</p>
							</TooltipContent>
						</Tooltip>
					</div>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
