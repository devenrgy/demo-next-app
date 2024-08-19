import { relations } from 'drizzle-orm'
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'

import { postToTagsTable } from './post-to-tags'

export const tagTable = pgTable('tag', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 50 }).notNull().unique(),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow()
})

export const tagRelations = relations(tagTable, ({ many }) => ({
	postToTag: many(postToTagsTable)
}))

export type InsertTag = typeof tagTable.$inferInsert
export type SelectTag = typeof tagTable.$inferSelect
