import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

import { categoryTable, commentTable, postTagsTable, userTable } from '@/db/schemas'

export const postTable = pgTable('post', {
	id: serial('id').primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	preview: varchar('preview', { length: 500 }).notNull(),
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
	comments: many(commentTable),
	tags: many(postTagsTable),
	category: one(categoryTable, {
		fields: [postTable.categoryId],
		references: [categoryTable.id]
	})
}))

export const baseSchema = createInsertSchema(postTable, {
	title: schema => schema.title.min(1),
	preview: schema => schema.preview.min(1).max(500),
	authorId: schema => schema.authorId.uuid(),
	categoryId: schema => schema.categoryId.min(1)
}).pick({
	title: true,
	preview: true,
	authorId: true,
	categoryId: true,
	content: true
})

export const postSchema = z.union([
	z.object({
		mode: z.literal('create'),
		title: baseSchema.shape.title,
		preview: baseSchema.shape.preview,
		authorId: baseSchema.shape.authorId,
		categoryId: baseSchema.shape.categoryId,
		content: baseSchema.shape.content,
		tags: z.array(z.number())
	}),
	z.object({
		mode: z.literal('edit'),
		id: z.number().min(1),
		title: baseSchema.shape.title,
		preview: baseSchema.shape.preview,
		authorId: baseSchema.shape.authorId,
		categoryId: baseSchema.shape.categoryId,
		content: baseSchema.shape.content,
		tags: z.array(z.number())
	})
])

export type PostSchema = z.infer<typeof postSchema>
export type SelectPostSchema = typeof postTable.$inferSelect
