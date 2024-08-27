import type { Metadata } from 'next'

import { getAllPosts, getPost } from '@/db/queries/posts'
import { PostPage } from '@/views/post'

export const generateMetadata = async ({ params: { slug } }: Props): Promise<Metadata> => {
	const post = await getPost(slug)

	return {
		title: post?.title ?? 'Not Found'
	}
}

export const generateStaticParams = async () => {
	const posts = await getAllPosts()

	return posts.map(post => ({
		slug: post.title
	}))
}

interface Props {
	params: {
		slug: string
	}
}

const Page = ({ params: { slug } }: Props) => (
	<div className='container max-w-2xl ~py-6/20'>
		<PostPage slug={slug} />
	</div>
)

export default Page
