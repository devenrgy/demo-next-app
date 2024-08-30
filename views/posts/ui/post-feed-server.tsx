import { getAllPosts } from '@/db/queries/posts'

import { PostFeedClient } from './post-feed-client'

export const PostFeedServer = async () => {
	const { posts, totalPages } = await getAllPosts()

	return <PostFeedClient initialPosts={posts} totalPages={totalPages} />
}
