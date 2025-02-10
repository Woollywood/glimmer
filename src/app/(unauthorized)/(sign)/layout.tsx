import { NextPage } from 'next';

interface Props {
	children: React.ReactNode;
}

const Layout: NextPage<Props> = ({ children }) => {
	return <div className='flex h-full items-center justify-center'>{children}</div>;
};

export default Layout;
