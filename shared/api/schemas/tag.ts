import { relations } from 'drizzle-orm'
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import type { z } from 'zod'

import { postTagsTable } from '@/db/schemas'

export const tagTable = pgTable('tag', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 50 }).notNull().unique(),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow()
})

export const tagRelations = relations(tagTable, ({ many }) => ({
	postTag: many(postTagsTable)
}))

export const tagSchema = createInsertSchema(tagTable)
export type TagSchema = z.infer<typeof tagSchema>
