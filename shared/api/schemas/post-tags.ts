import { relations } from 'drizzle-orm'
import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import type { z } from 'zod'

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

export const postTagsSchema = createInsertSchema(postTagsTable)
export type PostTagsSchema = z.infer<typeof postTagsSchema>
