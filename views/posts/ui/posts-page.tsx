import { Suspense } from 'react'

import { PostFeedServer } from './post-feed-server'
import { PostFeedSkeleton } from './post-feed-skeleton'

export const PostsPage = () => (
	<section className='container max-w-2xl'>
		<h2 className='mb-8 font-bold ~text-2xl/3xl sm:mb-3 sm:px-0'>Latest</h2>

		<Suspense fallback={<PostFeedSkeleton />}>
			<PostFeedServer />
		</Suspense>
	</section>
)
