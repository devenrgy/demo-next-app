'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/shared/lib'

const LINKS = [
	{
		path: '/',
		name: 'Home'
	},
	{
		path: '/posts',
		name: 'Posts'
	}
]

export const NavLinks = ({ className }: { className?: string }) => {
	const pathname = usePathname()

	return (
		<nav className={className}>
			<ul className='flex gap-5' role='list'>
				{LINKS.map((item, index) => (
					<li key={index}>
						<Link
							className={cn('underline-offset-8 hover:underline', {
								'pointer-events-none underline underline-offset-8': pathname === item.path
							})}
							href={item.path}
						>
							{item.name}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}
