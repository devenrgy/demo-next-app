import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import { cn } from '@/shared/lib'

import { Providers } from './_providers'

import '@/app/globals.css'

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans'
})

export const metadata: Metadata = {
	title: {
		template: '%s | Next.js',
		default: 'Playground | Next.js'
	}
}

const Layout = ({ children }: { children: React.ReactNode }) => (
	<html className='dark' lang='en' suppressHydrationWarning>
		<head />
		<body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
			<Providers>{children}</Providers>
		</body>
	</html>
)

export default Layout
