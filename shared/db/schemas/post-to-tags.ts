import { relations } from 'drizzle-orm'
import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core'

import { postTable } from './post'
import { tagTable } from './tag'

export const postToTagsTable = pgTable(
	'post_to_tag',
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

export const postTagsRelations = relations(postToTagsTable, ({ one }) => ({
	tag: one(tagTable, { fields: [postToTagsTable.tagId], references: [tagTable.id] }),
	post: one(postTable, { fields: [postToTagsTable.postId], references: [postTable.id] })
}))

export type InsertPostToTags = typeof postToTagsTable.$inferInsert
export type SelectPostToTags = typeof postToTagsTable.$inferSelect
