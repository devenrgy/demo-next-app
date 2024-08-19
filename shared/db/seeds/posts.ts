import { faker } from '@faker-js/faker'

import type { DB } from '../db'
import { postTable } from '../schemas'

export const posts = async (db: DB) => {
	const [usersData, categoriesData] = await Promise.all([
		db.query.userTable.findMany(),
		db.query.categoryTable.findMany()
	])

	const createPost = () => ({
		content: faker.lorem.paragraph({ min: 4, max: 8 }),
		title: faker.lorem.words(),
		preview: faker.lorem.sentence(),
		categoryId: faker.helpers.arrayElement(categoriesData).id,
		authorId: faker.helpers.arrayElement(usersData).id
	})

	const POSTS = faker.helpers.multiple(createPost, { count: 20 })

	return db.insert(postTable).values(POSTS)
}
