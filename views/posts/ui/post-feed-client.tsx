'use client'

import Link from 'next/link'
import { Eye, ThumbsDown, ThumbsUp } from 'lucide-react'
import { useState } from 'react'

import { getAllPosts } from '@/db/queries/select'
import { convertToKebabCase } from '@/shared/lib'
import { Button } from '@/shared/ui'
import { Badge, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui'

import { PostFeedSkeleton } from './post-feed-skeleton'

export const PostFeedClient = ({ initialPosts }: Props) => {
	const [posts, setPosts] = useState(initialPosts)
	const [error, setError] = useState<unknown>()
	const [isLoading, setIsLoading] = useState(false)

	const loadMorePosts = () => {
		setIsLoading(true)
		setError(null)
		getAllPosts(2)
			.then(posts => {
				setPosts(prev => [...prev, ...posts])
			})
			.catch((error: unknown) => {
				setError(error)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	return (
		<>
			<ul className='mb-10 flex flex-col sm:gap-5'>
				{posts.map(post => (
					<li key={post.id}>
						<Card className='rounded-none border-0 sm:rounded-xl sm:border'>
							<CardHeader className='px-0 pt-0 sm:px-6 sm:pt-6'>
								<CardTitle className='text-pretty ~text-lg/2xl'>{post.title}</CardTitle>
							</CardHeader>
							<CardContent className='px-0 sm:px-6'>
								<p className='mb-3'>{post.preview}</p>
								<ul className='flex gap-2 text-sm'>
									{post.tags.map(({ tag }, index) => (
										<li key={index} className='text-muted-foreground'>
											<Badge variant='secondary'>#{tag.name}</Badge>
										</li>
									))}
								</ul>
							</CardContent>
							<CardFooter className='flex-col justify-between gap-5 px-0 sm:flex-row sm:px-6'>
								<ul className='flex gap-6 text-sm'>
									<li className='flex items-center gap-2'>
										<ThumbsUp />
										{post.likes}
									</li>
									<li className='flex items-center gap-2'>
										<ThumbsDown />
										{post.dislikes}
									</li>
									<li className='flex items-center gap-2'>
										<Eye />
										<p>{post.views}</p>
									</li>
								</ul>

								<Link
									className='w-full sm:w-auto'
									scroll={false}
									href={`posts/${post.id.toString()}-${convertToKebabCase(post.title)}`}
								>
									<Button className='w-full' variant='outline' size='lg'>
										More
									</Button>
								</Link>
							</CardFooter>
						</Card>
					</li>
				))}

				{isLoading && <PostFeedSkeleton />}
			</ul>

			<Button onClick={loadMorePosts} className='w-full py-6 text-lg' size='lg'>
				{!error ? 'Load More' : 'Failed to load data'}
			</Button>
		</>
	)
}
