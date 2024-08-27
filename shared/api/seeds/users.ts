import { faker } from '@faker-js/faker'

import type { DB } from '@/db'
import type { UserSchema } from '@/db/schemas'
import { userTable } from '@/db/schemas'

const createUser = () => ({
	firstName: faker.person.firstName(),
	lastName: faker.person.lastName(),
	email: faker.internet.email(),
	age: faker.number.int({ min: 18, max: 99 }),
	password: faker.internet.password({ memorable: true, length: 4 })
})

const USERS: Omit<Extract<UserSchema, { mode: 'signUp' }>, 'mode'>[] = faker.helpers.multiple(createUser, { count: 20 })

export const users = async (db: DB) => db.insert(userTable).values(USERS)
