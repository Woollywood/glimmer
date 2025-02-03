import { Sidebar } from '@/components/shared/Sidebar';
import { NextPage } from 'next';

interface Props {
	children: React.ReactNode;
}

const Layout: NextPage<Props> = ({ children }) => {
	return (
		<div className='grid grid-cols-2 gap-6'>
			<Sidebar />
			{children}
		</div>
	);
};

export default Layout;
