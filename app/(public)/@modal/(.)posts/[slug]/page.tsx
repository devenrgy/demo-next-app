import type { Metadata } from 'next'

import { getAllPosts, getPost } from '@/db/queries/posts'
import { PostPage } from '@/views/post'
import { Modal } from '@/widgets/modal'

interface Props {
	params: {
		slug: string
	}
}

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

const Page = ({ params: { slug } }: Props) => (
	<Modal>
		<PostPage slug={slug} />
	</Modal>
)

export default Page
