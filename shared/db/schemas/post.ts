import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

import { categoryTable } from './category'
import { commentTable } from './comment'
import { postToTagsTable } from './post-to-tags'
import { userTable } from './user'

export const postTable = pgTable('post', {
	id: serial('id').primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	preview: varchar('preview', { length: 300 }).notNull(),
	content: text('content').notNull(),
	categoryId: integer('category_id').notNull(),
	authorId: uuid('author_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' }),
	likes: integer('likes').default(0).notNull(),
	dislikes: integer('dislikes').default(0).notNull(),
	views: integer('views').default(0).notNull(),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow()
})

export const postRelations = relations(postTable, ({ one, many }) => ({
	user: one(userTable, {
		fields: [postTable.authorId],
		references: [userTable.id]
	}),
	tags: many(postToTagsTable),
	comments: many(commentTable),
	category: one(categoryTable, {
		fields: [postTable.categoryId],
		references: [categoryTable.id]
	})
}))

export type InsertPost = typeof postTable.$inferInsert
export type SelectPost = typeof postTable.$inferSelect
