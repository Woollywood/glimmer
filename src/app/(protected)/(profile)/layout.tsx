import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { getProfileByUserId } from '@/profile/data';
import { getUser } from '@/session/data';
import { NextPage } from 'next';
import Link from 'next/link';
import { ProfileField } from './profile/about/_components/ProfileField';
import { User } from 'lucide-react';
import { AboutCard } from './profile/about/_components/AboutCard';

interface ILink {
	label: string;
	href: string;
}

const links: ILink[] = [
	{ label: 'Feed', href: '/profile' },
	{ label: 'About', href: '/profile/about' },
	{ label: 'Connections', href: '/profile/connections' },
	{ label: 'Media', href: '/profile/media' },
	{ label: 'Videos', href: '/profile/videos' },
	{ label: 'Events', href: '/profile/events' },
	{ label: 'Activity', href: '/profile/activity' },
];

interface Props {
	children: React.ReactNode;
}

const Layout: NextPage<Props> = async ({ children }) => {
	const user = await getUser();
	const profile = await getProfileByUserId(user?.id || '');
	const profileInfo = [profile?.rank, profile?.livesIn].filter(Boolean);
	const hasProfileInfo = profileInfo.length > 0;

	return (
		<div className='container grid grid-cols-[3fr_1fr] gap-6'>
			<div className='space-y-6'>
				<Card className='space-y-4'>
					<CardContent className='space-y-12'>
						<div className='flex items-center gap-6'>
							<Avatar className='cursor-pointer'>
								<AvatarImage src={user?.image} />
								<AvatarFallback>A</AvatarFallback>
							</Avatar>
							<h2>{user?.name}</h2>
						</div>
						{hasProfileInfo && (
							<ul className='flex items-center gap-2'>
								{profileInfo.map((info, index) => (
									<li key={index}>
										<ProfileField icon={<User />}>{info}</ProfileField>
									</li>
								))}
							</ul>
						)}
					</CardContent>
					<CardFooter>
						<nav>
							<ul className='flex items-center gap-2'>
								{links.map(({ label, href }) => (
									<li key={href}>
										<Link href={href} className='transition-colors hover:text-link-hover'>
											{label}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					</CardFooter>
				</Card>
				{children}
			</div>
			<div className='space-y-6'>
				<AboutCard {...profile!} />
				<div>Experience</div>
				<div>Photos</div>
				<div>Friends</div>
			</div>
		</div>
	);
};

export default Layout;
