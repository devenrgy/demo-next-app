import { Header } from '@/widgets/header'

const Layout = ({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) => (
	<div className='grid min-h-screen grid-rows-[min-content_1fr]'>
		<Header />

		{modal}
		<main className='~py-6/20'>{children}</main>
	</div>
)

export default Layout
