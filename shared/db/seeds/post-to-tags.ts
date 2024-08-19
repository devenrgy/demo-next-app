import { faker } from '@faker-js/faker'

import type { DB } from '../db'
import { type InsertPostToTags, postToTagsTable } from '../schemas'

export const postToTags = async (db: DB) => {
	const [postsData, tagsData] = await Promise.all([db.query.postTable.findMany(), db.query.tagTable.findMany()])

	const randomPosts = faker.helpers.arrayElements(postsData)

	const data: InsertPostToTags[] = randomPosts.flatMap(post => {
		const randomTags = faker.helpers.arrayElements(tagsData)
		return randomTags.map(tag => ({ postId: post.id, tagId: tag.id }))
	})

	return db.insert(postToTagsTable).values(data)
}
