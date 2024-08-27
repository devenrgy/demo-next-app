'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { House } from 'lucide-react'
import React, { useState } from 'react'

import { cn } from '@/shared/lib'
import { Menu, MenuItem } from '@/shared/ui'

export const Navbar = () => {
	const [active, setActive] = useState<string | null>(null)
	const pathname = usePathname()

	return (
		<>
			<Menu setActive={setActive}>
				<MenuItem setActive={setActive} active={active} item='Menu' icon={<House />}>
					<div className='flex flex-col space-y-4 text-sm'>
						<Link
							href='/'
							className={cn({ 'underline decoration-blue-500 decoration-2 underline-offset-4': pathname === '/' })}
						>
							Home
						</Link>
						<Link
							href='/posts'
							className={cn({ 'underline decoration-blue-500 decoration-2 underline-offset-4': pathname === '/posts' })}
						>
							Posts
						</Link>
					</div>
				</MenuItem>
			</Menu>
		</>
	)
}
