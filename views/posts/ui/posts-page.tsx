import { Suspense } from 'react'

import { CardSpotlight } from '@/shared/ui'

import { PostFeedServer } from './post-feed-server'
import { PostFeedSkeleton } from './post-feed-skeleton'

export const PostsPage = () => (
	<CardSpotlight color='#002855' className='z-20 p-2 ~py-6/20'>
		<section className='container relative z-30 max-w-2xl'>
			<h2 className='mb-8 font-bold ~text-2xl/3xl sm:mb-3 sm:px-0'>Latest</h2>

			<Suspense fallback={<PostFeedSkeleton />}>
				<PostFeedServer />
			</Suspense>
		</section>
	</CardSpotlight>
)
