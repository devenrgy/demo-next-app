import { Skeleton } from '@/shared/ui'

const Loading = () => (
	<div className='container max-w-2xl'>
		<Skeleton className='mb-5 max-w-2xl rounded py-6' />

		<Skeleton className='mb-10 max-w-4xl rounded py-12' />

		<ul className='flex gap-5'>
			<Skeleton className='h-8 w-20 rounded' />
			<Skeleton className='h-8 w-20 rounded' />
		</ul>
	</div>
)

export default Loading
