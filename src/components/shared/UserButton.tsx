'use client';

import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { HelpCircle, HelpCircleIcon, LogOut, Moon, Settings, Sun, SunMoon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { signOut } from 'next-auth/react';
import { User } from '@prisma/client';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface Props {
	user: User | undefined;
}

export const UserButton: React.FC<Props> = ({ user }) => {
	const { setTheme, theme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='cursor-pointer'>
					<AvatarImage src={user?.image || ''} />
					<AvatarFallback>A</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<div className='mb-2 flex items-center gap-2'>
					<Avatar>
						<AvatarImage src={user?.image || ''} />
						<AvatarFallback>A</AvatarFallback>
					</Avatar>
					<div>
						<h3>{user?.name?.split(' ')[0]}</h3>
					</div>
				</div>
				<div className='my-4'>
					<Button className='w-full'>
						<Link href='/'>View profile</Link>
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
				<DropdownMenuItem onClick={() => signOut()}>
					<LogOut />
					<span>Sign out</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<div className='flex items-center gap-4 p-2'>
					<span>Mode:</span>
					<div className='flex w-full items-center justify-between gap-2'>
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
									<SunMoon />
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
