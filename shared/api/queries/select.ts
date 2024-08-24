'use server'

import { between, eq, sql } from 'drizzle-orm'
import { experimental_taintObjectReference, experimental_taintUniqueValue } from 'react'
import { cache } from 'react'

import { db } from '@/db'
import { postTable } from '@/db/schemas'

export const getPostsForLast24Hours = cache(async (page = 1, pageSize = 5) =>
	db.query.postTable.findMany({
		where: between(postTable, sql`now() - interval '1 day'`, sql`now()`),
		limit: pageSize,
		offset: (page - 1) * pageSize
	})
)

export const getAllPosts = cache(async (page = 1, pageSize = 5) => {
	const data = await db.query.postTable.findMany({
		with: {
			tags: {
				columns: {},
				with: {
					tag: {
						columns: {
							name: true
						}
					}
				}
			}
		},
		limit: pageSize,
		offset: (page - 1) * pageSize
	})
	
	experimental_taintObjectReference('Do not pass the whole user object to the client', data)

	return data
})

export const getPost = cache(async (id: number) =>
	db.query.postTable.findFirst({
		where: eq(postTable.id, id)
	})
)
