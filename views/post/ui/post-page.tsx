import { ThumbsDown, ThumbsUp } from 'lucide-react'

import { getPost } from '@/shared/api/requests/posts'
import { extractIdFromSlug } from '@/shared/lib'

interface Props {
	slug: string
}

export const PostPage = async ({ slug }: Props) => {
	const postID = extractIdFromSlug(slug)
	const post = await getPost(postID)

	return (
		<section>
			<h1 className='mb-5 font-bold ~text-3xl/4xl'>{post.title}</h1>

			<p className='mb-10 max-w-4xl leading-relaxed'>{post.body}</p>

			<ul className='flex gap-5'>
				<li className='flex items-center gap-2'>
					<ThumbsUp />
					{post.reactions.likes}
				</li>
				<li className='flex items-center gap-2'>
					<ThumbsDown />
					{post.reactions.dislikes}
				</li>
			</ul>
		</section>
	)
}
