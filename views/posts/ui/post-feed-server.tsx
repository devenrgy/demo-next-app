import { getAllPosts } from '@/db/queries/select'

import { PostFeedClient } from './post-feed-client'

export const PostFeedServer = async () => {
	const initialPostsFeed = await getAllPosts()

	return <PostFeedClient initialPosts={initialPostsFeed} />
}
