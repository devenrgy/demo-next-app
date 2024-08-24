import { relations } from 'drizzle-orm'
import { integer, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

import { postTable } from '@/db/schemas'

export const userTable = pgTable('user', {
	id: uuid('id').primaryKey().defaultRandom(),
	firstName: varchar('first_name', { length: 100 }).notNull(),
	lastName: varchar('last_name', { length: 100 }).notNull(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	password: varchar('password', { length: 255 }).notNull(),
	age: integer('age').notNull(),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow()
})

export const usersRelations = relations(userTable, ({ many }) => ({
	posts: many(postTable)
}))

export type InsertUser = typeof userTable.$inferInsert

export type SelectUser = typeof userTable.$inferSelect
