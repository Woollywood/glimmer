import { Header } from '@/components/shared/Header';
import { NextPage } from 'next';

interface Props {
	children: React.ReactNode;
}

const Layout: NextPage<Props> = ({ children }) => {
	return (
		<div className='grid grid-rows-[auto_1fr] gap-6'>
			<Header />
			{children}
		</div>
	);
};

export default Layout;
