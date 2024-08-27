import { notFound } from 'next/navigation'
import { ThumbsDown, ThumbsUp } from 'lucide-react'

import type { SelectPostWithTags } from '@/db/queries/posts'
import { getPost } from '@/db/queries/posts'

interface Props {
	slug: string
}

export const PostPage = async ({ slug }: Props) => {
	const post = (await getPost(slug)) as unknown as SelectPostWithTags | undefined

	if (!post) {
		notFound()
	}

	return (
		<section>
			<h1 className='mb-5 font-bold ~text-3xl/4xl'>{post.title}</h1>

			<p className='mb-10 max-w-4xl leading-relaxed'>{post.content}</p>

			<ul className='flex gap-5'>
				<li className='flex items-center gap-2'>
					<ThumbsUp />
					{post.likes}
				</li>
				<li className='flex items-center gap-2'>
					<ThumbsDown />
					{post.dislikes}
				</li>
			</ul>
		</section>
	)
}
