import { faker } from '@faker-js/faker'

import type { DB } from '@/db'
import type { PostSchema } from '@/db/schemas'
import { postTable } from '@/db/schemas'

export const posts = async (db: DB) => {
	const [usersData, categoriesData] = await Promise.all([
		db.query.userTable.findMany(),
		db.query.categoryTable.findMany()
	])

	const createPost = () => ({
		content: faker.lorem.paragraph({ min: 4, max: 8 }),
		title: faker.lorem.words(),
		preview: faker.lorem.paragraphs({ min: 1, max: 3 }),
		categoryId: faker.helpers.arrayElement(categoriesData).id,
		likes: faker.number.int({ min: 10, max: 1000 }),
		dislikes: faker.number.int({ min: 10, max: 1000 }),
		views: faker.number.int({ min: 1000, max: 100000 }),
		authorId: faker.helpers.arrayElement(usersData).id
	})

	const POSTS: Omit<Extract<PostSchema, { mode: 'create' }>, 'tags' | 'mode'>[] = faker.helpers.multiple(createPost, {
		count: 20
	})

	return db.insert(postTable).values(POSTS)
}
