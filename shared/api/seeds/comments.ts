import { faker } from '@faker-js/faker'

import type { DB } from '@/db'
import type { CommentSchema } from '@/db/schemas'
import { commentTable } from '@/db/schemas'

const parentComments = async (db: DB) => {
	const [postsData, usersData] = await Promise.all([db.query.postTable.findMany(), db.query.userTable.findMany()])

	const randomPosts = faker.helpers.arrayElements(postsData)

	const data: CommentSchema[] = randomPosts.map(post => ({
		message: faker.lorem.words({ min: 1, max: 30 }),
		postId: post.id,
		userId: faker.helpers.arrayElement(usersData).id
	}))

	return data
}

const childComments = async (db: DB) => {
	const [commentsData, usersData] = await Promise.all([db.query.commentTable.findMany(), db.query.userTable.findMany()])

	const randomComments = faker.helpers.arrayElements(commentsData)

	const data: CommentSchema[] = randomComments.map(comment => ({
		message: faker.lorem.words({ min: 1, max: 30 }),
		postId: comment.postId,
		userId: faker.helpers.arrayElement(usersData).id,
		parentId: comment.id
	}))

	return data
}

export const comments = async (db: DB) => {
	const parentCommentsData = await parentComments(db)
	await db.insert(commentTable).values(parentCommentsData)

	const childCommentsData = await childComments(db)
	await db.insert(commentTable).values(childCommentsData)
}
