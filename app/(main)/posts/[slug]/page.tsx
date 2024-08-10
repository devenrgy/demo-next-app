import type { Metadata } from 'next'

import { getPost, getPosts } from '@/shared/api/requests/posts'
import { convertToKebabCase, extractIdFromSlug } from '@/shared/lib'
import { PostPage } from '@/views/post'

export const revalidate = 0
export const dynamicParams = false

export const generateMetadata = async ({ params: { slug } }: Props): Promise<Metadata> => {
	const postID = extractIdFromSlug(slug)
	const post = await getPost(postID)

	return {
		title: post.title
	}
}

export const generateStaticParams = async () => {
	const { posts } = await getPosts({ limit: 5 })

	return posts.map(post => ({
		slug: `${post.id.toString()}-${convertToKebabCase(post.title)}`
	}))
}

interface Props {
	params: {
		slug: string
	}
}

const Page = ({ params: { slug } }: Props) => (
	<div className='container max-w-2xl'>
		<PostPage slug={slug} />
	</div>
)

export default Page
