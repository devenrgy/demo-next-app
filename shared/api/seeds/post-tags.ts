import { faker } from '@faker-js/faker'

import type { DB } from '@/db'
import { type InsertPostToTags, postTagsTable } from '@/db/schemas'

export const postTags = async (db: DB) => {
	const [postsData, tagsData] = await Promise.all([db.query.postTable.findMany(), db.query.tagTable.findMany()])

	// const randomPosts = faker.helpers.arrayElements(postsData)

	const data: InsertPostToTags[] = postsData.flatMap(post => {
		const randomTags = faker.helpers.arrayElements(tagsData)
		return randomTags.map(tag => ({ postId: post.id, tagId: tag.id }))
	})

	return db.insert(postTagsTable).values(data)
}
