import { relations } from 'drizzle-orm'
import { integer, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

import { postTable } from '@/db/schemas'

export const userTable = pgTable('user', {
	id: uuid('id').primaryKey().defaultRandom(),
	firstName: varchar('first_name', { length: 100 }).notNull(),
	lastName: varchar('last_name', { length: 100 }).notNull(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	password: varchar('password', { length: 255 }).notNull(),
	age: integer('age').notNull(),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow()
})

export const usersRelations = relations(userTable, ({ many }) => ({
	posts: many(postTable)
}))

const baseSchema = createInsertSchema(userTable, {
	firstName: schema => schema.firstName.min(1),
	lastName: schema => schema.lastName.min(1),
	password: schema => schema.password.min(1),
	age: z.coerce.number().min(18).max(99),
	email: schema => schema.email.email()
}).pick({ firstName: true, lastName: true, password: true, age: true, email: true })

export const userSchema = z.union([
	z.object({
		mode: z.literal('signUp'),
		email: baseSchema.shape.email,
		password: baseSchema.shape.password,
		firstName: baseSchema.shape.firstName,
		lastName: baseSchema.shape.lastName,
		age: baseSchema.shape.age
	}),
	z.object({
		mode: z.literal('signIn'),
		email: baseSchema.shape.email,
		password: baseSchema.shape.password
	}),
	z.object({
		mode: z.literal('update'),
		firstName: baseSchema.shape.firstName,
		lastName: baseSchema.shape.lastName,
		age: baseSchema.shape.age,
		id: z.number().min(1)
	})
])

export type UserSchema = z.infer<typeof userSchema>
export type SelectUser = typeof userTable.$inferSelect
