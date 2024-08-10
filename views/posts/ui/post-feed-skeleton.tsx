import { Skeleton } from '@/shared/ui'

export const PostFeedSkeleton = () => (
	<ul className='flex max-w-[610px] flex-col gap-5'>
		{Array.from({ length: 5 }, (_, index) => index).map(post => (
			<div
				className='flex h-[450px] w-full flex-col justify-between rounded-xl border-0 px-2 py-3 sm:h-[320px] sm:border sm:p-6'
				key={post}
			>
				<Skeleton className='mb-4 rounded-xl py-4' />
				<Skeleton className='mb-6 rounded-xl py-36 sm:py-20' />

				<div className='flex w-full flex-col justify-between gap-5 sm:flex-row'>
					<Skeleton className='h-6 w-full rounded-xl sm:w-[200px]' />
					<Skeleton className='h-10 w-full rounded-xl sm:w-[100px]' />
				</div>
			</div>
		))}
	</ul>
)
