import { getPosts } from '@/shared/api/requests/posts'

import { PostFeedClient } from './post-feed-client'

export const PostFeedServer = async () => {
	const { posts: initialPostsFeed } = await getPosts({ limit: 5 })

	return <PostFeedClient initialPosts={initialPostsFeed} />
}
