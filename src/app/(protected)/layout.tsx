import { ThemeToggler } from '@/components/shared/ThemeToggler';
import { NextPage } from 'next';

interface Props {
	children: React.ReactNode;
}

const Layout: NextPage<Props> = ({ children }) => {
	return (
		<div>
			<div>
				<ThemeToggler />
			</div>
			{children}
		</div>
	);
};

export default Layout;
