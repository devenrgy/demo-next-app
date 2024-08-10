'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/shared/ui'

export const Modal = ({
	children,
	visibleBackButton = true
}: {
	children: React.ReactNode
	visibleBackButton?: boolean
}) => {
	const router = useRouter()

	const closeModal = () => {
		router.back()
	}

	return (
		<div className='fixed inset-0 grid place-content-center'>
			<div className='fixed inset-0 bg-black/70' onClick={closeModal} />

			<div className='z-10 grid max-w-2xl gap-10 rounded-xl border bg-card p-6 text-card-foreground'>
				{children}

				{visibleBackButton && (
					<Button onClick={closeModal} className='w-full text-lg' size='lg'>
						Back
					</Button>
				)}
			</div>
		</div>
	)
}
