import { faker } from '@faker-js/faker'

import type { DB } from '../db'
import { tagTable } from '../schemas'

const createTag = () => ({
	name: faker.lorem.word({ length: { min: 5, max: 10 } })
})

const TAGS = faker.helpers.multiple(createTag, { count: 20 })

export const tags = async (db: DB) => db.insert(tagTable).values(TAGS)
