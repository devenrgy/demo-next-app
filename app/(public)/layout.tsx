import { Header } from '@/widgets/header'

const Layout = ({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) => (
	<div>
		<Header />
		{modal}
		<main>{children}</main>
	</div>
)

export default Layout
