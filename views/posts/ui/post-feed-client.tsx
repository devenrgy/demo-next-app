'use client'

import Link from 'next/link'
import { Eye, ThumbsDown, ThumbsUp } from 'lucide-react'
import { useState } from 'react'

import type { SelectAllPostsWithTags } from '@/db/queries/posts'
import { getAllPosts } from '@/db/queries/posts'
import { cn } from '@/shared/lib'
import { Button, HoverBorderGradient } from '@/shared/ui'
import { Badge, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui'

import { PostFeedSkeleton } from './post-feed-skeleton'

interface Props {
	initialPosts: SelectAllPostsWithTags
	totalPages: number
}

export const PostFeedClient = ({ initialPosts, totalPages }: Props) => {
	const [posts, setPosts] = useState(initialPosts)
	const [error, setError] = useState<unknown>()
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)

	const loadMorePosts = () => {
		if (currentPage >= totalPages) return

		setIsLoading(true)
		setError(null)

		getAllPosts(currentPage + 1)
			.then(({ posts }) => {
				setPosts(prev => [...prev, ...posts])
				setCurrentPage(prev => prev + 1)
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
								<ul className='flex flex-wrap gap-2 text-sm'>
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

								<Link className='w-full sm:w-auto' scroll={false} href={`posts/${post.title}`}>
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

			<HoverBorderGradient
				onClick={loadMorePosts}
				containerClassName={cn('w-full', { hidden: currentPage >= totalPages })}
				duration={2}
				className={cn('w-full py-6 text-lg', { hidden: currentPage >= totalPages })}
			>
				{!error ? 'Load More' : 'Failed to load data'}
			</HoverBorderGradient>
		</>
	)
}
