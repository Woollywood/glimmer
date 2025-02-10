import { Header } from '@/components/shared/Header';
import { NextPage } from 'next';

interface Props {
	children: React.ReactNode;
}

const Layout: NextPage<Props> = ({ children }) => {
	return (
		<div>
			<Header />
			<div className='pt-header-height mt-6'>{children}</div>
		</div>
	);
};

export default Layout;
