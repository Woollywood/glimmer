import { NextPage } from 'next';

interface Props {
	children: React.ReactNode;
}

const Layout: NextPage<Props> = ({ children }) => {
	return <div className='container grid grid-cols-[var(--sidebar-width)_1fr] gap-6'>{children}</div>;
};

export default Layout;
