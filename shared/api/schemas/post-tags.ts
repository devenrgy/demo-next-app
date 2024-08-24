import { relations } from 'drizzle-orm'
import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core'

import { postTable, tagTable } from '@/db/schemas'

export const postTagsTable = pgTable(
	'post_tags',
	{
		postId: integer('post_id')
			.notNull()
			.references(() => postTable.id, { onDelete: 'cascade' }),
		tagId: integer('tag_id')
			.notNull()
			.references(() => tagTable.id, { onDelete: 'cascade' })
	},
	table => ({
		pk: primaryKey({ columns: [table.postId, table.tagId] })
	})
)

export const postTagsRelations = relations(postTagsTable, ({ one }) => ({
	tag: one(tagTable, { fields: [postTagsTable.tagId], references: [tagTable.id] }),
	post: one(postTable, { fields: [postTagsTable.postId], references: [postTable.id] })
}))

export type InsertPostToTags = typeof postTagsTable.$inferInsert
export type SelectPostToTags = typeof postTagsTable.$inferSelect
