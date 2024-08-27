import { useEffect } from 'react'

import { Button } from '@/shared/ui'

export const ErrorPage = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<section className='grid h-full place-content-center gap-5 sm:container'>
			<h2 className='text-2xl font-bold'>Something went wrong!</h2>

			<div className='mx-auto'>
				<Button
					size='lg'
					className='text-lg'
					onClick={() => {
						reset()
					}}
				>
					Try again
				</Button>
			</div>
		</section>
	)
}
