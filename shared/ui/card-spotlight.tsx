'use client'

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import type { MouseEvent as ReactMouseEvent } from 'react'
import React from 'react'

import { cn } from '@/shared/lib/cn'

export const CardSpotlight = ({
	children,
	radius = 350,
	color = '#262626',
	className,
	...props
}: {
	radius?: number
	color?: string
	reveal?: boolean
	children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) => {
	const mouseX = useMotionValue(0)
	const mouseY = useMotionValue(0)

	function handleMouseMove({ currentTarget, clientX, clientY }: ReactMouseEvent<HTMLDivElement>) {
		const { left, top } = currentTarget.getBoundingClientRect()

		mouseX.set(clientX - left)
		mouseY.set(clientY - top)
	}

	return (
		<div
			className={cn(
				'group/spotlight relative rounded-md border border-neutral-800 bg-black p-10 dark:border-neutral-800',
				className
			)}
			onMouseMove={handleMouseMove}
			{...props}
		>
			<motion.div
				className='pointer-events-none absolute -inset-px z-0 rounded-md opacity-0 transition duration-300 group-hover/spotlight:opacity-100'
				style={{
					backgroundColor: color,
					maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `
				}}
			/>
			{children}
		</div>
	)
}
