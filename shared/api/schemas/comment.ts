import { relations } from 'drizzle-orm'
import type { AnyPgColumn } from 'drizzle-orm/pg-core'
import { integer, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import type { z } from 'zod'

import { postTable, userTable } from '@/db/schemas'

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

export const commentSchema = createInsertSchema(commentTable, {
	postId: schema => schema.postId.min(1),
	message: schema => schema.message.min(1),
	userId: schema => schema.userId.uuid()
}).pick({
	postId: true,
	message: true,
	parentId: true,
	userId: true,
	id: true
})

export type CommentSchema = z.infer<typeof commentSchema>
