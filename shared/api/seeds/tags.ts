import { faker } from '@faker-js/faker'

import type { DB } from '@/db'
import type { TagSchema } from '@/db/schemas'
import { tagTable } from '@/db/schemas'

const createTag = () => ({
	name: faker.lorem.word({ length: { min: 5, max: 10 } })
})

const TAGS: TagSchema[] = faker.helpers.multiple(createTag, { count: 8 })

export const tags = async (db: DB) => db.insert(tagTable).values(TAGS)
