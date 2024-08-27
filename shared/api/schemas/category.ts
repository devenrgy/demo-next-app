import { relations } from 'drizzle-orm'
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import type { z } from 'zod'

import { postTable } from '@/db/schemas'

export const categoryTable = pgTable('category', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 100 }).unique().notNull(),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow()
})

export const categoryRelations = relations(categoryTable, ({ many }) => ({
	posts: many(postTable)
}))

export const categorySchema = createInsertSchema(categoryTable)
export type CategorySchema = z.infer<typeof categorySchema>
