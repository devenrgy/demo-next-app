import { relations } from 'drizzle-orm'
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'

import { postTable } from './post'

export const categoryTable = pgTable('category', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 100 }).unique().notNull(),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow()
})

export const categoryRelations = relations(categoryTable, ({ many }) => ({
	posts: many(postTable)
}))

export type InsertCategory = typeof categoryTable.$inferInsert
export type SelectCategory = typeof categoryTable.$inferSelect
