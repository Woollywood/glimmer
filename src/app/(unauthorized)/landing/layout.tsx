import { NextPage } from 'next';
import Link from 'next/link';

interface Props {
	children: React.ReactNode;
}

interface Link {
	href: string;
	label: string;
}

const links: Link[] = [
	{
		href: '/blogs',
		label: 'Blog',
	},
	{
		href: '/security',
		label: 'Security',
	},
];

const Layout: NextPage<Props> = ({ children }) => {
	return (
		<div className='grid grid-rows-[auto_1fr_auto] gap-y-12'>
			<header className='container flex h-14 items-center'>
				<Link href='/' className='px-4 text-2xl font-bold'>
					Logo
				</Link>
				<div className='flex items-center'>
					{links.map(({ href, label }) => (
						<Link key={href} href={href} className='block p-4 text-base font-semibold capitalize'>
							{label}
						</Link>
					))}
				</div>
			</header>
			{children}
		</div>
	);
};

export default Layout;
