'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/shared/lib'

export const Logo = () => {
	const pathname = usePathname()

	return (
		<Link href='/' className={cn('flex items-center gap-3', { 'pointer-events-none': pathname === '/' })}>
			<div className='h-0 w-0 border-b-[15px] border-l-[10px] border-r-[10px] border-b-white border-l-transparent border-r-transparent'></div>
			<div className='gap-2 space-x-2 text-2xl font-bold'>
				<span>Next.js</span>
				<span className='text-xl font-normal text-zinc-400'>|</span>
				<span className='self-end text-sm text-zinc-400'>Playground</span>
			</div>
		</Link>
	)
}
