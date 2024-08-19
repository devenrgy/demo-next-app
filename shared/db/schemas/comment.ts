import { relations } from 'drizzle-orm'
import type { AnyPgColumn } from 'drizzle-orm/pg-core'
import { integer, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

import { postTable } from './post'
import { userTable } from './user'

export const commentTable = pgTable('comment', {
	id: uuid('id').primaryKey().defaultRandom(),
	parentId: uuid('parent_id').references((): AnyPgColumn => commentTable.id),

	message: varchar('message', { length: 300 }).notNull(),
	userId: uuid('user_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' }),
	postId: integer('post_id')
		.notNull()
		.references(() => postTable.id, { onDelete: 'cascade' }),

	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow()
})

export const commentRelations = relations(commentTable, ({ one }) => ({
	user: one(userTable, {
		fields: [commentTable.userId],
		references: [userTable.id]
	}),
	post: one(postTable, {
		fields: [commentTable.postId],
		references: [postTable.id]
	})
}))

export type InsertComment = typeof commentTable.$inferInsert
export type SelectComment = typeof commentTable.$inferSelect
