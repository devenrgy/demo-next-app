import type { Metadata } from 'next'

import { getAllPosts, getPost } from '@/db/queries/select'
import { convertToKebabCase, extractIdFromSlug } from '@/shared/lib'
import { PostPage } from '@/views/post'

export const revalidate = 0
export const dynamicParams = false

export const generateMetadata = async ({ params: { slug } }: Props): Promise<Metadata> => {
	const postID = Number(extractIdFromSlug(slug))
	const post = await getPost(postID)

	return {
		title: post.title
	}
}

export const generateStaticParams = async () => {
	const posts = await getAllPosts()

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
